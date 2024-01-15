import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import FooterCommon from '../../components/FooterCommon';
import { useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";

export default function Contacts() {
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);
  const [website, setWebsite] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getContactDetails()
      .then((response) => {
        setEmail(response.data.contactUs.email);
        setContact(response.data.contactUs.contactNo);
        setWebsite(response.data.contactUs.websiteUrl);
      })
      .catch((error) => {
        console.log('Private page', error.response);
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate('/login');
          window.location.reload();
        }
      })
  }, [navigate]);

  return (
    <>
      <NavBarCommon />
      <div className="bg-white py-24 sm:py-32" style={{ minHeight: '80vh' }}>
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-3xl text-justify">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get in touch</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We try to respond to you as soon as possible.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-8 xl:col-span-2">
            <div className="group relative">
              <div className="w-full overflow-hidden rounded-md group-hover:opacity-75">
                <div className="pl-12 pt-12 pb-8 bg-gray-200 p-4 w-full md:w-auto bg-opacity-30">
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className='text-indigo-600'>{email}</p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="w-full overflow-hidden rounded-md group-hover:opacity-75">
                <div className="pl-12 pt-12 pb-8 bg-gray-200 p-4 w-full md:w-auto bg-opacity-30">
                  <h3 className="text-lg font-semibold">Contact Number</h3>
                  <p className='text-indigo-600'>{contact}</p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="w-full overflow-hidden rounded-md group-hover:opacity-75">
                <div className="pl-12 pt-12 pb-8 bg-gray-200 p-4 w-full md:w-auto bg-opacity-30">
                  <h3 className="text-lg font-semibold">Website</h3>
                  <p className='text-indigo-600'>{website}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterCommon />
    </>
  )
}
