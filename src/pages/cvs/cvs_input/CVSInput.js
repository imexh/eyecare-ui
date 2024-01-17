import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../../components/NavBarCommon'
import FooterCommon from '../../../components/FooterCommon'
import { useNavigate } from "react-router-dom";
import PostService from "../../../services/post.service";
import AuthService from "../../../services/auth.service";
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function CVSInput() {
  const [age, setAge] = useState();
  const [gender, setGender] = useState("1");
  const [averageHours, setAverageHours] = useState("0");
  const [eyeDisease, setEyeDisease] = useState("0");
  const [contactLenses, setContactLenses] = useState("0");
  const [monitorFilters, setMonitorFilters] = useState("0");
  const [eyeSurgeries, setEyeSurgeries] = useState("0");
  const [averageDistance, setAverageDistance] = useState();
  const [roomIllumination, setRoomIllumination] = useState("0");
  const [screenBrightness, setScreenBrightness] = useState("0");
  const [breaks, setBreaks] = useState("0");

  const [headache, setHeadache] = useState("0");
  const [burningEyeSensation, setBurningEyeSensation] = useState("0");
  const [eyeRedness, setEyeRedness] = useState("0");
  const [blurredVision, setBlurredVision] = useState("0");
  const [dryEyes, setDryEyes] = useState("0");
  const [neckAndShoulderPain, setNeckAndShoulderPain] = useState("0");
  const [eyeStrain, setEyeStrain] = useState("0");
  const [tiredEyes, setTiredEyes] = useState("0");
  const [soreEyes, setSoreEyes] = useState("0");
  const [irritation, setIrritation] = useState("0");
  const [poorFocusing, setPoorFocusing] = useState("0");
  const [doubleVision, setDoubleVision] = useState("0");

  const [cvsPercentage, setCVSPercentage] = useState(0.0);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
            setCVSPercentage('Oops! Something went wrong!')
            handleShow();
          }
        );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

  //Function to logout if not authenticated
  useEffect(() => {
    PostService.getContactDetails()
      .catch((error) => {
        console.log('Private page', error.response);
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          Navigate('/login');
          window.location.reload();
        }
      });
  }, [Navigate]);

  return (
    <>
      <NavBarCommon />
      <form className='mx-auto mt-8 mb-8 px-16' onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-3xl font-semibold leading-7 text-gray-900">General Information</h2>
            <p className="mt-1 text-xl leading-6 text-gray-600">Provide general information for prediction.</p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                  Age
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="age"
                    id="age"
                    required onChange={(e) => setAge(e.target.value)}
                    autoComplete="age"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    name="gender"
                    onChange={handleGenderChange}
                    value={gender}
                    autoComplete="gender"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="averageHours" className="block text-sm font-medium leading-6 text-gray-900">
                  Average number of hours you spend in front of a screen a day?
                </label>
                <div className="mt-2">
                  <select
                    id="averageHours"
                    name="averageHours"
                    onChange={handleAverageHoursChange}
                    value={averageHours}
                    autoComplete="gender"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">Below 2 hours</option>
                    <option value="1">2 - 4 hours</option>
                    <option value="2">More than 4 hours</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="averageDistance" className="block text-sm font-medium leading-6 text-gray-900">
                  Average distance from monitor (in cm)?
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="averageDistance"
                    id="averageDistance"
                    step="any"
                    required
                    onChange={(e) => setAverageDistance(e.target.value)}
                    autoComplete="averageDistance"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contactLenses" className="block text-sm font-medium leading-6 text-gray-900">
                  Do you use contact lenses?
                </label>
                <div className="mt-2">
                  <select
                    id="contactLenses"
                    name="contactLenses"
                    onChange={handleContactLensesChange}
                    value={contactLenses}
                    autoComplete="contactLenses"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="eyeDisease" className="block text-sm font-medium leading-6 text-gray-900">
                  Do you have a history of eye disease and treatment?
                </label>
                <div className="mt-2">
                  <select
                    id="eyeDisease"
                    name="eyeDisease"
                    onChange={handleEyeDiseaseChange}
                    value={eyeDisease}
                    autoComplete="eyeDisease"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>


              </div>

              <div className="sm:col-span-2">
                <label htmlFor="eyeSurgeries" className="block text-sm font-medium leading-6 text-gray-900">
                  Have you done previous eye surgeries?
                </label>
                <div className="mt-2">
                  <select
                    id="eyeSurgeries"
                    name="eyeSurgeries"
                    onChange={handleEyeSurgeriesChange}
                    value={eyeSurgeries}
                    autoComplete="eyeSurgeries"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="monitorFilters" className="block text-sm font-medium leading-6 text-gray-900">
                  Do you use monitor filters/blue light filters?
                </label>
                <div className="mt-2">
                  <select
                    id="monitorFilters"
                    name="monitorFilters"
                    onChange={handleMonitorFiltersChange}
                    value={monitorFilters}
                    autoComplete="monitorFilters"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="roomIllumination" className="block text-sm font-medium leading-6 text-gray-900">
                  Room illumination
                </label>
                <div className="mt-2">
                  <select
                    id="roomIllumination"
                    name="roomIllumination"
                    onChange={handleRoomIlluminationChange}
                    value={roomIllumination}
                    autoComplete="roomIllumination"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">Dark</option>
                    <option value="1">Dull</option>
                    <option value="2">Bright</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="screenBrightness" className="block text-sm font-medium leading-6 text-gray-900">
                  Screen brightness
                </label>
                <div className="mt-2">
                  <select
                    id="screenBrightness"
                    name="screenBrightness"
                    onChange={handleScreenBrightnessChange}
                    value={screenBrightness}
                    autoComplete="screenBrightness"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">Dark</option>
                    <option value="1">Dull</option>
                    <option value="2">Bright</option>
                    <option value="3">Very Bright</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="breaks" className="block text-sm font-medium leading-6 text-gray-900">
                  How often do you take breaks during the use of an electronic device?
                </label>
                <div className="mt-2">
                  <select
                    id="breaks"
                    name="breaks"
                    onChange={handleBreaksChange}
                    value={breaks}
                    autoComplete="breaks"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">Every 15 minutes</option>
                    <option value="1">Every 20 minutes</option>
                    <option value="2">After 20 minutes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Symptoms</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Provide information about the symptoms you have.</p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="headache" className="block text-sm font-medium leading-6 text-gray-900">
                  Headache
                </label>
                <div className="mt-2">
                  <select
                    id="headache"
                    name="headache"
                    onChange={handleHeadacheChange}
                    value={headache}
                    autoComplete="headache"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="burningEyeSensation" className="block text-sm font-medium leading-6 text-gray-900">
                  Burning eye sensation
                </label>
                <div className="mt-2">
                  <select
                    id="burningEyeSensation"
                    name="burningEyeSensation"
                    onChange={handleBurningEyeSensationChange}
                    value={burningEyeSensation}
                    autoComplete="burningEyeSensation"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="eyeRedness" className="block text-sm font-medium leading-6 text-gray-900">
                  Eye redness
                </label>
                <div className="mt-2">
                  <select
                    id="eyeRedness"
                    name="eyeRedness"
                    onChange={handleEyeRednessChange}
                    value={eyeRedness}
                    autoComplete="eyeRedness"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="blurredVision" className="block text-sm font-medium leading-6 text-gray-900">
                  Blurred Vision
                </label>
                <div className="mt-2">
                  <select
                    id="blurredVision"
                    name="blurredVision"
                    onChange={handleBlurredVisionChange}
                    value={blurredVision}
                    autoComplete="blurredVision"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="dryEyes" className="block text-sm font-medium leading-6 text-gray-900">
                  Dry Eyes
                </label>
                <div className="mt-2">
                  <select
                    id="dryEyes"
                    name="dryEyes"
                    onChange={handleDryEyesChange}
                    value={dryEyes}
                    autoComplete="dryEyes"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="neckAndShoulderPain" className="block text-sm font-medium leading-6 text-gray-900">
                  Neck And Shoulder Pain
                </label>
                <div className="mt-2">
                  <select
                    id="neckAndShoulderPain"
                    name="neckAndShoulderPain"
                    onChange={handleNeckAndShoulderPainChange}
                    value={neckAndShoulderPain}
                    autoComplete="neckAndShoulderPain"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="eyeStrain" className="block text-sm font-medium leading-6 text-gray-900">
                  Eye Strain
                </label>
                <div className="mt-2">
                  <select
                    id="eyeStrain"
                    name="eyeStrain"
                    onChange={handleEyeStrainChange}
                    value={eyeStrain}
                    autoComplete="eyeStrain"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="tiredEyes" className="block text-sm font-medium leading-6 text-gray-900">
                  Tired Eyes
                </label>
                <div className="mt-2">
                  <select
                    id="tiredEyes"
                    name="tiredEyes"
                    onChange={handleTiredEyesChange}
                    value={tiredEyes}
                    autoComplete="tiredEyes"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="soreEyes" className="block text-sm font-medium leading-6 text-gray-900">
                  Sore Eyes
                </label>
                <div className="mt-2">
                  <select
                    id="soreEyes"
                    name="soreEyes"
                    onChange={handleSoreEyesChange}
                    value={soreEyes}
                    autoComplete="soreEyes"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="irritation" className="block text-sm font-medium leading-6 text-gray-900">
                  Irritation
                </label>
                <div className="mt-2">
                  <select
                    id="irritation"
                    name="irritation"
                    onChange={handleIrritationChange}
                    value={irritation}
                    autoComplete="irritation"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="poorFocusing" className="block text-sm font-medium leading-6 text-gray-900">
                  Poor Focusing
                </label>
                <div className="mt-2">
                  <select
                    id="poorFocusing"
                    name="poorFocusing"
                    onChange={handlePoorFocusingChange}
                    value={poorFocusing}
                    autoComplete="poorFocusing"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="doubleVision" className="block text-sm font-medium leading-6 text-gray-900">
                  Double Vision
                </label>
                <div className="mt-2">
                  <select
                    id="doubleVision"
                    name="doubleVision"
                    onChange={handleDoubleVisionChange}
                    value={doubleVision}
                    autoComplete="doubleVision"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="0">No Symptoms</option>
                    <option value="1">Have Symptoms</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" onClick={handleRetestButton} className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading && loading ? ' Loading...' : 'Start Test'}
          </button>
        </div>
      </form>

      <FooterCommon />

      <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShow}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-xl md:px-4 lg:max-w-xl text-center">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setShow(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full ">
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">Computer Vision Syndrome Percentage</h2>

                        <section aria-labelledby="information-heading" className="mt-2">
                          <p className="text-2xl text-gray-900">{cvsPercentage}</p>
                        </section>

                        <section aria-labelledby="options-heading" className="mt-10">
                          <button
                            onClick={handleRetestButton}
                            className="mt-6 w-32 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Re-Test
                          </button>
                          <span className="mx-2"></span>
                          <button
                            onClick={handleHomeButton}
                            className="mt-6 w-32 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Home
                          </button>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
