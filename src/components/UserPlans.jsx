import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
//import Conclusion from "./../Conclusion/Conclusion";
import Footer from "./Footer";
import {Helmet} from "react-helmet";

import styled from 'styled-components'


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
const handleChange = (e)=>{
    
}
export default function UserPlans() 
{
  const [plans, setPlans] = useState([]);

  useEffect(() => 
  {
    AOS.init();
  }, []);
  

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open_create_plan, setOpenCreatePlan] = React.useState(false);
  const handleOpenCreatePlan = () => setOpenCreatePlan(true);
  const handleCloseCreatePlan = () => setOpenCreatePlan(false);


  return (
    <Container className="fader">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Your Plans | Subflow</title>
    </Helmet>
      <Navbar />
        <section className=' pricing' style={{margin: "0 0 15vh"}}>
        
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h1 data-aos="fade-down" className="mb-5 m-auto flex gap-2 text-indigo-700 dark:text-[#ffffff] text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans">
                  <span className="text-indigo-600">
                    Active plans
                  </span>
                </h1>

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
                        Create a new plan
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
                    
                        <TextField fullWidth label="Enter the price of the plan" id="fullWidth" variant="outlined" />
                    
                        <TextField fullWidth label="Enter the duration of the plan" id="fullWidth" variant="outlined" />
                        <Button
                            type="submit"
                            className="bttn blue-button d-flex justify-content-center align-items-center" 
                        >
                            Create Plan
                        </Button>
                    </Box>
                        </Typography>
                        </Box>
                </Modal>
              </div>
              
              <div className="container m-auto">

                  {/**loop sent to me */}
                <div className="row gy-5 gx-5">
                    {testPlans.map((plan) =>(
                          <div className='col-md-4' style={{borderRight: "1px solid grey"}}>
                            <div className="card img-fluid " style={{height: "50vh"}}>
                                
                                <div className="card-img-overlay">
                                  
                                      <div className='d-flex flex-column justify-content-center align-items-center' style={{marginTop: "15vh"}}>
                                        
					                              <p className="card-title fw-bold h2 text-underline">{plan.plan_type}</p>
                                     
                                                    <p className="card-title h3">{plan.price}{plan.matic}/{plan.interval} days</p>
						
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
                                                    <button className='btn btn-danger'>
                                                        Yes, I want to
                                                    </button>
                                                    <button className='btn btn-success' onClose={handleClose}>
                                                        No, I don't want
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