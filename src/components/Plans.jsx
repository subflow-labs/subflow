import React, {useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
//import Conclusion from "./../Conclusion/Conclusion";
import Footer from "./Footer";
import {Helmet} from "react-helmet";

import styled from 'styled-components';

import { useProvider, useSigner, useContract } from 'wagmi';
import { SUBFLOW_ABI, SUBFLOW_CONTRACT_ADDRESS } from './../constants/index.js';
import toast from 'react-hot-toast';

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
const handleChange = (e)=>{
    
}

export default function Plans() 
{
  const effect = useRef(true);
  const provider = useProvider();
  const signer = useSigner();

  const Subflow = useContract({
    addressOrName: SUBFLOW_CONTRACT_ADDRESS,
    contractInterface: SUBFLOW_ABI,
    signerOrProvider: signer.data || provider,
  });

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    AOS.init();
    if (effect.current) {
      effect.current = false;
      const fetch = async () => {
        try {
          console.log("fetching plans");
          const plansArray = [];

          const results = await Subflow.getPlans();
          console.log(results);

          for (const plan of results) {
            let mappedPlan = {
              price: plan.amount,
              interval: plan.interval
            };

            plansArray.push(mappedPlan);
          }
          setPlans(plansArray);
        } catch(error){
          toast.error(error.message);
        }
      }
      fetch();
    }
  }, [Subflow]);


  const subscribe = (serviceId) => {

  } 


  const testPlans = [
    {
        id: 1,
        price: 0.02,
        matic: "ETH",
        interval: 30,
        plan_type: "Netflix",
            
    },
    {
      id: 2,
      price: 0.005,
      matic: "ETH",
      interval: 10,
      plan_type: 'Spotify',              
    },
    {
      id: 3,
      price: 0.005,
      matic: "ETH",
      interval: 10,
      plan_type: 'Amazon',        
    },
        {
          id: 4,
          price: 0.005,
          matic: "ETH",
          interval: 10,
          plan_type: 'Netflix',
          
          
      },
      {
        id: 5,
        price: 0.005,
        matic: "ETH",
        interval: 10,
        plan_type: 'Prime',
        
        
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
        
              <div className="d-flex justify-content-center align-items-center">
                <h1 data-aos="fade-down" className="mb-5 m-auto flex gap-2 text-indigo-700 dark:text-[#ffffff] text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans">
                  <span className="text-indigo-600">
                    Active plans
                  </span>
              </h1>
              </div>
              
              <div className="container m-auto">

                  {/**loop sent to me */}
                  <div className="row gy-5 gx-5">
                  {testPlans.map((plan) =>(
                        <div className='col-md-4' style={{borderRight: "1px solid grey"}}>
                          <div className="card img-fluid " style={{height: "50vh"}}>
                              
                              <div className="card-img-overlay">
                                
                                    <div className='d-flex justify-content-center flex-column align-items-center' style={{marginTop: "15vh"}}>
                                      
                                      <p className="card-title fw-bold h2 text-underline">{plan.plan_type}</p>
                                   
                                      <p className="card-title h3">{plan.price}{plan.matic}/{plan.interval} days</p>
          
                                    </div>

                                  <button style={{marginTop: "15vh"}} className="text-center bttn blue-button-border">Subscribe</button>
                                  </div>
                              </div>
                          </div>
                      ))
                  }
                </div>
                {/**end */}
              </div>
        </section>
        <Footer />
    </Container>
  )
}
