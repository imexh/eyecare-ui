import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
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
    <>
      <NavBarCommon />

      <div className="min-h-full mb-12">
        <header className="bg-white shadow pb-2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Dashboard</h1>
          </div>
        </header>
        <main className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-auto px-16 mt-12 px-24">
          <div className="sm:col-span-2 py-6 px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <span className='text-lg'><b>Date:</b> <i>{date}</i></span>
          </div>
          <div className="sm:col-span-2 py-6 px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <span className='text-lg'><b>Time Elapsed:</b> <i>{formatTime(elapsedTime)}</i></span>
          </div>
          <div className="sm:col-span-2 py-6 px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <span className='text-lg'><b>User:</b> <i>{username}</i></span>
          </div>
          <div className="sm:col-span-2 max-w-7xl py-6 px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <span className='text-lg'><b>Current Distance to the screen:</b> {distance.toFixed(2)} cm</span>
          </div>
          <div className="sm:col-span-2 max-w-7xl py-6 px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <span className='text-lg'><b>Interaction Time:</b> {formatTime(interactionTime)}</span>
          </div>
          <div className="sm:col-span-2 max-w-7xl py-6 px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <button
              onClick={toggleCamera}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {isCameraActive ? "Stop Camera" : "Start Camera"}
            </button>
          </div>
          <div className="sm:col-span-2 max-w-7xl py-6 px-8 bg-gray-200 bg-opacity-30 rounded-md h-60 flex items-center justify-center flex-col">
            <p className='text-lg'>Eyes Interacting?</p>
            <p className='text-3xl'><b>{eyeInteraction}</b></p>
          </div>
          <div className="sm:col-span-2 max-w-7xl py-6 px-8 bg-red-600 rounded-md h-60 flex items-center justify-center flex-col">
            <p className='text-lg'>Status</p>
            <p className='text-3xl'><b>Critical</b></p>
          </div>
          <div className="sm:col-span-2 max-w-7xl py-6 lg:px-8 bg-gray-400 rounded-md flex items-center justify-center h-60">
            {isCameraActive ? (
              <CameraComponent onDistanceChange={handleDistanceChange} />
            ) : (
              <img src={'images/cameracard.png'} alt="Camera" className="max-w-full max-h-full" />
            )}
          </div>
          <div className="sm:col-span-3 max-w-7xl py-6 lg:px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <BarChart title={"Weekly Distance Report (Average)"} chartLabels={labels} yLabel={"Average Distance (cm)"} chartData={distanceData} />
          </div>
          <div className="sm:col-span-3 max-w-7xl py-6 lg:px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <BarChart title={"Weekly Interaction Time Report"} chartLabels={labels} yLabel={"Interaction Time (sec)"} chartData={interactionData} />
          </div>
        </main>
      </div>

      <FooterCommon />
    </>
  )
}
