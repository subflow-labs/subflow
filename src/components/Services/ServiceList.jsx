import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useProvider, useSigner, useContract } from 'wagmi'
import { SUBFLOW_ABI, SUBFLOW_CONTRACT_ADDRESS } from '../../constants/index'
import toast from 'react-hot-toast';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline'

function ServiceList() 
{
  const effect = useRef(true);
  const [services, setServices] = useState([]);
  const provider = useProvider();
  const signer = useSigner();

  const Subflow = useContract({
    addressOrName: SUBFLOW_CONTRACT_ADDRESS,
    contractInterface: SUBFLOW_ABI,
    signerOrProvider: signer.data || provider,
  });

  useEffect(() => {
    if (effect.current) {
      effect.current = false;
      const fetch = async () => {
        try {
          console.log("fetching");
          const servicesArray = await Subflow.getUserServices();
          console.log(servicesArray);
          if (servicesArray.length > 0) {
            for (let i = 0; i < 5; ++i) {
              if(servicesArray[i] !== undefined) {
              setServices(services => [...services, servicesArray[i]]);
              }
            }
          }
        } catch (error) {
          toast.error(error.message);
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
    },
    {
      id: 3,
      addr: "weg3reo803nc83c33749",
      creator: "Amazon Prime"
    },
    {
      id: 3,
      addr: "weg3reo803nc83c33749",
      creator: "Amazon Prime"
    },
    {
      id: 3,
      addr: "weg3reo803nc83c33749",
      creator: "Amazon Prime"
    },
    {
      id: 3,
      addr: "weg3reo803nc83c33749",
      creator: "Amazon Prime"
    },
  ];

  function copyServiceAddress()
  {
    var element = document.getElementById("copy_service_icon");
    element.style.display = "block"

    setTimeout(() => {
      element.style.display = "block"
    }, 2500);
  }

  function copyCreatorAddress()
  {
    var element = document.getElementById("copy_creator_icon");
    element.style.display = "block"

    setTimeout(() => {
      element.style.display = "block"
    }, 2500);
  }
  return (
    <div className='fader'>
     
      <div className='min-h-screen transition-all duration-300 ease-in w-[90vw] mx-auto pt-4 pb-8'>   
    
        <h1 className="text-indigo-700 dark:text-indigo-500 text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans">
          All services available on Subflow.
        </h1>
        <p className='text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 pt-2'>
          Explore subscription opportunities.
        </p>

        <div className='container'>
        <div style={{margin: "10vh 0 3vh"}} className='d-flex justify-content-around align-content-center'>
            <form  className = 'search-box' action="#" method="post">
                <input className= "search-text" type="text" name="search_services" id="searchServices" placeholder='Search for services by address(An address is 16 characters)' />
                
                <button type="submit" className="search-btn">
                  <svg stroke="#fff" fill="#fff" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#fff" stroke-width="2" d="M15,15 L22,22 L15,15 Z M9.5,17 C13.6421356,17 17,13.6421356 17,9.5 C17,5.35786438 13.6421356,2 9.5,2 C5.35786438,2 2,5.35786438 2,9.5 C2,13.6421356 5.35786438,17 9.5,17 Z"></path></svg>
                </button>
            </form>

        </div>
      </div>
      
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
                <button className='copy-icon' onClick={copyServiceAddress}>
                  <svg className='cursor-pointer' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path></svg>
                </button>
                <div className="copy-icon-copied address" id='copy_service_icon'>Copied Address</div>
              </div>
              <div className='d-flex align-items-center gap-3 text-center'>
                <p className='fw-bold'>Creator:</p>
                <p className='fw-bold'>{service.creator}</p>
                <button className='copy-icon' onClick={copyCreatorAddress}>
                    <svg className='cursor-pointer ' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path></svg>
                </button>
                <div className="copy-icon-copied creator" id='copy_creator_icon'>Copied Creator</div>
              </div>
            </div>
          </div>
          ))}
               
        </div>

      {/** end */}
        
      </div>
    </div>
  )
}

export default ServiceList