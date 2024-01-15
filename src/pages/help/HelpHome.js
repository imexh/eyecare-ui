import React from 'react'
import NavbarHome from '../../components/NavbarHome'

export default function HelpHome() {
    return (
        <>
            <NavbarHome />

            <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <svg
                        className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                                width={200}
                                height={200}
                                x="50%"
                                y={-1}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M100 200V.5M.5 .5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                            <path
                                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                    </svg>
                </div>
                <div className="mx-auto text-justify grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-indigo-600">Computer Vision Syndrome Prevention Web Application User Manual</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to the Computer Vision Syndrome Prevention Web Application!</h1>
                                <p className="mt-6 text-xl leading-8 text-gray-700">
                                    Thank you for choosing our web application dedicated to predicting and preventing Computer Vision Syndrome (CVS). This user manual will guide you through the various features and functionalities of the application to ensure a seamless and healthy computing experience.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <img
                            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                            src="images/helpbanner.png"
                            alt=""
                        />
                    </div>
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                                <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">1. Getting Started</h2>
                                <p className="mt-6">
                                    1.1 System Requirements
                                    <br />
                                    Ensure that your device meets the following requirements:

                                    Web Browser: Chrome, Firefox, Safari, or Edge
                                    Webcam: Functional and connected
                                    <br /><br />
                                    1.2 Account Creation
                                    <br />
                                    To make the most of the application, create an account by clicking on the "Sign Up" button. Provide the necessary details and follow the instructions to set up your account.
                                    <br /><br />
                                    1.3 Login and Dashboard Overview
                                    <br />
                                    Log in using your credentials. Upon successful login, you'll be directed to the dashboard. The dashboard provides an overview of your current usage patterns and health status.
                                </p>
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">2. Usage Patterns and Health Tips</h2>
                                <p className="mt-6">
                                    2.1 Distance and Interaction Time
                                    <br />
                                    Monitor your webcam distance and interaction time to receive personalized health tips. The application calculates these metrics and offers suggestions to prevent CVS.
                                    <br /><br />
                                    2.2 Health Tips
                                    <br />
                                    Receive real-time health tips based on your usage patterns. Follow these tips to maintain optimal eye health during computer usage.
                                    <br /><br />
                                    2.3 Warnings
                                    <br />
                                    Get warnings if your usage patterns indicate potential CVS risk. Take these warnings seriously and adjust your habits accordingly.
                                </p>
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">3. Usage History</h2>
                                <p className="mt-6">
                                    3.1 Viewing Usage History
                                    <br />
                                    Access your usage history to track trends over time. Analyze usage patterns and identify areas for improvement.
                                    <br /><br />
                                    3.2 Understanding Usage Patterns
                                    <br />
                                    Use the visualizations and statistics provided to understand how your habits impact eye health. Make informed decisions to prevent CVS.
                                </p>
                                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">4. CVS Test Portal</h2>
                                <p className="mt-6">
                                    4.1 Taking the CVS Test
                                    <br />
                                    Visit the CVS Test Portal to assess your risk of Computer Vision Syndrome. Answer the questions honestly to receive accurate predictions.
                                    <br /><br />
                                    4.2 Machine Learning Prediction
                                    <br />
                                    Benefit from our machine learning model to predict your likelihood of developing CVS based on your test responses.
                                    <br /><br />
                                    4.3 Interpretation of Results
                                    <br />
                                    Review your test results, which include personalized recommendations for prevention and potential next steps.
                                </p>
                                <p className="mt-6 text-xl leading-8 text-gray-700">
                                    Remember, the Computer Vision Syndrome Prevention Web Application is designed to enhance your well-being during computer usage. Follow the recommendations, stay informed, and enjoy a healthier digital experience!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
