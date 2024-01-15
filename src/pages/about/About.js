import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import FooterCommon from '../../components/FooterCommon';
import { useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function About() {
  const [aboutText, setAboutText] = useState([""]);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getAboutText()
      .then((response) => {
        setAboutText(response.data.about.aboutText);
      })
      .catch((error) => {
        console.log("Private page", error.response);
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
  }, [navigate]);

  return (
    <>
      <NavBarCommon />

      <div className="bg-white py-24 sm:py-32" >
        <div className="mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Meet our Team</h2>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-20 lg:max-w-4xl ">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none">
                  <img
                    src="images/imesh.png"
                    alt="imesh"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-xl text-gray-700 font-semibold">
                      <span>
                        <span aria-hidden="true" className="absolute" />
                        Imesh Ranawella
                      </span>
                    </h3>
                    <p className="mt-1 text-sm text-indigo-600 text-lg">BSc (Hons) in Software Engineering</p>
                    <p className="mt-1 text-sm">
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        size="2x"
                        onClick={() => window.open("https://www.linkedin.com/in/imesh-ranawella/")}
                      />
                      <span className="mx-2"></span>
                      <FontAwesomeIcon
                        icon={faGithub}
                        size="2x"
                        onClick={() => window.open('https://github.com/imexh')}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none">
                  <img
                    src="images/vimukthi.png"
                    alt="vimukthi"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-xl text-gray-700 font-semibold">
                      <span>
                        <span aria-hidden="true" className="absolute" />
                        Vimukthi Polgolla
                      </span>
                    </h3>
                    <p className="mt-1 text-sm text-indigo-600 text-lg">BSc (Hons) in Data Science</p>
                    <p className="mt-1 text-sm">
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        size="2x"
                        onClick={() => window.open("https://www.linkedin.com/in/vimukthi-polgolla/")}
                      />
                      <span className="mx-2"></span>
                      <FontAwesomeIcon
                        icon={faGithub}
                        size="2x"
                        onClick={() => window.open('https://github.com/VimukthiPolgolla')}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 text-justify">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Who are we?</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Our team is composed of two ambitious and talented final-year undergraduates from SLTC Research University: Imesh Ranawella pursuing a BSc (Hons) in Software Engineering and Vimukthi Polgolla specializing in BSc (Hons) in Data Science.

              As passionate individuals in the field of technology, we have joined forces to embark on a groundbreaking project for our final year. Our mission is to address the prevalent issue of computer vision syndrome (CVS) by developing the innovative <b>Eye Care</b>  App.
            </p>
          </div>
        </div>
      </div>

      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img className="mx-auto h-24" src="/images/eyecaresquarelogowithtextblack.png" alt="" />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “The project's goal is to forecast the likelihood that users would develop CVS and provide
                tailored advice using webcam-based user interaction analysis and machine learning. The main
                goal is to equip users, especially college students, with knowledge and resources to develop
                better screen usage habits, thereby lowering the risk of eye pain, headaches, back pain, neck
                pain, and blurred vision brought on by prolonged screen engagement. The online application's
                ultimate goal is to advance users' digital lifestyles and general well-being.”
              </p>
            </blockquote>
          </figure>
        </div>
      </section>

      <FooterCommon />
    </>
  )
}
