import React, {useEffect, useState, useRef} from 'react'
//import {Link} from 'react-router-dom'
//import AOS from "aos";
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

  /*radio button*/

  .selector
  {
    position:relative;
    width:100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
}
.selecotr-item
{
    position:relative;
    height:100%;
    min-height: 40vh;
}
.selector-item_radio
{
    appearance:none;
    display:none;
    height: 100%;
    min-height: 40vh;
}
.selector-item_label
{
    position:relative;
    height:80%;
    width:100%;
    text-align:center;
    
    font-weight:900;
    transition-duration:.2s;
    transition-property: transform, color;
    transform:none;
    height: 100%;
    min-height: 40vh;
    padding: 2vh 0;
    border-radius: 10px;
    background-color: white;
    cursor: pointer;
}
.selector-item_label .card-text
{
  margin-top: 30vh;
}
.selector-item_radio:checked + .selector-item_label
{
    background-color: #7b3fe4;
    color: white;
    transform:translateY(-15px);
    height: 100%;
    border-radius: 10px;
    min-height: 40vh;
}
@media (max-width:480px) 
{
	.selector{
		width: 100%;
	}
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

  /*
  useEffect(() => 
  {
    AOS.init();
  }, []);*/

  useEffect(() => {
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


  const suscribe = (serviceId) => {

  } 
  

  const testPlans = [
    {
        id: 1,
        price: 0.02,
        interval: 3,
        plan_type: "Netflix",
        amount_saved: 0.3,
        goal_amount: 0.5,
        timeLock: 0.3,
        address: 'sdbuisdb8w789n3jk20202nd'
    },
    {
        id: 2,
        price: 0.005,
        interval: 1,
        plan_type: 'Spotify',
        amount_saved: 0.3,
        goal_amount: 0.5,
        timeLock: 0.3,
        address: 'sdbuisdb8w789n3jk20202nd'
    }
  ];
  return (
    <Container className="fader">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Plans | Subflow</title>
    </Helmet>
      <Navbar />
        <section className=' pricing'>
        
              <div className="d-flex justify-content-center align-items-center">
                <h1 data-aos="fade-down" className="mb-5 m-auto flex gap-2 text-indigo-700 dark:text-[#ffffff] text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans">
                  <span className="text-indigo-600">
                    Active plans
                  </span>
              </h1>
              </div>
              
              <div className="container m-auto">

                  {/**loop sent to me */}
                <div className="image__crop w-full flex justify-content-center flex-row mt-5 mx-auto overflow-y-hidden overflow-x-scroll">
                    {testPlans.map((plan) =>(
                          <div className='h-[75vh] w-[226px] pt-2 pb-3 px-3 cursor-pointer'>
                              <div className="bg-white p-5 bg-opacity-60 backdrop-filter backdrop-blur-lg
                              text-black h-max w-[202px] py-2 px-4 border-2-[#ffffff]
                              shadow-lg shadow-blue-500/50 hover:shadow-indigo-500/40 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 rounded-lg mx-2">
                                  <span style={{display:'none'}}>{plan.id}</span>
                                  <p className="font-bold text-xs text-end text-[#4F46E5] text-center">{plan.plan_type} plan</p>
                                  <p className="font-semibold pt-3 text-center">Amount Saved:</p>
                                  <p className="text-center text-2xl pt-3 text-center">{plan.amount_saved}<sub className="text-white">ETH</sub></p>
                                  <p className="font-semibold pt-3 text-center">Goal/Time:</p>
                                  <p className="text-center text-2xl pt-3 text-center">
                                      {
                                          plan.goal_amount !== " " ? (
                                              <>
                                                {plan.goal_amount}<sub className="text-white">ETH</sub>   
                                              </>
                                          ) : (
                                              <>
                                                {plan.timeLock} 
                                              </>
                                          )
                                      }
                                  </p>
                                  <div className="justify-between flex flex-row w-[100%] bg-[#ffffff] text-[#4F46E5] bg-opacity-60 backdrop-filter 
                                  backdrop-blur-lg h-max py-2 pl-1 pr-1 mt-2 rounded-lg ">
                                      <p className='text-center fw-bold' style={{fontSize: '11px' , color: "black"}}>{plan.address}</p>
                                      <span className={`pt-1 cursor-pointer `}></span>
                                  </div>

                                  <div className="flex flex-row justify-between text-sm mt-2 text-[#4F46E5]">
                                      {plan.goal_amount}, {plan.timeLock}, {plan.amount_saved}
                                      <button onClick={()=> plan.id}>Deposit</button>
                                  </div>
                              </div>
                          </div>
                      ))
                  }
                </div>
                {/**end */}
                {/**Plans design before 
                <div class="selector row gap-2" data-aos="fade-up">
                  {testPlans.map((plan) =>(
                      <div class="selector-item col-md-3" >
                      <input type="radio" id="radio1" name="selector" className="selector-item_radio"/>
                      <label for="radio1" className="selector-item_label">
                          <h4 className="card-title fw-bold text-center fw-bold">
                             {plan.interval} Month Plan
                          </h4>
                          <h3 className='card-title fw-bold text-center fw-bold'>{plan.plan_type}</h3>
                          <p className="card-text h4 fw-bold">
                            {plan.price}ETH
                          </p>
                      </label>
                  </div>
                  ))}
                </div>
                end */}
              </div>
        </section>
        <Footer />
    </Container>
  )
}
