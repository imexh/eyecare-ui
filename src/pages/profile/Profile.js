import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import FooterCommon from '../../components/FooterCommon'
import { useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { DatePicker } from '@gsebdev/react-simple-datepicker';

export default function Profile() {
  const [name, setName] = useState([""]);
  const [username, setUsername] = useState([""]);
  const [email, setEmail] = useState([""]);
  const [contact, setContact] = useState([""]);
  const [birthday, setBirthday] = useState([""]);

  const [newname, setNewName] = useState([""]);
  const [newemail, setNewEmail] = useState([""]);
  const [newcontact, setNewContact] = useState([""]);
  const [newbirthday, setNewBirthday] = useState([""]);

  const [loading, setLoading] = useState(false);

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isContactEditing, setIsContactEditing] = useState(false);
  const [isBirthdayEditing, setIsBirthdayEditing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handleNameEditClick = () => {
    setNewName(name);
    setIsNameEditing(true);
  };

  const handleNameCancelClick = () => {
    setIsNameEditing(false);
  };

  const handleEmailEditClick = () => {
    setNewEmail(email);
    setIsEmailEditing(true);
  };

  const handleEmailCancelClick = () => {
    setIsEmailEditing(false);
  };

  const handleContactEditClick = () => {
    setNewContact(contact);
    setIsContactEditing(true);
  };

  const handleContactCancelClick = () => {
    setIsContactEditing(false);
  };

  const handleBirthdayEditClick = () => {
    setNewBirthday(birthday);
    setIsBirthdayEditing(true);
  };

  const handleBirthdayCancelClick = () => {
    setIsBirthdayEditing(false);
  };

  useEffect(() => {
    if (AuthService.getCurrentUser() == null) {
      navigate("/login");
    } else {
      const currentUser = AuthService.getCurrentUser().username;
      PostService.getUserDetails(currentUser)
        .then((response) => {
          console.log(response);
          setName(response.data.name);
          setUsername(response.data.username);
          setEmail(response.data.email);
          setBirthday(response.data.birthday);
          setContact(response.data.contactNo);
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

  const handleChangeName = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser().username;
      await PostService.addAccountDetails(currentUser, newname, birthday, contact, email)
        .then(() => {
          window.location.reload();
        },
          (error) => {
            alert(error.response.data.message)
          }
        );
    } catch (err) {
      console.error("Error updating name:", err);
      alert("Failed to update name. Please try again.");
    } finally {
      setLoading(false);
      setIsNameEditing(false);
    }
  };

  const handleChangeUsername = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      alert("Under construction!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser().username;
      await PostService.addAccountDetails(currentUser, name, birthday, newcontact, email)
        .then(() => {
          window.location.reload();
        },
          (error) => {
            alert(error.response.data.message)
          }
        );
    } catch (err) {
      console.error("Error updating contact:", err);
      alert("Failed to update contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser().username;
      await PostService.addAccountDetails(currentUser, name, birthday, contact, newemail)
        .then(() => {
          window.location.reload();
        },
          (error) => {
            alert(error.response.data.message)
          }
        );
    } catch (err) {
      console.error("Error updating email:", err);
      alert("Failed to update email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeBirthday = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser().username;
      await PostService.addAccountDetails(currentUser, name, newbirthday, contact, email)
        .then(() => {
          window.location.reload();
        },
          (error) => {
            alert(error.response.data.message)
          }
        );
    } catch (err) {
      console.error("Error updating birthday:", err);
      alert("Failed to update birthday. Please try again.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      alert("Under construction!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBarCommon />

      <div className='mx-auto mx-auto px-24 mt-8 mb-8' style={{ minHeight: '75vh' }}>
        <div className="px-4 sm:px-0">
          <h3 className="font-semibold leading-7 text-gray-900 text-3xl">Profile</h3>
          <p className="mt-1 max-w-2xl text-xl leading-6 text-gray-500">Personal Information.</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">Full Name</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {isNameEditing ? (
                  <div className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2">
                        <input
                          type="text"
                          value={newname}
                          onChange={(e) => setNewName(e.target.value)}
                          className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div classname="ml-4 flex-shrink-0">
                      <button onClick={handleNameCancelClick} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        Cancel
                      </button>
                      <button onClick={handleChangeName} className="ml-2 text-indigo-600 hover:text-indigo-500 focus:outline-none">
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
                        <span className="truncate leading-6 text-gray-700 text-lg">{name}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={handleNameEditClick}>
                        Change
                      </a>
                    </div>
                  </li>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="font-medium leading-6 text-gray-900 text-lg">Username</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {isEditing ? (
                  <div className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2">
                        <input
                          type="text"
                          value={newbirthday}
                          onChange={(e) => setNewBirthday(e.target.value)}
                          className="truncate leading-6 text-gray-700 focus:outline-none "
                        />
                      </div>
                    </div>
                    <div classname="ml-4 flex-shrink-0">
                      <button onClick={handleBirthdayCancelClick} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        Cancel
                      </button>
                      <button onClick={handleChangeBirthday} className="ml-2 text-indigo-600 hover:text-indigo-500 focus:outline-none">
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2">
                        <span className="truncate leading-6 text-gray-700 text-lg">{username}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">

                      </a>
                    </div>
                  </li>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="font-medium leading-6 text-gray-900 text-lg">Email address</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {isEmailEditing ? (
                  <div className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2">
                        <input
                          type="text"
                          value={newemail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div classname="ml-4 flex-shrink-0">
                      <button onClick={handleEmailCancelClick} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        Cancel
                      </button>
                      <button onClick={handleChangeEmail} className="ml-2 text-indigo-600 hover:text-indigo-500 focus:outline-none">
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
                        <span className="truncate leading-6 text-gray-700 text-lg">{email}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={handleEmailEditClick}>
                        Change
                      </a>
                    </div>
                  </li>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">Contact number</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {isContactEditing ? (
                  <div className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2">
                        <input
                          type="text"
                          value={newcontact}
                          onChange={(e) => setNewContact(e.target.value)}
                          className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div classname="ml-4 flex-shrink-0">
                      <button onClick={handleContactCancelClick} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        Cancel
                      </button>
                      <button onClick={handleChangeContact} className="ml-2 text-indigo-600 hover:text-indigo-500 focus:outline-none">
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
                        <span className="truncate leading-6 text-gray-700 text-lg">{contact}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={handleContactEditClick}>
                        Change
                      </a>
                    </div>
                  </li>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">Birthday</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {isBirthdayEditing ? (
                  <div className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2">
                        <DatePicker
                          id="datepicker-id"
                          name="birthday"
                          onChange={(date) => setNewBirthday(date.target.value)}
                          value={newbirthday}
                        />
                      </div>
                    </div>
                    <div classname="ml-4 flex-shrink-0">
                      <button onClick={handleBirthdayCancelClick} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        Cancel
                      </button>
                      <button onClick={handleChangeBirthday} className="ml-2 text-indigo-600 hover:text-indigo-500 focus:outline-none">
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
                        <span className="truncate leading-6 text-gray-700 text-lg">{birthday}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={handleBirthdayEditClick}>
                        Change
                      </a>
                    </div>
                  </li>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-lg font-medium leading-6 text-gray-900">Password</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {isEditing ? (
                  <div className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2">
                        <input
                          type="text"
                          value={newbirthday}
                          onChange={(e) => setNewBirthday(e.target.value)}
                          className="truncate leading-6 text-gray-700 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div classname="ml-4 flex-shrink-0">
                      <button onClick={handleBirthdayCancelClick} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        Cancel
                      </button>
                      <button onClick={handleChangeBirthday} className="ml-2 text-indigo-600 hover:text-indigo-500 focus:outline-none">
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="flex min-w-0 flex-1 gap-2">
                        <span className="truncate leading-6 text-gray-700 text-lg">*************</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">

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
