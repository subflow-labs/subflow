import React, {useEffect, useState, useRef} from 'react'
//import {Link} from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
//import Conclusion from "./../Conclusion/Conclusion";
import Footer from "./Footer";
import {Helmet} from "react-helmet";
import {useLocation, withRouter} from "react-router-dom";

import styled from 'styled-components';
import toast from 'react-hot-toast';

import {useProvider, useSigner, useContract } from "wagmi";
import { SERVICE_ABI } from "./../constants/index.js";
import { ethers } from "ethers";

import "./css/Profile.css";


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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
/*
const handleChange = (e)=>{
    
}*/

const UserPlans = () => { 
  const location  = useLocation();
  const service = location.state?.service;
  const [active, setActive] = useState(service);
  console.log("state.service: ", service);
  console.log("repeating?????\n\n");
  //const [activeService, setActiveService] = useState();
  //setActiveService(service);
  //console.log("set active service: ", activeService);

  /*
  const location = useLocation();
  const pathname = location.pathname;

  const searchParams = new URLSearchParams(location.search);
  const address = searchParams.get("address");
  console.log("Address from url: ", address);*/

  const effect = useRef(true);
  const provider = useProvider();
  const signer = useSigner();

  //const { state } = useLocation();
  //const [activeService, setActiveService] = useState(service);
  //console.log("activeService: ", activeService);
  //const activeService = state.service;
  //console.log("activeService: ", activeService);
  //const [activeService, setActiveService] = useState(state.service);
  const [plans, setPlans] = useState([]);
  const [newPlanPrice, setNewPlanPrice] = useState("");
  const [newPlanInterval, setNewPlanInterval] = useState("");

  const ServiceContract = useContract({
    addressOrName: service.serviceAddress,
    contractInterface: SERVICE_ABI,
    signerOrProvider: signer.data || provider,
  });

  useEffect(() => 
  {
    AOS.init();
    if (effect.current) {
      effect.current = false;
      const fetch = async () => {
        try {
          console.log("fetching plans");
          const plansArray = [];

          console.log("aaaaaaaaaaaa");
          const results = await ServiceContract.getPlans();
          console.log("bbbbbbbbb");
          console.log("Plan results: ", results);

          for(const plan of results) {
            console.log("Current plan: ", plan);
            let parsedId = plan.id.toNumber();
            console.log("parsedId:", parsedId);
            let parsedPrice = ethers.utils.formatUnits(plan.amount, "ether");
            console.log("parsedPrice: ", parsedPrice);
            let interval = secondsToDays(plan.interval);
            console.log("interval: ", interval);

            let mappedPlan = {
              id: plan.id.toNumber(),
              price: ethers.utils.formatUnits(plan.amount, "ether"),
              interval: secondsToDays(plan.interval),
            };
            console.log("mappedPlan: ", mappedPlan);

            plansArray.push(mappedPlan);
          }
          setPlans(plansArray);
        } catch(error) {
          toast.error("Failed getting plans: ", error.message);
          console.log("Failed getting plans: ", error.message);
        }
      }
      fetch();
    }
  //}, [activeService, ServiceContract]);
  }, [location, ServiceContract]);


  const secondsToDays = (seconds) => {
    return seconds / (60 * 60 * 24);
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
      
      
  },
  {
    id: 4,
    price: 0.005,
    interval: 10,
},
{
  id: 5,
  price: 0.005,
  interval: 10, 
}
];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open_create_plan, setOpenCreatePlan] = React.useState(false);
  const handleOpenCreatePlan = () => setOpenCreatePlan(true);
  const handleCloseCreatePlan = () => setOpenCreatePlan(false);

  const daysToSeconds = (days) => {
    return (days * 24 * 60 * 60);
  }


  const addPlan = async (e) => {
    e.preventDefault();
    console.log("Adding new plan");

    const intervalInSeconds = daysToSeconds(newPlanInterval);
    const parsedAmount = ethers.utils.parseUnits(newPlanPrice, "ether");

    try {
      const options = {
        gasLimit: 100000,
      }
      const txResponse = await ServiceContract.setPlan(intervalInSeconds, parsedAmount, options);
      await txResponse.wait();
      console.log("Added new plan");
    } catch(error) {
      toast.error("Failed adding new plan: ", error.message);
      console.log("Failed adding new plan: ", error.message);
    }
  }

  const removePlan = async(planId) => {
    console.log("Removing plan: ", planId);

    try {
      const txResponse = await ServiceContract.removePlan(planId);
      await txResponse.wait();
      console.log("Removed plan");
    } catch(error) {
      toast.error("Failed removing plan: ", error.message);
      console.log("Failed removing plan: ", error.message);
    }
    setOpen(false);

  }

  return (
    <Container className="fader">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Your Plans | Subflow</title>
    </Helmet>
      <Navbar />
        <section className=' pricing' style={{margin: "0 0 15vh"}}>

        <div className="d-flex flex-column justify-content-center align-items-center">
                {
                  !plans ?(
                    <h1 data-aos="fade-down" className="mb-5 m-auto flex gap-2 text-indigo-700 dark:text-[#ffffff] text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans" style={{animation: "pulse 5s infinite"}}>
                      <span className="text-indigo-600">
                          Fetching plans for this service...
                      </span>
                    </h1>

                  ) : plans && plans < 1 ? ( 
                    <h1 data-aos="fade-down" className="mb-5 m-auto flex gap-2 text-indigo-700 dark:text-[#ffffff] text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans">
                      <span className="text-indigo-600">
                          Oops! no plans yet for this service
                      </span>
                    </h1>
                  ) : (
                    <>
                    <h1 data-aos="fade-down" className="mb-5 m-auto flex gap-2 text-indigo-700 dark:text-[#ffffff] text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans">
                      <span className="text-indigo-600">
                          Manage your plans
                      </span>
                    </h1>
                    </>
                  )
                }
                

                <Button onClick={handleOpenCreatePlan} className="text-center bttn blue-button-border" style={{width: "auto", margin: "0 0 4vh"}}>
                    Create a new plan
                </Button>

                <Modal
                    open={open_create_plan}
                    onClose={handleCloseCreatePlan}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="d-flex justify-content-center align-items-center "
                    style={{borderRadius: "15px"}}
                >
                    <Box sx={style}>
                    <Typography className="text-center text-underline" id="modal-modal-title" variant="h6" component="h2">
                        Add a new plan
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box
                            component="form"
                            sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            className='d-flex justify-content-center flex-column align-items-center'
                        >
                    
                        <TextField fullWidth label="Enter the price of the plan" id="fullWidth" variant="outlined" value={newPlanPrice} onChange={(e) => setNewPlanPrice(e.target.value)} />
                    
                        <TextField fullWidth label="Enter the duration of the plan" id="fullWidth" variant="outlined" value={newPlanInterval} onChange={(e) => setNewPlanInterval(e.target.value)} />
                        <Button
                            type="submit"
                            className="bttn blue-button d-flex justify-content-center align-items-center" 
                            onClick={addPlan}>
                            Confirm
                        </Button>
                    </Box>
                        </Typography>
                        </Box>
                </Modal>
              </div>
              
              <div className="container m-auto">

                  {/**loop sent to me */}
                <div className="row gy-5 gx-5" style={{width: "90vw"}}>
                    {plans.map((plan) =>(
                          <div className='col-md-4' style={{borderRight: "1px solid grey"}}>
                            <div className="card img-fluid " style={{height: "50vh"}}>
                                
                                <div className="card-img-overlay">
                                  
                                      <div className='d-flex flex-column justify-content-center align-items-center' style={{marginTop: "10vh"}}>
                                        
					                              <p className="card-title fw-bold h2 text-underline">{service.name}-{plan.id}</p>
                                     
                                        <p className="card-title h4 text-danger">{plan.price}MATIC/{plan.interval}days</p>
						
                                      </div>
                                 

                                            <Button onClick={handleOpen} style={{marginTop: "15vh"}} className="text-center bttn blue-button-border">
                                                Remove Plan
                                            </Button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                                className="d-flex justify-content-center align-items-center "
                                                style={{borderRadius: "15px"}}
                                            >
                                                <Box sx={style}>
                                                <Typography className="text-center text-underline" id="modal-modal-title" variant="h6" component="h2">
                                                    Remove Plan
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                <p className='text-center'>
                                                    Are you sure you want to delete this plan?
                                                </p>
                                                <div className='mt-2 d-flex justify-content-around align-items-center'>
                                                    <button className='btn btn-danger' onClick={() => removePlan(plan.id)}> 
                                                        Yes
                                                    </button>
                                                    <button className='btn btn-success' onClick={handleClose} onClose={handleClose}>
                                                        No
                                                    </button>
                                                </div>
                                                </Typography>
                                                </Box>
                                            </Modal>
                                    
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


export default UserPlans;