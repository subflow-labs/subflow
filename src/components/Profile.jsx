import { useState, useEffect, useRef } from 'react'
import toast from "react-hot-toast";
import { useAccount, useProvider, useSigner, useContract } from 'wagmi';
import {Link} from 'react-router-dom'
import {Helmet} from "react-helmet";
import {SUBFLOW_ABI, SERVICE_ABI, SUBFLOW_CONTRACT_ADDRESS} from '../constants/index';

import Navbar from './Navbar';
import Footer from './Footer';
import "./css/Profile.css";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { shortenAddress } from "./../utils/shortenAddress";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ethers, utils } from "ethers";


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
  const { address, isConnected } = useAccount();

  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [subsReceived, setSubsReceived] = useState(false);
  const [userServices, setUserServices] = useState([]);
  const [servicesReceived, setServicesReceived] = useState(false);
  const [copiedService, setCopiedService] = useState(false);
  const [copiedName, setCopiedName] = useState(false);

  const provider = useProvider();
  const signer = useSigner();

  const Subflow = useContract({ 
    addressOrName: SUBFLOW_CONTRACT_ADDRESS, 
    contractInterface: SUBFLOW_ABI,
    signerOrProvider: signer.data || provider 
  });

  /*
  const object = {
    service
  }*/

  useEffect(() => {
    if (effect.current) {
      effect.current = false;
      const fetch = async () => {
        try {
          console.log("fetching user's services");
          let servicesArray = [];
          let results = await Subflow.getOwnerCreatedServices(address);
          console.log("Services: ", results);

          for (const service of results) {
            console.log("Starting loop");
            let mappedService = {
              id: service.id.toNumber(),
              creatorAddress: service.owner,
              name: service.name,
              serviceAddress: service.service,
              //imageUri: service.uri,
              imageLink: `http://arweave.net/${service.uri}`
            };
            servicesArray.push(mappedService);
          }
          setUserServices(servicesArray);
          setServicesReceived(true);
          console.log("User services gotten and set");
          
          let plansArray = [];
          let subscribedServices = await Subflow.getUsersSubscriptions(address);

          console.log("Starting loop to get subscribed plans: ");
          for(const serviceId of subscribedServices) {
            if (serviceId.toNumber() === 0) continue;

            let service = await Subflow.getServiceById(serviceId);
            let serviceAddress = service.service;
            //let serviceAddress = await Subflow.getServiceAddressById(serviceId);
            const serviceContract = new ethers.Contract(
              serviceAddress, SERVICE_ABI, provider);

            let user = await serviceContract.getUserByAddress(address);
           
            let intervalInDays = secondsToDays(user.plan.interval);
            let parsedAmount = ethers.utils.formatUnits(user.plan.amount);  
            let expiryDate = await serviceContract.checkExpiryDate(address);
            let nowInSeconds = Math.floor(new Date().getTime() / 1000);
            let daysLeft = Math.floor(secondsToDays(expiryDate - nowInSeconds));

            let mappedPlan = {
              serviceName: service.name,
              serviceAddress: serviceAddress,
              interval: intervalInDays,
              planPrice: parsedAmount, 
              expiry: daysLeft
            };

            plansArray.push(mappedPlan);
          }
          console.log("Fetched all plans: ", plansArray);
          setUserSubscriptions(plansArray);
          setSubsReceived(true);
        } catch (error) {
          toast.error("error: ", error.message);
          console.log("failed fetching services. what happened?: ", error.message);
        }
      } 
      fetch();
    }
  }, [address, Subflow]);

  
  const secondsToDays = (seconds) => {
    return (seconds / (60 * 60 * 24));
  }

  const testServices = [
    {
        id: 1,
        serviceAddress: "weg3873hnce983hefn93e33c",
        creatorAddress: "weg3873hnce983hefn93e33c"
    },
    {
        id: 2,
        serviceAddress: "weg3873hnce983hefn93e33c",
        creatorAddress: "weg3873hnce983hefn93e33c"
    },
    {
      id: 3,
      serviceAddress: "weg3reo803nc83c33749",
      creatorAddress: "weg3873hnce983hefn93e33c"
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

  const [open_details, setOpenDetails] = React.useState(false);
  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => setOpenDetails(false);
  
    const testSubscriptions = [
    {
        id: 1,
        price: 0.02,
        matic: "ETH",
        interval: 30,
        serviceName: "Netflix",
        expiration: 13
    },
    {
        id: 2,
        price: 0.005,
        matic: "ETH",
        interval: 10,
        serviceName: 'Spotify',
        expiration: 12
        
    },
    {
      id: 3,
      price: 0.005,
      matic: "ETH",
      interval: 10,
      serviceName: 'Amazon',
      expiration: 28
      
  },
  {
    id: 4,
    price: 0.005,
    matic: "ETH",
    interval: 10,
    serviceName: 'Netflix',
    expiration: 10
    
},
{
  id: 5,
  price: 0.005,
  matic: "ETH",
  interval: 10,
  serviceName: 'Prime',
  expiration: 18
  
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
                
                {
                  !servicesReceived ? (
                    <p className='h2 text-center' style={{color: "white", margin: "0 0 2vh", animation: "pulse 5s infinite"}}>Fetching your services</p>
                  ) : servicesReceived && userServices < 1 ? (
                    <p className='h2 text-center' style={{color: "white", margin: "0 0 2vh"}}>You don't own any services</p>
                  ) : (
                    <>
                    <div className="d-flex justify-content-center align-content-center">
                      <Link to="/services" style={{width: "auto", margin: "3vh 0"}} 
                          className="text-center bttn blue-button-border">
                            Create a new service
                      </Link>
                    </div>

                    <p className='h2 text-center' style={{color: "white", margin: "0 0 2vh"}}>Services you own</p>
                <div className='row'>
                      {userServices.map((service) => (
                        <div className='col-md-4 gap-2' style={{borderRight: "1px solid grey"}}>
                        <div className="card img-fluid " style={{height: "50vh"}}>
                            <img className="card-img-top text-center center m-auto" style={{width: "30vw", height: "30vh"}} src="https://raw.githubusercontent.com/0xcrust/Myself/main/Soltribe%201.png" alt="" />
                            <div className="card-img-overlay">
                              <h4 className="card-title fw-bold h4 text-underline">{service.creator}</h4>
                              <Link 
                                to={{pathname: `/profile/${service.serviceAddress}`}} 
                                state={{ service: service }}
                                style={{marginTop: "40vh"}} className="text-center bttn blue-button">
                                Manage
                              </Link>
                            </div>
                        </div> 

                        <div className='d-flex flex-column mt-5'>
                        <div className='d-flex align-items-center gap-3 text-center'>
                            <p className='fw-bold'>Name:</p>
                            <p className='fw-bold'>{service.name}</p>
                            <CopyToClipboard text={service.name}
                              onCopy={() => setCopiedName(true)}>
                                <button className='copy-icon'>
                                <svg className='cursor-pointer' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path></svg>
                                </button>

                              </CopyToClipboard>
                              {copiedName ? <span className='copy-icon-copied creator'>Copied Name</span> : null}
                          </div>
                          <div className='d-flex align-items-center gap-3 text-center'>
                            <p className='fw-bold'>Address:</p>
                            <p className='fw-bold'>{shortenAddress(service.serviceAddress)}</p>
                            <CopyToClipboard text={service.serviceAddress}
                              onCopy={() => setCopiedService(true)}>
                              <button className='copy-icon'>
                              <svg className='cursor-pointer' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path></svg>
                            </button>
                            </CopyToClipboard>
                            {copiedService ? <span className='copy-icon-copied address'>Copied Address</span> : null}
                          </div>
                        </div>
                      </div>
                      ))}
                          
                    </div>

                    </>

                  )
                }
                
              </div>

              <div class="tab-pane container" id="menu2" style={{marginBottom: "15vh"}}>

                    {
                      !subsReceived ? (
                        <p className='h2 text-center' style={{color: "white", margin: "0 0 2vh", animation: "pulse 5s infinite"}}>Fetching your subscriptions...</p>
                      ) : subsReceived && userSubscriptions < 1 ? (
                        <p className='h2 text-center' style={{color: "white", margin: "0 0 2vh"}}>You have no active subscriptions</p>
                      ) : (
                        <>
                        <div className='d-flex justify-content-center' style={{margin: "0 0 5vh"}}>
                          <Link to="/services" style={{width: "auto"}} className="text-center bttn blue-button-border">
                            Subscribe to a new service
                          </Link>
                        </div>

                        <p className='h2 text-center' style={{color: "white", margin: "0 0 2vh"}}>Your subscriptions</p>
                      
                      <div className='row gy-5 gx-5' style={{width: "90vw"}}>
                    
                        {userSubscriptions.map((plan) =>(

                              <div className='col-md-4' style={{borderRight: "1px solid grey"}}>
                                <div className="card img-fluid " style={{height: "50vh"}}>
                                  <img className="card-img-top text-center center m-auto" style={{width: "30vw", height: "30vh", opacity: 0.4}} src="https://raw.githubusercontent.com/0xcrust/Myself/main/Soltribe%201.png" alt="" />
                                    <div className="card-img-overlay">
                                      
                                    <div className='d-flex flex-column justify-content-center align-items-center' style={{marginTop: "10vh"}}>
                                              
                                              <p className="card-title fw-bold h2 text-underline">{plan.serviceName}</p>
                                          
                                              <p className="card-title h4">{plan.planPrice}MATIC/{plan.interval} days</p>

                                              <p className="card-title h4 text-danger">Expires in {plan.expiry} days</p>
                  
                                            </div>
                                    </div>
                                </div> 

                              </div>
                              ))
                        }
                          </div>

                        </>
                      )

                    }
                       
                      
                      
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