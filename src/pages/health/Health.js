import React, { useState, useEffect } from 'react';
import NavBarCommon from '../../components/NavBarCommon';
import FooterCommon from '../../components/FooterCommon';
import { useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { CalendarIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Health() {
  const [date, setDate] = useState();
  const [tips, setTips] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const currentDateWithoutTime = new Date();
      currentDateWithoutTime.setHours(0, 0, 0, 0);
      setDate(currentDateWithoutTime.toLocaleDateString());

      const response = AuthService.getCurrentUser();
      PostService.getHealthTips(response.username)
        .then((response) => {
          setTips(response.data.healthTips);
        })
        .catch((error) => {
          console.log("Private page", error.response);
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
    } catch (error) {
      console.log("Private page", error.response);
    }
  }, [navigate]);

  return (
    <>
      <NavBarCommon />
      <div className="lg:flex lg:items-center lg:justify-between mx-auto px-16 mt-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Health Tips
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {date}
            </div>
          </div>
        </div>
      </div>

      <ul role="list" className="divide-y divide-gray-100 mx-auto px-16 mt-8" style={{ minHeight: '70vh' }}>
        {tips.map((tip, index) => (
          <li key={tip} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-lg leading-6 text-gray-900">Tip {index + 1}:</p>
                <p className="mt-1 truncate font-semibold  text-xl leading-5 text-indigo-600">{tip}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <FooterCommon />
    </>
  )
}
