import React from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Stack from 'react-bootstrap/Stack';
import "./Dashboard.css";
import { Container } from 'react-bootstrap';
import FooterCommon from '../../components/FooterCommon';


export default function Dashboard() {
  return (
    <div>
      <NavBarCommon />
      <Container className='dashboardDivCardsPanel'>
        <h1>Dashboard</h1>
        <Stack className="dashboardCardsPanel h-100" gap={3}>
          <Stack direction="horizontal" className='dashboardFirstRow' gap={3}>
            <div className="p-2 dashboardCards">Date: 01/12/2023</div>
            <div className="p-2 dashboardCards">Time Elapsed: 00:01:30</div>
            <div className="p-2 dashboardCards">User: Imexh</div>
          </Stack>
          <Stack direction="horizontal" className='dashboardSecondRow' gap={3}>
            <div className="p-2 card dashboardCards">Current Distance to the screen</div>
            <div className="p-2 card dashboardCards">Status Critical</div>
            <div className="p-2 card dashboardCards">Camera</div>
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
