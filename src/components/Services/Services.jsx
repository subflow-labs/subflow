import React from 'react'
import ServiceList from './ServiceList'
import { useAccount } from 'wagmi'
import Navbar from '../Navbar'
import Footer from '../Footer'
import {Helmet} from "react-helmet";
import "./../css/Services.css"


function Services() {
  const { isConnected } = useAccount();
  if(!isConnected) return (
    <>
    {/* min-h-screen */}
    <Helmet>
        <meta charSet="utf-8" />
        <title>Services</title>
    </Helmet>
    <Navbar />
    <div className='mt-20 min-h-screen trans flex items-center justify-center'>
      <h1 className='text-ld text-sm md:text-base'>Please connect your wallet to continue</h1>
    </div>
    <Footer />
    </>
  )
  else return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Services</title>
      </Helmet>
      <Navbar />
      <div className='mt-20 w-full text-ld trans'>
        <ServiceList />
      </div>
      <Footer />
    </>
  )
}

export default Services