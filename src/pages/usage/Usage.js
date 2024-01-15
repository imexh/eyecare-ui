import React, { useState, useEffect } from 'react';
import NavBarCommon from '../../components/NavBarCommon';
import FooterCommon from '../../components/FooterCommon';
import { useNavigate } from "react-router-dom";
import BarChart from '../../components/charts/BarChart';
import postService from '../../services/post.service';
import AuthService from "../../services/auth.service";
import LineChart from '../../components/charts/LineChart';

export default function Usage() {
  const [weeklyLabels, setWeeklyLabels] = useState([]);
  const [weeklyDistanceData, setWeeklyDistanceData] = useState([]);
  const [weeklyInteractionData, setWeeklyInteractionData] = useState([]);

  const [monthlyLabels, setMonthlyLabels] = useState([]);
  const [monthlyDistanceData, setMonthlyDistanceData] = useState([]);
  const [monthlyInteractionData, setMonthlyInteractionData] = useState([]);

  const [weeklyLineLabels, setWeeklyLineLabels] = useState(["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]);
  const [previousWeeklyDistanceData, setPreviousWeeklyDistanceData] = useState([]);
  const [previousWeeklyInteractionData, setPreviousWeeklyInteractionData] = useState([]);

  const navigate = useNavigate();

  // Function to populate weekly graphs
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

          setWeeklyDistanceData(valuesArray);
          setWeeklyLabels(keysArray);
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

          setWeeklyInteractionData(valuesArray);
          setWeeklyLabels(keysArray);
        })
        .catch((error) => {
          console.log("Private page", error.response);
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });

      postService.getPreviousWeeklyDistances(currentUser)
        .then((response) => {
          const keysArray = [];
          const valuesArray = [];

          for (const [key, value] of Object.entries(response.data.distances)) {
            keysArray.push(key);
            valuesArray.push(value);
          }

          setPreviousWeeklyDistanceData(valuesArray);
        })
        .catch((error) => {
          console.log("Private page", error.response);
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });

      postService.getPreviousWeeklyInteractionTimes(currentUser)
        .then((response) => {
          const keysArray = [];
          const valuesArray = [];

          for (const [key, value] of Object.entries(response.data.interactionTimes)) {
            keysArray.push(key);
            valuesArray.push(value);
          }

          setPreviousWeeklyInteractionData(valuesArray);
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

  // Function to populate monthly graphs
  useEffect(() => {
    if (AuthService.getCurrentUser() == null) {
      navigate("/login");
    } else {
      const currentUser = AuthService.getCurrentUser().username;

      postService.getMonthlyDistances(currentUser)
        .then((response) => {
          const keysArray = [];
          const valuesArray = [];

          for (const [key, value] of Object.entries(response.data.distances)) {
            keysArray.push(key);
            valuesArray.push(value);
          }

          setMonthlyDistanceData(valuesArray);
          setMonthlyLabels(keysArray);
        })
        .catch((error) => {
          console.log("Private page", error.response);
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });

      postService.getMonthlyInteractionTimes(currentUser)
        .then((response) => {
          const keysArray = [];
          const valuesArray = [];

          for (const [key, value] of Object.entries(response.data.interactionTimes)) {
            keysArray.push(key);
            valuesArray.push(value);
          }

          setMonthlyInteractionData(valuesArray);
          setMonthlyLabels(keysArray);
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

  return (
    <div>
      <NavBarCommon />

      <div className="min-h-full mb-12">
        <header className="bg-white shadow pb-2 mx-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Usage Reports</h1>
          </div>
        </header>
        <main className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mx-auto px-16 mt-12">
          <div className="sm:col-span-3 max-w-7xl py-6  lg:px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <BarChart title={"Weekly Average Distances"} chartLabels={weeklyLabels} yLabel={"Average Distance (cm)"} chartData={weeklyDistanceData} />
          </div>
          <div className="sm:col-span-3 max-w-7xl py-6  lg:px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <BarChart title={"Weekly Interaction Times"} chartLabels={weeklyLabels} yLabel={"Interaction Time (sec)"} chartData={weeklyInteractionData} />
          </div>
          <div className="sm:col-span-6  py-6 bg-gray-200 bg-opacity-30 rounded-md">
            <BarChart title={"Monthly Average Distances"} chartLabels={monthlyLabels} yLabel={"Average Distance (cm)"} chartData={monthlyDistanceData} />
          </div>
          <div className="sm:col-span-6  py-6 bg-gray-200 bg-opacity-30 rounded-md">
            <BarChart title={"Monthly Interaction Times"} chartLabels={monthlyLabels} yLabel={"Interaction Time (sec)"} chartData={monthlyInteractionData} />
          </div>
          <div className="sm:col-span-3 max-w-7xl py-6  lg:px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <LineChart title={"Distances"} chartLabels={weeklyLineLabels}
              yLabel1={"This Week (cm)"} chartData1={weeklyDistanceData}
              yLabel2={"Previous Week (cm)"} chartData2={previousWeeklyDistanceData} />
          </div>
          <div className="sm:col-span-3 max-w-7xl py-6 lg:px-8 bg-gray-200 bg-opacity-30 rounded-md">
            <LineChart title={"Interaction Times"} chartLabels={weeklyLineLabels}
              yLabel1={"This Week (sec)"} chartData1={weeklyInteractionData}
              yLabel2={"Previous Week (sec)"} chartData2={previousWeeklyInteractionData} />
          </div>
        </main>
      </div>

      <FooterCommon />
    </div>
  )
}
