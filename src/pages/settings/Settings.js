import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import FooterCommon from '../../components/FooterCommon'
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [interactionTimeLimit, setInteractionTimeLimit] = useState([""]);
  const [newInteractionTimeLimit, setNewInteractionTimeLimit] = useState([""]);
  const [isInteractionTimeLimitEditing, setIsInteractionTimeLimitEditing] = useState(false);
  const [interactionTimeSelection, setInteractionTimeSelection] = useState("Default");

  const [minimumDistance, setMinimumDistance] = useState([""]);
  const [newMinimumDistance, setNewMinimumDistance] = useState([""]);
  const [maximumDistance, setMaximumDistance] = useState([""]);
  const [newMaximumDistance, setNewMaximumDistance] = useState([""]);
  const [isDistanceRangeEditing, setIsDistanceRangeEditing] = useState(false);
  const [distanceRangeSelection, setDistanceRangeSelection] = useState("Default");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.getCurrentUser() == null) {
      navigate("/login");
    } else {
      const currentUser = AuthService.getCurrentUser().username;
      PostService.getInteractionTimeLimit(currentUser)
        .then((response) => {
          setInteractionTimeLimit(response.data.interactionTimeLimit.interactionTimeLimit);
        })
        .catch((error) => {
          console.log("Private page", error.response);
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
      PostService.getDistanceRange(currentUser)
        .then((response) => {
          setMinimumDistance(response.data.distanceRange.minimumDistance);
          setMaximumDistance(response.data.distanceRange.maximumDistance);
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

  const handleInteractionTimeLimitEditClick = () => {
    setNewInteractionTimeLimit(interactionTimeLimit / 60);
    setIsInteractionTimeLimitEditing(true);
  };

  const handleInteractionTimeLimitCancelClick = () => {
    setIsInteractionTimeLimitEditing(false);
  };

  const handleDistanceRangeEditClick = () => {
    setNewMinimumDistance(minimumDistance);
    setNewMaximumDistance(maximumDistance);
    setIsDistanceRangeEditing(true);
  };

  const handleDistanceRangeCancelClick = () => {
    setIsDistanceRangeEditing(false);
  };

  const handleChangeInteractionTimeLimit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser().username;
      if (interactionTimeSelection === "Default") {
        await PostService.saveDefaultInteractionTimeLimit(currentUser)
          .then(() => {
            window.location.reload();
          },
            (error) => {
              alert(error.response.data.message)
            }
          );
      } else {
        await PostService.saveInteractionTimeLimit(currentUser, newInteractionTimeLimit * 60)
          .then(() => {
            window.location.reload();
          },
            (error) => {
              alert(error.response.data.message)
            }
          );
      }
    } catch (err) {
      console.error("Error updating interaction time limit:", err);
      alert("Failed to update interaction time limit. Please try again.");
    } finally {
      setLoading(false);
      setIsInteractionTimeLimitEditing(false);
    }
  };

  const handleChangeDistanceRange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser().username;
      if (distanceRangeSelection === "Default") {
        await PostService.saveDefaultDistanceRange(currentUser)
          .then(() => {
            window.location.reload();
          },
            (error) => {
              alert(error.response.data.message)
            }
          );
      } else {
        await PostService.saveDistanceRange(currentUser, newMinimumDistance, newMaximumDistance)
          .then(() => {
            window.location.reload();
          },
            (error) => {
              alert(error.response.data.message)
            }
          );
      }

    } catch (err) {
      console.error("Error updating distance range:", err);
      alert("Failed to update distance. Please try again.");
    } finally {
      setLoading(false);
      setIsDistanceRangeEditing(false);
    }
  };

  const handleInteractionTimeSelectionChange = (e) => {
    setInteractionTimeSelection(e.target.value);
  }

  const handleDistanceRangeSelectionChange = (e) => {
    setDistanceRangeSelection(e.target.value);
  }

  return (
    <>
      <NavBarCommon />

      <div className='mx-auto mx-auto px-24 mt-8 mb-8' style={{ minHeight: '100vh' }}>
        <div className="px-4 sm:px-0">
          <h3 className="font-semibold leading-7 text-gray-900 text-3xl">Settings</h3>
          <p className="mt-1 max-w-2xl text-xl leading-6 text-gray-500">General Settings.</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">Critical time for Interaction Time Warning</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {isInteractionTimeLimitEditing ? (
                  <div className="flex items-center justify-between py-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                          <label htmlFor="interactionTimeSelection" className="block text-sm font-medium leading-6 text-gray-900">
                            Interaction Time Selection
                          </label>
                          <div className="mt-2">
                            <select
                              id="interactionTimeSelection"
                              name="interactionTimeSelection"
                              onChange={handleInteractionTimeSelectionChange}
                              value={interactionTimeSelection}
                              autoComplete="interactionTimeSelection"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value="Default">Default (20mins)</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        {interactionTimeSelection === "Other" && (
                          <div className="sm:col-span-2">
                            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                              Interaction Time Limit (Min)
                            </label>
                            <div className="mt-2">
                              <input
                                type="number"
                                value={newInteractionTimeLimit}
                                step="any"
                                required
                                onChange={(e) => setNewInteractionTimeLimit(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div classname="ml-4 flex-shrink-0">
                      <button onClick={handleInteractionTimeLimitCancelClick} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        Cancel
                      </button>
                      <button onClick={handleChangeInteractionTimeLimit} className="ml-2 text-indigo-600 hover:text-indigo-500 focus:outline-none">
                        {loading && (
                          <span
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                        {loading ? ' Loading...' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2">
                        <span className="truncate leading-6 text-gray-700 text-lg">{interactionTimeLimit / 60} mins</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={handleInteractionTimeLimitEditClick}>
                        Change
                      </a>
                    </div>
                  </li>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">Critical range for Distance Warning</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {isDistanceRangeEditing ? (
                  <div className="flex items-center justify-between py-4 pr-5 text-sm leading-6">
                    <div className="flex min-w-0 flex-1 gap-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mr-6">
                      <div className="sm:col-span-2">
                        <label htmlFor="distanceRangeSelection" className="block text-sm font-medium leading-6 text-gray-900">
                          Distance Range Selection
                        </label>
                        <div className="mt-2">
                          <select
                            id="distanceRangeSelection"
                            name="distanceRangeSelection"
                            onChange={handleDistanceRangeSelectionChange}
                            value={distanceRangeSelection}
                            autoComplete="distanceRangeSelection"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          >
                            <option value="Default">Default (Min: 40cm Max: 60cm)</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      {distanceRangeSelection === "Other" ? (
                        <>
                          <div className="sm:col-span-2">
                            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                              Minimum Distance (cm)
                            </label>
                            <div className="mt-2">
                              <input
                                type="number"
                                step="any"
                                required
                                value={newMinimumDistance}
                                onChange={(e) => setNewMinimumDistance(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                              Maximum Distance (cm)
                            </label>
                            <div className="mt-2">
                              <input
                                type="number"
                                step="any"
                                required
                                value={newMaximumDistance}
                                onChange={(e) => setNewMaximumDistance(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div classname="ml-4 flex-shrink-0">
                      <button onClick={handleDistanceRangeCancelClick} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        Cancel
                      </button>
                      <button onClick={handleChangeDistanceRange} className="ml-2 text-indigo-600 hover:text-indigo-500 focus:outline-none">
                        {loading && (
                          <span
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                        {loading ? ' Loading...' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2">
                        <span className="truncate leading-6 text-gray-700 text-lg">Min: {minimumDistance} cm</span><br/>
                        <span className="truncate leading-6 text-gray-700 text-lg">Max: {maximumDistance} cm</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={handleDistanceRangeEditClick}>
                        Change
                      </a>
                    </div>
                  </li>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <FooterCommon />
    </>
  )
}
