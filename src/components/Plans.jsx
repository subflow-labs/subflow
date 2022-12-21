import React, {useEffect, useState, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {Helmet} from "react-helmet";

import styled from 'styled-components';

import { useProvider, useSigner, useContract } from 'wagmi';
import { SERVICE_ABI } from './../constants/index.js';
import toast from 'react-hot-toast';
//import { ServiceContext } from "./Services/ServiceList.jsx";

import { ethers } from "ethers";


const Container = styled.section`
  margin-top: 20vh;
  overflow: hidden !important;
  .service-type
  {
    color: white;
    width: 100%;
    font-size: 30px;
    margin: -4vh 5vw 10vh;
  }
`

/*
const handleChange = (e)=>{
    
}
*/

const Plans = () => { 
  const effect = useRef(true);
  const provider = useProvider();
  const signer = useSigner();
  //const activeService = useContext(ServiceContext);
  const { state } = useLocation();
  const activeService = state.service;
  console.log("active address: ", activeService.serviceAddress, "\n\n\n\n\n\n");

  const ServiceContract = useContract({
    addressOrName: activeService.serviceAddress,
    contractInterface: SERVICE_ABI,
    signerOrProvider: signer.data || provider,
  });

  const [plans, setPlans] = useState([]);
  const [plansRetrieved, setPlansRetrieved] = useState(false);

  const secondsToDays = (seconds) => {
    return seconds / (60 * 60 * 24);
  }

  useEffect(() => {
    AOS.init();
    if (effect.current) {
      effect.current = false;
      const fetch = async () => {
        try {
          console.log("fetching plans");
          const plansArray = [];

          console.log("starting?")
          const results = await ServiceContract.getPlans();
          console.log("words");
          console.log(results);

          for (const plan of results) {
            let mappedPlan = {
              id: plan.id.toNumber(),
              price: ethers.utils.formatUnits(plan.amount, "ether"),
              interval: secondsToDays(plan.interval.toNumber()),
            };

            plansArray.push(mappedPlan);
          }
          setPlans(plansArray);
          setPlansRetrieved(true);
        } catch(error){
          toast.error(error.message);
        }
      }
      fetch();
    }
  }, [ServiceContract]);


  const subscribe = async (planId, price) => {
    console.log("Subscribing to plan: ", planId);
    console.log("price before conversion: ", price);
    const _price = ethers.utils.parseUnits(price, "ether");
    console.log("price: ", _price);
    try {
      const options = {
        value: _price,
        //gasLimit: 200000
      };
      const txResponse = await ServiceContract.userSubscription(planId, options);
      await txResponse.wait();
      console.log("subscription successful");
    } catch(error) {
      toast.error("Failed subscribing: ", error.message);
      console.log("Failed subscribing: ", error.message);
    }

  }


  const testPlans = [
    {
        id: 1,
        price: 0.02,
        interval: 30,
            
    },
    {
      id: 2,
      price: 0.005,
      interval: 10,          
    },
    {
      id: 3,
      price: 0.005,
      interval: 10,
      expiration: 4        
    },
        {
          id: 4,
          price: 0.005,
          interval: 10,
          expiration: 2,
      },
      {
        id: 5,
        price: 0.005,
        interval: 10,
        expiration: 15
        
        
      }
  ];
  
  return (
    <Container className="fader">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Plans | Subflow</title>
    </Helmet>
      <Navbar />
        <section className=' pricing' style={{margin: "0 0 15vh"}}>
        
        {
          !plansRetrieved ? (
            <div className="d-flex justify-content-center align-items-center">
                <h1 data-aos="fade-down" className="mb-5 m-auto flex gap-2 text-indigo-700 dark:text-[#ffffff] text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans">
                  <span className="text-indigo-600" style={{animation: "pulse 5s infinite"}}>
                      Hold on. Fetching plans...
                  </span>
              </h1>
              </div>
          ) : plansRetrieved && plans < 1 ? (
            <div className="d-flex justify-content-center align-items-center">
                <h1 data-aos="fade-down" className="mb-5 m-auto flex gap-2 text-indigo-700 dark:text-[#ffffff] text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans">
                  <span className="text-indigo-600">
                    Oops! No current active plans
                  </span>
              </h1>
              </div>

          ) : (
            <>
            <div className="d-flex justify-content-center align-items-center">
                <h1 data-aos="fade-down" className="mb-5 m-auto flex gap-2 text-indigo-700 dark:text-[#ffffff] text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans">
                  <span className="text-indigo-600">
                    All active plans for this service
                  </span>
              </h1>
              </div>
              
              <div className="container m-auto">

                  <div className="row gy-5 gx-5" style={{width: "90vw"}}>
                  {plans.map((plan) =>(
                        <div className='col-md-4' style={{borderRight: "1px solid grey"}}>
                          <div className="card img-fluid " style={{height: "50vh"}}>
                              
                              <div className="card-img-overlay">
                                
                                    <div className='d-flex justify-content-center flex-column align-items-center' style={{marginTop: "15vh"}}>
                                      
                                      <p className="card-title fw-bold h2 text-underline">{activeService.name}-{plan.id}</p>
                                   
                                      <p className="card-title h4 text-danger">{plan.price}MATIC/{plan.interval}days</p>
          
                                    </div>

                                  <button style={{marginTop: "15vh"}} className="text-center bttn blue-button-border" onClick={() => subscribe(plan.id, plan.price)}>Subscribe</button>
                                  </div>
                              </div>
                          </div>
                      ))
                  }
                </div>
              </div>
            </>
          )
        }

        </section>
        <Footer />
    </Container>
  )
}

export default Plans;