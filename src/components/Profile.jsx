import { useState, useEffect, useRef } from 'react'
import toast from "react-hot-toast";
import { useAccount,useProvider, useSigner, useContract } from 'wagmi';
import {Link} from 'react-router-dom'
import {Helmet} from "react-helmet";

import {SUBFLOW_ABI, SUBFLOW_CONTRACT_ADDRESS} from '../constants/index';

import Navbar from './Navbar';
import Footer from './Footer';

import * as React from 'react';
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

function Profile() {
  const effect = useRef(true);
  const [userNFTS, setUserNFTS] = useState([]);
  const { address, isConnected } = useAccount();

  const [listedItems, setListedItems] = useState([]);
  const provider = useProvider();
  const signer = useSigner();
  const Subflow = useContract({ 
    addressOrName: SUBFLOW_CONTRACT_ADDRESS, 
    contractInterface: SUBFLOW_ABI,
    signerOrProvider: signer.data || provider 
  });


  useEffect(() => {
    if (effect.current) {
      effect.current = false;
      const fetch = async () => {
        try {
          console.log("fetching");
          const listedItemsArray = await Subflow.getAllActi();
          console.log(listedItemsArray);
          if (listedItemsArray.length > 0) {
            for (let i = 0; i < 5; ++i) {
              if(listedItemsArray[i] !== undefined) {
              setListedItems(listedItems => [...listedItems, listedItemsArray[i]]);
              }
            }
          }
        } catch (error) {
          toast.error("An error occured");
        }
      }
      fetch();
    }
  }, [Subflow]);

  const testServices = [
    {
        id: 1,
        addr: "weg3873hnce983hefn93e33c",
        creator: "Spotify"
    },
    {
        id: 2,
        addr: "weg3873hnce983hefn93e33c",
        creator: "Netflix"
    },
    {
      id: 3,
      addr: "weg3reo803nc83c33749",
      creator: "Amazon Prime"
  }
  ];

  function copyAddress()
  {
    var element = document.getElementById("copy_icon");
    element.style.display = "block"

    setTimeout(() => {
      element.style.display = "block"
    }, 2500);
  }
  function copyCreator()
  {
    var element = document.getElementById("copy_icon_creator");
    element.style.display = "block"

    setTimeout(() => {
      element.style.display = "block"
    }, 2500);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open_subscribe, setOpenSubscribe] = React.useState(false);
  const handleOpenSubscribe = () => setOpenSubscribe(true);
  const handleCloseSubscribe = () => setOpenSubscribe(false);
  
    const testPlans = [
    {
        id: 1,
        price: 0.02,
        matic: "ETH",
        interval: 30,
        plan_type: "Netflix",
        expiration: "13 days"
    },
    {
        id: 2,
        price: 0.005,
        matic: "ETH",
        interval: 10,
        plan_type: 'Spotify',
        expiration: "12 days"
        
    },
    {
      id: 3,
      price: 0.005,
      matic: "ETH",
      interval: 10,
      plan_type: 'Amazon',
      expiration: "28 days"
      
  },
  {
    id: 4,
    price: 0.005,
    matic: "ETH",
    interval: 10,
    plan_type: 'Netflix',
    expiration: "10 days"
    
},
{
  id: 5,
  price: 0.005,
  matic: "ETH",
  interval: 10,
  plan_type: 'Prime',
  expiration: "18 days"
  
}
  ];
  
  if (!isConnected) return (
    <div className='fader'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile | Subflow</title>
    </Helmet>
      <Navbar />
      <div className='min-h-screen trans flex items-center justify-center'>
        <h1 className='text-ld text-base md:text-3xl'>Please connect your wallet to continue</h1>
      </div>
    </div>
  )
  else return (
    <div className="fader">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile | Subflow</title>
    </Helmet>
    <Navbar />
    <div style={{marginTop: "20vh"}} className='min-h-screen trans'>
      {/* User Profile Card */}
      <div className='wrapper bg-gray-100 dark:bg-[#222221]'>
        <div className='min-h-[50vh] lg:min-h-[50vh] w-[90vw] mx-auto relative flex flex-col items-center justify-center trans'>
         
          {/*MNav tabs for */}
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#menu1">My Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#menu2">My Subscriptions</a>
              </li>
            </ul>

            <hr />

            <div class="tab-content">
              <div class="tab-pane container active" id="menu1">
                  
                <div className="d-flex justify-content-center align-content-center">

                  <Button onClick={handleOpen} style={{width: "auto", margin: "3vh 0"}} 
                  className="blue-button bttn md:px-16">
                      Create a new service
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="d-flex justify-content-center align-items-center"
                    style={{borderRadius: "15px"}}
                  >
                    <Box sx={style}>
                      <Typography className="text-center" id="modal-modal-title" variant="h6" component="h2">
                        Create a new service
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
                      
                        <TextField fullWidth label="Service Name" id="fullWidth" variant="outlined" />
                      
                        <Button
                            variant="contained"
                            component="label"
                            className="d-flex justify-content-center align-items-center"
                          >
                            Upload Image
                            <input
                              type="file"
                              hidden
                            />
                          </Button>

                          <Button
                            type="submit"
                            className="bttn blue-button d-flex justify-content-center align-items-center" 
                        >
                            Create
                        </Button>
                      </Box>
                      </Typography>
                    </Box>
                  </Modal>
                  </div>

                   {/**THIS IS MY DESIGN FOR THE SERVICES  PUT IT WHEREVER U WANT TO PUT IT */}
                <div className='row'>
                      {testServices.map((service) => (
                        <div className='col-md-4 gap-2' style={{borderRight: "1px solid grey"}}>
                        <div className="card img-fluid " style={{height: "50vh"}}>
                            <img className="card-img-top text-center center m-auto" style={{width: "30vw", height: "30vh"}} src="https://cdn.cdnlogo.com/logos/s/47/spotify.svg" alt="Card image" />
                            <div className="card-img-overlay">
                              <h4 className="card-title fw-bold h4 text-underline">{service.creator}</h4>
                              <Link to="/your_plans" style={{marginTop: "40vh"}} className="text-center bttn blue-button">View Plan</Link>
                            </div>
                        </div> 

                        <div className='d-flex flex-column mt-5'>
                          <div className='d-flex align-items-center gap-3 text-center'>
                            <p className='fw-bold'>Address:</p>
                            <p className='fw-bold'>{service.addr}</p>
                            <button className='copy-icon' onClick={copyAddress}>
                              <svg className='cursor-pointer' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path></svg>
                            </button>
                            <div className="copy-icon-copied address" id='copy_icon'>Copied Address</div>
                          </div>
                          <div className='d-flex align-items-center gap-3 text-center'>
                            <p className='fw-bold'>Creator:</p>
                            <p className='fw-bold'>{service.creator}</p>
                            <button className='copy-icon' onClick={copyCreator}>
                                <svg className='cursor-pointer ' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path></svg>
                            </button>
                            <div className="copy-icon-copied creator" id='copy_icon_creator'>Copied Creator</div>
                          </div>
                        </div>
                      </div>
                      ))}
                          
                    </div>

                  {/** end */}
              </div>

              <div class="tab-pane container" id="menu2" style={{marginBottom: "15vh"}}>
                    
                    <div className='d-flex justify-content-center' style={{margin: "5vh 0"}}>
                      <Button onClick={handleOpenSubscribe} style={{width: "auto"}} className="text-center bttn blue-button-border">
                        Subscribe to a new service
                    </Button>
                    </div>
                    
                    <Modal
                        open={open_subscribe}
                        onClose={handleCloseSubscribe}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="d-flex justify-content-center align-items-center "
                    >
                        <Box sx={style}>
                        <Typography className="text-center text-underline" id="modal-modal-title" variant="h6" component="h2">
                            Subscribe to a new service
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
                            
                              <TextField fullWidth label="Search for the service you want to subscribe to..." id="fullWidth" variant="outlined" />
                    

                                <Button
                                  type="submit"
                                  className="bttn blue-button d-flex justify-content-center align-items-center" 
                              >
                                  Search
                              </Button>
                            </Box>
                        </Typography>
                        </Box>
                    </Modal>
                       
                      
                      <p className='h2 text-center' style={{color: "white", margin: "0 0 2vh"}}>Your subcriptions</p>
                      
                      
                      <div className='row gy-5 gx-5' style={{width: "90vw"}}>
                    
                        {testPlans.map((plan) =>(
                              <div className='col-md-4' style={{borderRight: "1px solid grey"}}>
                                <div className="card img-fluid " style={{height: "50vh"}}>
                                    
                                    <div className="card-img-overlay">
                                      
                                          <div className='d-flex flex-column justify-content-center align-items-center' style={{marginTop: "15vh"}}>

                                          <p className="card-title fw-bold h2 text-underline">{plan.plan_type}</p>
                                            
                                            <p className="card-title h3">{plan.price}{plan.matic}/{plan.interval} days</p>

                                            <p className="card-title h3 text-danger">Expires in: {plan.expiration}</p>

                                            </div>
                                        
                                          <button style={{marginTop: "10vh"}} className="text-center bttn blue-button-border">Renew Subscription</button>
                                        </div>
                                    </div> 

                                    </div>
                              ))
                          }
                          </div>
                </div>
                
              </div> 

        </div>
      
      </div>
    </div>
    <Footer />
    </div>
  )
}

export default Profile