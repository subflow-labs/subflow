import { useState, useEffect, useRef } from 'react'
import toast from "react-hot-toast";
import { useAccount,useProvider, useSigner, useContract } from 'wagmi';
import {Link} from 'react-router-dom'
import {Helmet} from "react-helmet";

import {SUBFLOW_ABI, SUBFLOW_CONTRACT_ADDRESS} from '../constants/index';

import './css/Profile.css'
import Navbar from './Navbar'
import Footer from './Footer'

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
                  <Link
                    to="/create_a_new_service"
                    className="blue-button-border bttn md:px-16"
                    style={{width: "auto"}}
                  >
                    Create a new service
                  </Link>

                   {/**THIS IS MY DESIGN FOR THE SERVICES  PUT IT WHEREVER U WANT TO PUT IT */}
                <div className='row'>
                      {testServices.map((service) => (
                        <div className='col-md-4 gap-2' style={{borderRight: "1px solid grey"}}>
                        <div className="card img-fluid " style={{height: "50vh"}}>
                            <img className="card-img-top text-center center m-auto" style={{width: "30vw", height: "30vh"}} src="https://cdn.cdnlogo.com/logos/s/47/spotify.svg" alt="Card image" />
                            <div className="card-img-overlay">
                              <h4 className="card-title fw-bold h4 text-underline">{service.creator}</h4>
                              <Link to="/plans" style={{marginTop: "40vh"}} className="text-center bttn blue-button">View Plan</Link>
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

               <div class="tab-pane container" id="menu2">
                <div className="d-flex flex-column align-items-center gap-2"> 
                    <div>
                        {/**SUBSCRIPTION TO A NEW SERVICE */}
                        <button type="button" class="bttn blue-button" style={{width: "auto"}} data-bs-toggle="modal" data-bs-target="#subscribe">
                          Subscribe to a new service
                        </button>
                        {/**THE MODAL FOR THE SEARCH FOR SUBSCRIBING TO NEW SERVICES */}
                        <div class="modal" style={{zIndex: "100"}} id="subscribe">
                          <div class="modal-dialog modal-dialog-centered" >
                            <div class="modal-content">

                              
                              <div class="modal-header">
                                <h4 class="modal-title fw-bold" style={{color: "black"}}>Subscribe to a new service</h4>
                                <button type="button" data-bs-dismiss="modal">
                                <svg stroke="#000" fill="#000" stroke-width="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
                                </button>
                              </div>

                              
                              <div class="modal-body">
                                <form action="#" className="subscribe-form d-flex flex-column justify-content-center" method="post">
                                    <input type="text" placeholder='Search for the service you want to subscribe to...' name="services_addr" id="services_addr" />
                                    <button type="submit" style={{width: "auto"}} className='bttn blue-button'>
                                      Search Services
                                    </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>  
                  </div>
                  <div className='flex justify-content-center flex-column '>
                    
                    <p className='h2 text-center'>You are currently subscribed to:</p>
                
                    <div className="card col-md-9 text-center" style={{backgroundColor: "blue", color: 'white'}}>
                        <div class="card-body">
                          <h4 class="card-title fw-bold text-center fw-bold">1 Month Plan</h4>
                          <p class="card-text h4 fw-bold">0.02ETH</p>
                        </div>
                    </div>
                  </div>
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