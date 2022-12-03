import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <footer className='text-sm text-ld px-6 py-20 border-t-2 border-slate-100 dark:border-slate-800 transition-all duration-300 ease-in'>
      <div className='w-[80vw] mx-auto grid grid-cols-1 space-y-8 lg:space-y-0 lg:grid-cols-3 gap-x-4'>
        {/* First Grid */}
        <div className='flex flex-col px-6'>
           {/* Logo */}
           <div className="mb-4">
                <Link to="/" className="font-bold text-center align-middle text-black text-2xl">
                    <span className="text-indigo-600">
                        Sub
                        <span className="text-gray-900 dark:text-gray-200">
                          Flow
                        </span>
                     </span>  
                </Link>
            </div>
            <p className='text-xs md:text-sm'>
                SubFlow is a platform that lets third-party services manage their subscriptions in a blockchain-centric way.
            </p>
        </div>
        {/* Second Grid */}
        <div className="col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-y-8 text-xs md:text-sm lg:gap-y-0 lg:grid-cols-4">
          <div>
            <h1 className='text-base lg:text-md font-medium text-slate-500 dark:text-slate-100'>SOLUTIONS</h1>
            <ul className='mt-4 flex flex-col space-y-4'>
              <li>Marketing</li>
              <li>Commerce</li>
              <li>Insights</li>
            </ul>
          </div>
          <div>
            <h1 className='text-base lg:text-md font-medium text-slate-500 dark:text-slate-100'>SUPPORT</h1>
            <ul className='mt-4 flex flex-col space-y-4'>
              <li>Documentation</li>
              <li>Guides</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div>
            <h1 className='text-base lg:text-md font-medium text-slate-500 dark:text-slate-100'>LEGAL</h1>
            <ul className='mt-4 flex flex-col space-y-4'>
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
              <li>Claim</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center mt-5'>
            <ul className='mt-4 flex justify-content-center'>
              <li>
                <a href="#facebook" className="d-flex align-items-center socials-footer">
                    <svg style={{margin: "0 1vw 0 0"}} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z"></path></svg>
                </a>
              </li>
              <li>
                <a href="#facebook" className="d-flex align-items-center socials-footer">
                    <svg style={{margin: "0 1vw 0 0"}} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg"><path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 0 0-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"></path></svg>
                </a>
              </li>
              <li>
                <a href="#facebook" className="d-flex align-items-center socials-footer">
                    <svg  style={{margin: "0 1vw 0 0"}} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg"><path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94 336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path></svg>
                   
                </a>
              </li>
              <li>
                <a href="#facebook" className="d-flex align-items-center socials-footer">
                  <svg style={{margin: "0 1vw 0 0"}} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>
                </a>
              </li>
            </ul>
          </div>
    </footer>
  )
}

export default Footer