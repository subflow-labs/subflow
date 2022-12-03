import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Footer from './Footer';
import Loader from './Loader';
import Navbar from './Navbar';
import './css/Home.css'
import {Helmet} from "react-helmet";


//AOS
import AOS from "aos";
import "aos/dist/aos.css";

function Home() 
{
  function loader() 
  {
    var load_timeout = setTimeout(showPage, 6000);
  }
  
  function showPage() 
  {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main_content").style.display = "block";
    
  }
  
  useEffect(() => 
  {
    AOS.init();
  }, []);
  return (
    <div onLoad={loader()}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | Subflow</title>
      </Helmet>
      <div id="loader">
        <Loader />
      </div>
      <div id='main_content' className='fader'>
        <Navbar />
        <main style={{height: "100vh"}} className=" flex items-center w-[90vw] mx-auto h-[88vh] max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="sm:text-center the-content">
                        <h1 className="text-2xl tracking-tight font-bold text-slate-800 dark:text-gray-200 sm:text-3xl md:text-4xl lg:text-5xl">
                          <span className="inline">
                            <span className=" text-indigo-600 inline">SubFlow is a platform that,
                            </span>{" "}
                            lets third-party services
                          </span>{' '}
                          <span className=" text-indigo-600 inline">manage their subscriptions in a </span>{" "}
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                            blockchain-centric way.
                          </span>
                        </h1>
                        <p className="hidden sm:block mt-3 text-xs sm:text-sm text-gray-800 dark:text-gray-200 sm:mt-5 sm:max-w-xl mx-auto md:mt-5">
                            Subflow severely limits the the amount of work the third-party service would need to implement to integrate a web3 subscriptions model and exposes the same functionality to them at a few clicks on our website and a function call in their code.                       
                        </p>
                        <p className='sm:hidden text-xs text-gray-800 dark:text-gray-200 pt-4'>Subflow severely limits the the amount of work the third-party service would need to implement.</p>

                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                          <div className="rounded-md">
                            <Link
                              to="/services"
                              className="blue-button bttn md:px-16"
                            >
                              Explore SubFlow
                            </Link>
                          </div>
                    </div>
              </div>
        </main>
        <div className="others">
           {/** Why You should choose Subflow */}
              <div className='transition-all duration-300 ease-in w-[90vw] mx-auto'>
                <h1 data-aos="fade-up" className="text-indigo-700 text-center font-semibold mt-8 mb-20 text-3xl sm:text-5xl dark:text-slate-200 transition-all duration-300 ease-in">Why SubFlow?</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-ld gap-16 mx-10 lg:mx-20 mb-10">
                
                
                <figure data-aos-easing="linear" data-aos-duration="1000" data-aos="fade-left" className='flex gap-4 flex-col'>
                    <div className="bg-indigo-500 w-fit p-4 rounded-lg text-white dark:text-slate-900">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z"></path></svg>
                    </div>
                    <div>
                    <article>
                    <h2 className='text-xl font-semibold pb-2'>Censorship free</h2>
                      <p className='text-sm text-small font-light'>You own your own contracts. Your information is publicly verifiable and cannot be modified by us outside set boundaries.</p>
                    </article>
                    </div>
                </figure>


                <figure data-aos-easing="linear" data-aos-duration="1000" data-aos="fade-up" className='flex gap-4 flex-col'>
                <div className="bg-indigo-500 w-fit p-4 rounded-lg text-white dark:text-slate-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                    </div>
                    <div>
                    <article>
                    <h2 className='text-xl font-semibold pb-2'>Fully Decentralized</h2>
                      <p className='text-sm text-small font-light'>Decentralized storage of assets(Arweave). Blockchain as a store of data.</p>
                    </article>
                    </div>
                </figure>


                <figure data-aos-easing="linear" data-aos-duration="1000" data-aos="fade-up" className='flex gap-4 flex-col'>
                <div className="bg-indigo-500 w-fit p-4 rounded-lg  text-white dark:text-slate-900">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                    </div>
                    <div>
                    <article>
                    <h2 className='text-xl font-semibold pb-2'>Secure</h2>
                      <p className='text-sm text-small font-light'>Iterative audits are regularly carried out to rid the subflow contract of vulnrabilities.</p>
                    </article>
                    </div>
                </figure>


                <figure data-aos-easing="linear" data-aos-duration="1000" data-aos="fade-right" className='flex gap-4 flex-col'>
                <div className="bg-indigo-500 w-fit p-4 rounded-lg text-white dark:text-slate-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                    </div>
                    <div>
                    <article>
                    <h2 className='text-xl font-semibold pb-2'>Free</h2>
                      <p className='text-sm text-small font-light'>There are no hidden middle-man costs.</p>
                    </article>
                    </div>
                </figure>

                </div>
              </div>
           {/**end */}
          <Footer />
        </div>
        
      </div>
    </div>
  )
}

export default Home