import React, { useState, useEffect } from 'react';
import NavBarCommon from '../../components/NavBarCommon';
import FooterCommon from '../../components/FooterCommon';
import { Container } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import './Usage.css'
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
    }
  }, [navigate]);

  // Function to populate monthly graphs
  useEffect(() => {
    if (AuthService.getCurrentUser() == null) {
      navigate("/login");
    } else {
      const currentUser = AuthService.getCurrentUser().username;
      // Change implementation in post.service.js
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

      // Change implementation in post.service.js
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
      <Container className='usageDivCardsPanel'>
        <h1>Usage Reports</h1>
        <Stack className="usageCardsPanel h-100" gap={3}>
          <Stack direction="horizontal" gap={3} className='usageFSecondRow'>
            <div className="p-2 card usageCards">
              <BarChart title={"Weekly Average Distances"} chartLabels={weeklyLabels} yLabel={"Average Distance (cm)"} chartData={weeklyDistanceData} />
            </div>
            <div className="p-2 card usageCards">
              <BarChart title={"Weekly Interaction Times"} chartLabels={weeklyLabels} yLabel={"Interaction Time (sec)"} chartData={weeklyInteractionData} />
            </div>
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <div className="p-2 card usageCards">
              <BarChart title={"Monthly Average Distances"} chartLabels={monthlyLabels} yLabel={"Average Distance (cm)"} chartData={monthlyDistanceData} />
            </div>
            <div className="p-2 card usageCards">
              <BarChart title={"Monthly Interaction Times"} chartLabels={monthlyLabels} yLabel={"Interaction Time (sec)"} chartData={monthlyInteractionData} />
            </div>
          </Stack>
          {/* Change to line graphs and add 4 weeks on month */}
          <Stack direction="horizontal" className='usageForthRow' gap={3}>
            <div className="p-2 card usageCards">
              <LineChart title={"Distances"} chartLabels={weeklyLineLabels} yLabel1={"Average Distance (cm)"} chartData1={weeklyInteractionData} />
            </div>
            <div className="p-2 card usageCards">
              <LineChart title={"Interaction Times"} chartLabels={weeklyLineLabels} yLabel1={"Interaction Time (sec)"} chartData1={weeklyInteractionData} />
            </div>
          </Stack>
        </Stack>
      </Container>
      <FooterCommon />
    </div>
  )
}
