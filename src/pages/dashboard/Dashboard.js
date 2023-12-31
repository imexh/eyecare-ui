import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Stack from 'react-bootstrap/Stack';
import "./Dashboard.css";
import { Button, Container } from 'react-bootstrap';
import FooterCommon from '../../components/FooterCommon';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import CameraComponent from '../../components/CameraWithoutMesh';
import postService from '../../services/post.service';

export default function Dashboard() {
  const [username, setUsername] = useState([""]);
  const [date, setDate] = useState([""]);
  const [distance, setDistance] = useState(0.0);
  const [isCameraActive, setCameraActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0.0);
  const [eyeInteraction, setEyeInteraction] = useState("No");
  const [interactionTime, setInteractionTime] = useState(0.0);
  const [distancesDuringInteraction, setDistancesDuringInteraction] = useState([]);


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
  };

  return (
    <div>
      <NavBarCommon />
      <Container className='dashboardDivCardsPanel'>
        <h1>Dashboard</h1>
        <Stack className="dashboardCardsPanel h-100" gap={3}>
          <Stack direction="horizontal" className='dashboardFirstRow' gap={3}>
            <div className="p-2 dashboardCards">Date: {date}</div>
            <div className="p-2 dashboardCards">Time Elapsed: {formatTime(elapsedTime)}</div>
            <div className="p-2 dashboardCards">User: {username}</div>
          </Stack>
          <Stack direction="horizontal" className='dashboardSecondRow' gap={3}>
            <div className="p-2 card dashboardCards">Current Distance to the screen: {distance.toFixed(2)} cm</div>
            <div className="p-2 card dashboardCards">Status Critical</div>
            <div className="p-2 card dashboardCards">
              <Button onClick={toggleCamera}>
                {isCameraActive ? "Stop Camera" : "Start Camera"}
              </Button>
              {isCameraActive && (
                <CameraComponent onDistanceChange={handleDistanceChange} />
              )}
            </div>
          </Stack>
          <Stack direction="horizontal" className='dashboardThirdRow' gap={3}>
            <div className="p-2 card dashboardCards">Interaction Time: {formatTime(interactionTime)}</div>
            <div className="p-2 card dashboardCards w-50">Eyes Interacting? {eyeInteraction}</div>
          </Stack>
          <Stack direction="horizontal" className='dashboardForthRow' gap={3}>
            <div className="p-2 card dashboardCards">Graph</div>
            <div className="p-2 card dashboardCards w-50">Graph</div>
          </Stack>
        </Stack>
      </Container>
      <FooterCommon />
    </div>
  )
}
