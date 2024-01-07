import React, { useState } from 'react'
import NavBarCommon from '../../../components/NavBarCommon'
import FooterCommon from '../../../components/FooterCommon'
import { Container } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap';
import './CVSInput.css';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PostService from "../../../services/post.service";
import Modal from 'react-bootstrap/Modal';

export default function CVSInput() {
  const [age, setAge] = useState();
  const [gender, setGender] = useState("Male");
  const [averageHours, setAverageHours] = useState("Below 2 hours");
  const [eyeDisease, setEyeDisease] = useState("No");
  const [contactLenses, setContactLenses] = useState("No");
  const [monitorFilters, setMonitorFilters] = useState("No");
  const [eyeSurgeries, setEyeSurgeries] = useState("No");
  const [averageDistance, setAverageDistance] = useState();
  const [roomIllumination, setRoomIllumination] = useState("Dark");
  const [screenBrightness, setScreenBrightness] = useState("Dark");
  const [breaks, setBreaks] = useState("Every 15 minutes");

  const [headache, setHeadache] = useState("No Symptoms");
  const [burningEyeSensation, setBurningEyeSensation] = useState("No Symptoms");
  const [eyeRedness, setEyeRedness] = useState("No Symptoms");
  const [blurredVision, setBlurredVision] = useState("No Symptoms");
  const [dryEyes, setDryEyes] = useState("No Symptoms");
  const [neckAndShoulderPain, setNeckAndShoulderPain] = useState("No Symptoms");
  const [eyeStrain, setEyeStrain] = useState("No Symptoms");
  const [tiredEyes, setTiredEyes] = useState("No Symptoms");
  const [soreEyes, setSoreEyes] = useState("No Symptoms");
  const [irritation, setIrritation] = useState("No Symptoms");
  const [poorFocusing, setPoorFocusing] = useState("No Symptoms");
  const [doubleVision, setDoubleVision] = useState("No Symptoms");

  const [cvsPercentage, setCVSPercentage] = useState(0.0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PostService.calculateCvsPercentage(
        age, gender, averageHours, eyeDisease, contactLenses, monitorFilters, eyeSurgeries, averageDistance,
        roomIllumination, screenBrightness, breaks, headache, burningEyeSensation, eyeRedness, blurredVision, dryEyes,
        neckAndShoulderPain, eyeStrain, tiredEyes, soreEyes, irritation, poorFocusing, doubleVision
      )
        .then((response) => {
          setCVSPercentage(response.data.percentage)
          handleShow();
        },
          (error) => {
            alert(error.response.data.message)
          }
        );
    } catch (err) {
      console.error(err);
    }
  }

  const handleHomeButton = (e) => {
    Navigate("/dashboard");
  }

  const handleRetestButton = (e) => {
    Navigate("/cvs-home");
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  }

  const handleAverageHoursChange = (e) => {
    setAverageHours(e.target.value);
  }

  const handleEyeDiseaseChange = (e) => {
    setEyeDisease(e.target.value);
  }

  const handleContactLensesChange = (e) => {
    setContactLenses(e.target.value);
  }

  const handleMonitorFiltersChange = (e) => {
    setMonitorFilters(e.target.value);
  }

  const handleEyeSurgeriesChange = (e) => {
    setEyeSurgeries(e.target.value);
  }

  const handleRoomIlluminationChange = (e) => {
    setRoomIllumination(e.target.value);
  }

  const handleScreenBrightnessChange = (e) => {
    setScreenBrightness(e.target.value);
  }

  const handleBreaksChange = (e) => {
    setBreaks(e.target.value);
  }

  const handleHeadacheChange = (e) => {
    setHeadache(e.target.value);
  }

  const handleBurningEyeSensationChange = (e) => {
    setBurningEyeSensation(e.target.value);
  }

  const handleEyeRednessChange = (e) => {
    setEyeRedness(e.target.value);
  }

  const handleBlurredVisionChange = (e) => {
    setBlurredVision(e.target.value);
  }

  const handleDryEyesChange = (e) => {
    setDryEyes(e.target.value);
  }

  const handleNeckAndShoulderPainChange = (e) => {
    setNeckAndShoulderPain(e.target.value);
  }

  const handleEyeStrainChange = (e) => {
    setEyeStrain(e.target.value);
  }

  const handleTiredEyesChange = (e) => {
    setTiredEyes(e.target.value);
  }

  const handleSoreEyesChange = (e) => {
    setSoreEyes(e.target.value);
  }

  const handleIrritationChange = (e) => {
    setIrritation(e.target.value);
  }

  const handlePoorFocusingChange = (e) => {
    setPoorFocusing(e.target.value);
  }

  const handleDoubleVisionChange = (e) => {
    setDoubleVision(e.target.value);
  }

  return (
    <div className='cvs-input-background'>
      <NavBarCommon />
      <h1>Computer Vision Syndrome Portal</h1>
      <Container className='cvs-inputContainer cvs-inputRow mx-auto card'>
        <Row className='first-row-cvs-input'>
          <Col>
            <p className='cvs-input-title-fonts'>Form</p>
          </Col>
        </Row>
        <Row className='inner-row-cvs-input'>
          <Container className='cvs-inputContainer mx-auto card cvs-input-inner-container'>
            <Form onSubmit={handleSubmit} className='form-label-cvs-input'>
              <Row className='second-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <p><b>General</b></p>
                </Col>
              </Row>
              <Row className='middle-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" required onChange={(e) => setAge(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select onChange={handleGenderChange} value={gender}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='middle-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupGender">
                    <Form.Label>Average number of hours you spend in front of a screen a day?</Form.Label>
                    <Form.Select onChange={handleAverageHoursChange} value={averageHours}>
                      <option value="Below 2 hours">Below 2 hours</option>
                      <option value="2 - 4 hours">2 - 4 hours</option>
                      <option value="More than 4 hours">More than 4 hours</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupAverageDistance">
                    <Form.Label>Average distance from monitor (in cm)?</Form.Label>
                    <Form.Control type="number" placeholder="Enter average distance" required onChange={(e) => setAverageDistance(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className='middle-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupContactLenses">
                    <Form.Label>Do you use contact lenses?</Form.Label>
                    <Form.Select onChange={handleContactLensesChange} value={contactLenses}>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupEyeDisease">
                    <Form.Label>Do you have a history of eye disease and treatment?</Form.Label>
                    <Form.Select onChange={handleEyeDiseaseChange} value={eyeDisease}>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='middle-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupEyeSurgeries">
                    <Form.Label>Have you done previous eye surgeries?</Form.Label>
                    <Form.Select onChange={handleEyeSurgeriesChange} value={eyeSurgeries}>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupMonitorFilters">
                    <Form.Label>Do you use monitor filters/blue light filters?</Form.Label>
                    <Form.Select onChange={handleMonitorFiltersChange} value={monitorFilters}>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='middle-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupRoomIllumination">
                    <Form.Label>Room illumination</Form.Label>
                    <Form.Select onChange={handleRoomIlluminationChange} value={roomIllumination} >
                      <option value="Dark">Dark</option>
                      <option value="Dull">Dull</option>
                      <option value="Bright">Bright</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupScreenBrightness">
                    <Form.Label>Screen brightness</Form.Label>
                    <Form.Select onChange={handleScreenBrightnessChange} value={screenBrightness} >
                      <option value="Dark">Dark</option>
                      <option value="Dull">Dull</option>
                      <option value="Bright">Bright</option>
                      <option value="Very Bright">Very Bright</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='middle-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupBreaks">
                    <Form.Label>How often do you take breaks during the use of an electronic device?</Form.Label>
                    <Form.Select onChange={handleBreaksChange} value={breaks}>
                      <option value="Every 15 minutes">Every 15 minutes</option>
                      <option value="Every 20 minutes">Every 20 minutes</option>
                      <option value="After 20 minutes">After 20 minutes</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='second-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <p><b>Symptoms</b></p>
                </Col>
              </Row>
              <Row className='middle-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupHeadache">
                    <Form.Label>Headache</Form.Label>
                    <Form.Select onChange={handleHeadacheChange} value={headache} >
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupBurningEyeSensation">
                    <Form.Label>Burning eye sensation</Form.Label>
                    <Form.Select onChange={handleBurningEyeSensationChange} value={burningEyeSensation}>
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupEyeRedness">
                    <Form.Label>Eye redness</Form.Label>
                    <Form.Select onChange={handleEyeRednessChange} value={eyeRedness}>
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='middle-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupBlurredVision">
                    <Form.Label>Blurred Vision</Form.Label>
                    <Form.Select onChange={handleBlurredVisionChange} value={blurredVision}>
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupDryEyes">
                    <Form.Label>Dry Eyes</Form.Label>
                    <Form.Select onChange={handleDryEyesChange} value={dryEyes}>
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupNeckAndShoulderPain">
                    <Form.Label>Neck And Shoulder Pain</Form.Label>
                    <Form.Select onChange={handleNeckAndShoulderPainChange} value={neckAndShoulderPain}>
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='middle-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupEyeStrain">
                    <Form.Label>Eye Strain</Form.Label>
                    <Form.Select onChange={handleEyeStrainChange} value={eyeStrain}>
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupTiredEyes">
                    <Form.Label>Tired Eyes</Form.Label>
                    <Form.Select onChange={handleTiredEyesChange} value={tiredEyes}>
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupSoreEyes">
                    <Form.Label>Sore Eyes</Form.Label>
                    <Form.Select onChange={handleSoreEyesChange} value={soreEyes}>
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='middle-row-cvs-input cvs-input-body-fonts'>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupIrritation">
                    <Form.Label>Irritation</Form.Label>
                    <Form.Select onChange={handleIrritationChange} value={irritation}>
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupPoorFocusing">
                    <Form.Label>Poor Focusing</Form.Label>
                    <Form.Select onChange={handlePoorFocusingChange} value={poorFocusing}>
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formGroupDoubleVision">
                    <Form.Label>Double Vision</Form.Label>
                    <Form.Select onChange={handleDoubleVisionChange} value={doubleVision}>
                      <option value="No Symptoms">No Symptoms</option>
                      <option value="Have Symptoms">Have Symptoms</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col>
                  <Button className="TestButton" variant="primary" type="submit">Start Test</Button>
                </Col>
                <Col></Col>
              </Row>
            </Form>
          </Container>
        </Row>
      </Container>
      <div className='final-div-cvs-input'></div>
      <FooterCommon />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Computer Vision Syndrome Percentage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cvsPercentage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRetestButton}>
            Re-Test
          </Button>
          <Button variant="primary" onClick={handleHomeButton}>Home</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
