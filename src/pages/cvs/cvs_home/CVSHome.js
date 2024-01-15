import React, { useEffect } from 'react'
import NavBarCommon from '../../../components/NavBarCommon'
import FooterCommon from '../../../components/FooterCommon'
import { useNavigate } from 'react-router-dom';
import PostService from "../../../services/post.service";
import AuthService from "../../../services/auth.service";

export default function CVSHome() {
  const Navigate = useNavigate();

  const handleNextButtonClick = () => {
    Navigate("/cvs-input");
  };

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
      <div className="bg-white">
        <div className="mx-auto max-w-7xl sm:px-6 sm:py-20 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto text-center lg:mx-0 lg:flex-auto lg:py-20 lg:text-justify pb-20">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Do you have Computer Vision Syndrome?

              </h2>
              <p className='mt-6 text-lg leading-8 text-gray-300'>Welcome to Computer Vision Syndrome Prediction portal, where we aim to raise awareness about the potential risks associated with prolonged digital device usage. Computer Vision Syndrome (CVS) is a condition that arises from the extended use of computers, smartphones, and other digital screens. Common symptoms include eye strain, headaches, blurred vision, and dry eyes, impacting the overall visual health and well-being of individuals.</p>
              <p className='mt-6 text-lg leading-8 text-gray-300'>Our platform offers a user-friendly and accessible way to assess the likelihood of experiencing Computer Vision Syndrome. By taking a simple test, you can gain insights into your digital habits and receive a probability score indicating the likelihood of developing CVS based on established patterns and risk factors.</p>
              <p className='mt-6 text-lg leading-8 text-gray-300'>However, it's crucial to note that our prediction model is not infallible. While we strive to provide accurate and informative results, we emphasize that our platform is not intended for medical diagnosis or treatment. The information generated is purely indicative and should not be used as a substitute for professional medical advice.</p>
              <p className='mt-6 text-lg leading-8 text-gray-300'>We explicitly disclaim any responsibility for decisions or actions taken based on the predictions provided by our model. It is advisable to consult with a qualified healthcare professional for personalized medical advice and diagnosis regarding any visual health concerns.</p>
              <p className='mt-6 text-lg leading-8 text-gray-300'>At our core, we are committed to promoting awareness and encouraging users to adopt healthier digital habits. Remember that taking breaks, practicing the 20-20-20 rule, and maintaining proper ergonomics are essential steps in minimizing the risk of Computer Vision Syndrome. Explore our platform responsibly and prioritize your visual health on your digital journey.</p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a href=''
                  onClick={handleNextButtonClick}
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </a>
                <a href="/help" className="text-sm font-semibold leading-6 text-white">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterCommon />
    </>
  )
}
