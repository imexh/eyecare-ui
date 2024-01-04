import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import "./Dashboard.css";
import { Button, Container, Row, Col } from 'react-bootstrap';
import FooterCommon from '../../components/FooterCommon';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import CameraComponent from '../../components/CameraWithoutMesh';
import postService from '../../services/post.service';
import BarChart from '../../components/charts/BarChart';

export default function Dashboard() {
  const [username, setUsername] = useState([""]);
  const [date, setDate] = useState([""]);
  const [distance, setDistance] = useState(0.0);
  const [isCameraActive, setCameraActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0.0);
  const [eyeInteraction, setEyeInteraction] = useState("No");
  const [interactionTime, setInteractionTime] = useState(0.0);
  const [distancesDuringInteraction, setDistancesDuringInteraction] = useState([]);

  const [labels, setLabels] = useState(["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]);
  const [distanceData, setDistanceData] = useState([]);
  const [interactionData, setInteractionData] = useState([]);

  const navigate = useNavigate();

  // Function to calculate today's date and get current user's username
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthService.getCurrentUser();
        const currentDateWithoutTime = new Date();
        currentDateWithoutTime.setHours(0, 0, 0, 0);

        setUsername(response.username);
        setDate(currentDateWithoutTime.toLocaleDateString())
      } catch (error) {
        console.log("Private page", error.response);
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    };
    fetchData();
  }, [navigate]);

  // Function to populate graphs
  useEffect(() => {
    if (AuthService.getCurrentUser() == null) {
      navigate("/login");
    } else {
      const currentUser = AuthService.getCurrentUser().username;
      postService.getWeeklyDistances(currentUser)
        .then((response) => {
          const keysArray = [];
          const valuesArray = [];

          for (const [key, value] of Object.entries(response.data.distances)) {
            keysArray.push(key);
            valuesArray.push(value);
          }

          setDistanceData(valuesArray);
          setLabels(keysArray);
        })
        .catch((error) => {
          console.log("Private page", error.response);
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });

      postService.getWeeklyInteractionTimes(currentUser)
        .then((response) => {
          const keysArray = [];
          const valuesArray = [];

          for (const [key, value] of Object.entries(response.data.interactionTimes)) {
            keysArray.push(key);
            valuesArray.push(value);
          }

          setInteractionData(valuesArray);
          setLabels(keysArray);
        })
        .catch((error) => {
          console.log("Private page", error.response);
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
    }
  }, [navigate]);

  // Function to calculate time elapsed
  useEffect(() => {
    let timer;

    if (isCameraActive) {
      timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
      setElapsedTime(0);
    }

    return () => clearInterval(timer);
  }, [isCameraActive]);

  // Function to see if eyes are interacting or not
  useEffect(() => {
    if (isCameraActive) {
      // eslint-disable-next-line eqeqeq
      if (distance.toFixed(2) == 0.00) {
        setEyeInteraction("No");
      } else {
        setEyeInteraction("Yes");
      }
    } else {
      setEyeInteraction("Not detected!");
    }
  }, [isCameraActive, distance]);

  // Function to calculate interaction time (Gives 5 seconds time before reseting)
  useEffect(() => {
    try {
      let timer;
      let innerTimer;

      if (eyeInteraction === "Yes") {
        timer = setInterval(() => {
          setInteractionTime((prevInteractionTime) => prevInteractionTime + 1);
        }, 1000);
      } else if (eyeInteraction === "No") {
        innerTimer = setInterval(() => {
          if (interactionTime !== 0) {
            const avgDistance = distancesDuringInteraction.reduce((sum, dist) => sum + dist, 0) / distancesDuringInteraction.length;
            postService.addDistanceCalculations(username, date, avgDistance);
            postService.addInteractionTimeCalculations(username, date, interactionTime);
          }

          clearInterval(timer);
          setInteractionTime(0);
        }, 5000);
      } else {
        if (interactionTime !== 0) {
          const avgDistance = distancesDuringInteraction.reduce((sum, dist) => sum + dist, 0) / distancesDuringInteraction.length;
          postService.addDistanceCalculations(username, date, avgDistance);
          postService.addInteractionTimeCalculations(username, date, interactionTime);
        }

        clearInterval(timer);
        setInteractionTime(0);
      }

      return () => {
        clearInterval(timer);
        clearInterval(innerTimer);
      };
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eyeInteraction, interactionTime, date, username]);

  // Function to calculate interaction time (Without 5 seconds timer to reset)
  // useEffect(() => {
  //   let timer;

  //   if (isCameraActive) {
  //     timer = setInterval(() => {
  //       setInteractionTime((prevInteractionTime) => prevInteractionTime + 1);
  //     }, 1000);
  //   } else {
  //     clearInterval(timer);
  //     setInteractionTime(0);
  //   }

  //   return () => clearInterval(timer);
  // }, [isCameraActive]);

  // Function to format seconds to minutes and hours

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Function to change distance according to the calculations in the component
  const handleDistanceChange = (newDistance) => {
    setDistancesDuringInteraction((prevDistances) => newDistance > 0 ? [...prevDistances, newDistance] : prevDistances);
    setDistance(newDistance);
  };

  // Function to toggle camera ON and OFF
  const toggleCamera = () => {
    setCameraActive(prevState => !prevState);
    setDistance(0.0)
  };

  return (
    <div>
      <NavBarCommon />
      <Container className='dashboard-container'>
        <h1>Dashboard</h1>
        <Row className='mb-3'>
          <Col xs={12}>
            <div className="p-2 card">
              <Row className='font-dashboard-text'>
                <Col>
                  <div className='p-2'><b>Date:</b> <i>{date}</i></div>
                </Col>
                <Col>
                  <div className='p-2'><b>Time Elapsed:</b> <i>{formatTime(elapsedTime)}</i></div>
                </Col>
                <Col>
                  <div className='p-2'><b>User:</b> <i>{username}</i></div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row className='mb-3 custom-row-dashboard font-dashboard-text'>
          <Col>
            <div className="p-2 card custom-row-dashboard">
              <div className='p-2'><b>Current Distance to the screen:</b> {distance.toFixed(2)} cm</div>
            </div>
          </Col>
          <Col>
            <div className="p-2 card custom-row-dashboard">
              <div className='p-2'><b>Interaction Time:</b> {formatTime(interactionTime)}</div>
            </div>
          </Col>
          <Col>
            <div className="p-2 card custom-row-dashboard d-flex justify-content-center">
              <Button onClick={toggleCamera}>
                {isCameraActive ? "Stop Camera" : "Start Camera"}
              </Button>
            </div>
          </Col>
        </Row>

        <Row className='mb-3 font-dashboard-text'>
          <Col>
            <div className="p-2 card custom-row-camera-dashboard text-center d-flex align-items-center justify-content-center">
              <p className='font-dashboard-text-answers-topic'>Eyes Interacting?</p>
              <p className='font-dashboard-text-answers'>{eyeInteraction}</p>
            </div>
          </Col>
          <Col>
            <div className="p-2 card custom-row-camera-dashboard text-center d-flex align-items-center justify-content-center dashboard-red-card">
              <p className='font-dashboard-text-answers-topic'>Status</p>
              <p className='font-dashboard-text-answers'>Critical</p>
            </div>
          </Col>
          <Col>
            <div className="p-2 card d-flex align-items-center justify-content-center custom-row-camera-dashboard dashboard-grey-card">
              {isCameraActive ? (
                <CameraComponent onDistanceChange={handleDistanceChange} />
              ) : (
                <img src={'images/cameracard.png'} alt="Camera" />
              )}
            </div>
          </Col>
        </Row>

        <Row className='mb-5' >
          <Col>
            <div className="p-2 card">
              <BarChart title={"Weekly Distance Report (Average)"} chartLabels={labels} yLabel={"Average Distance (cm)"} chartData={distanceData} />
            </div>
          </Col>
          <Col>
            <div className="p-2 card">
              <BarChart title={"Weekly Interaction Time Report"} chartLabels={labels} yLabel={"Interaction Time (sec)"} chartData={interactionData} />
            </div>
          </Col>
        </Row>
      </Container>
      <FooterCommon />
    </div>
  )
}
