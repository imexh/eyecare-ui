import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Stack from 'react-bootstrap/Stack';
import "./Dashboard.css";
import { Container } from 'react-bootstrap';
import FooterCommon from '../../components/FooterCommon';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import CameraComponent from '../../components/Camera';

export default function Dashboard() {
  const [username, setUsername] = useState([""]);
  const [date, setDate] = useState([""]);

  const navigate = useNavigate();

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

  return (
    <div>
      <NavBarCommon />
      <Container className='dashboardDivCardsPanel'>
        <h1>Dashboard</h1>
        <Stack className="dashboardCardsPanel h-100" gap={3}>
          <Stack direction="horizontal" className='dashboardFirstRow' gap={3}>
            <div className="p-2 dashboardCards">Date: {date}</div>
            <div className="p-2 dashboardCards">Time Elapsed: 00:01:30</div>
            <div className="p-2 dashboardCards">User: {username}</div>
          </Stack>
          <Stack direction="horizontal" className='dashboardSecondRow' gap={3}>
            <div className="p-2 card dashboardCards">Current Distance to the screen</div>
            <div className="p-2 card dashboardCards">Status Critical</div>
            <div className="p-2 card dashboardCards">
              Camera
            </div>
          </Stack>
          <Stack direction="horizontal" className='dashboardThirdRow' gap={3}>
            <div className="p-2 card dashboardCards">Interaction Time</div>
            <div className="p-2 card dashboardCards w-50">Eyes Interacting?</div>
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
