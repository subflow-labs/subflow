import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useProvider, useSigner, useContract, useAccount } from 'wagmi'
import { SUBFLOW_ABI, SUBFLOW_CONTRACT_ADDRESS } from '../../constants/index'
import {useBundler } from "./../Bundlr/context.jsx";
import toast from 'react-hot-toast';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { providers, utils } from "ethers";
import { Bundlr, WebBundlr } from "@bundlr-network/client";
import { BigNumber } from "bignumber.js";
import { readFileSync } from 'fs';
import { shortenAddress } from "./../../utils/shortenAddress.js"; 

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

const ServiceList = () => {
  //const
  const hiddenFileInput = useRef(null);
  const effect = useRef(true);
  const {address, isConnected} = useAccount();
  const [bundlr, setBundlr] = useState();
  const [bundlrBalance, setBundlrBalance] = useState(3);

  const provider = useProvider();
  const signer = useSigner();

  const subflow = useContract({
    addressOrName: SUBFLOW_CONTRACT_ADDRESS,
    contractInterface: SUBFLOW_ABI,
    signerOrProvider: signer.data || provider,
  });

  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();

  const [services, setServices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [imageURI, setImageURI] = useState("");
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    if (effect.current) {
      effect.current = false;
      const fetch = async () => {
        try {
          console.log("fetching services: ");
          let servicesArray = [];

          let results = await subflow.getAllCreatedServices();
          console.log("results: ", results);
          console.log("address: ", address);
          
          for(const service of results) {
            let mappedService = {
              id: service.id.toNumber(),
              ownerAddress: service.owner,
              name: service.name,
              serviceAddress: service.service,
              //imageUri: service.uri,
              imageLink: `http://arweave.net/${service.uri}`
            };

            servicesArray.push(mappedService);
          }
          setServices(servicesArray);
        } catch (error) {
          console.log(error.message);
          toast.error(error.message);
        }
      }
      fetch();
    }
  }, [subflow]);

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

  const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        const image = URL.createObjectURL(file)
        setImage(image)
        let reader = new FileReader()
        reader.onload = function () {
            if (reader.result) {
                setImageFile(Buffer.from(reader.result))
            }
        }
        reader.readAsArrayBuffer(file)
    }
  }

  const handleChange = (e) => {
    console.log(e.target.files);
    setImageFile(URL.createObjectURL(e.target.files[0]));
    alert("Image uploaded!");
    console.log("Image uploaded!");
  }

  const initializeBundlr = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    await provider._ready();
    const bundlr = new WebBundlr(
        "https://devnet.bundlr.network",
        "matic",
        provider,
        {
            providerUrl:
                process.env.ALCHEMY_MUMBAI_URL,
        }
    );
    await bundlr.ready();
    setBundlr(bundlr);
    console.log("inner checks");
    if (!bundlr) {
      console.log("inner: false");
    } else {
      console.log("inner: true");
    }
  }

  /*
  async function uploadFile(file) {
    try {
        let tx = await bundlrInstance.uploader.upload(file, [{ name: "Content-Type", value: "image/png" }])
        return tx;
    } catch (error) {
        toast({
            title: error.message || "Something went wrong!",
            status: "error"
        })
    }
  }*/

  const uploadFile = async (file) => {
    try {
      let tx = await bundlr.uploader.upload(file, [{ name: "Content-type", value: "image/png" }])
      return tx;
    } catch (error) {
      toast({
          title: error.message || "Something went wrong!",
          status: "error"
      })
    }
  }

  function parseInput(input) {
    const conv = new BigNumber(input).multipliedBy(bundlr.currencyConfig.base[1])
    if (conv.isLessThan(1)) {
        console.log('error: value too small');
        toast({
            title: "Error: value too small",
            status: "error"
        })
        return
    } else {
        return conv
    }
  }

  async function fundWallet(fundBundlr, amount) {
    try {
        if (fundBundlr) {
            if (!amount) return
            const amountParsed = parseInput(amount)
            if (amountParsed) {
                toast({
                    title: "Adding funds please wait",
                    status: "loading"
                })
                let response = await fundBundlr.fund(amountParsed)
                console.log('Wallet funded: ', response)
                toast({
                    title: "Funds added",
                    status: "success"
                })
            }
            fetchBalance()
        }
    } catch (error) {
        console.log("error", error);
        toast({
            title: error.message || "Something went wrong!",
            status: "error"
        })
    }
  }

  const fetchBalance = async () => {
    if (bundlr) {
        const bal = await bundlr.getLoadedBalance();
        console.log("bal: ", utils.formatEther(bal.toString()));
        setBundlrBalance(utils.formatEther(bal.toString()));
    }
  }

  const uploadImageToArweave = async() => {
    try {
      console.log("Initializing bundlr!");

      //if (!bundlr) {
        //await initializeBundlr();
        const provider = new providers.Web3Provider(window.ethereum);
        await provider._ready();
        const bundlr = new WebBundlr(
            "https://devnet.bundlr.network",
            "matic",
          provider,
            {
                providerUrl:
                process.env.ALCHEMY_MUMBAI_URL,
            }
        );

        await bundlr.ready();
        console.log("bundlr: ", bundlr);
        console.log("inner checks");
        if (!bundlr) {
          console.log("inner: false");
        } else {
        console.log("inner: true");
        }
        //setBundlr(bundlr);
      //}
  
      if (!bundlr) {
        console.log("bundlr: ", bundlr);
        console.log("bundlr is false");
      } else {
        console.log("bundlr is true");
      }

      // await fetchBalance();
      console.log("imageFile: ", imageFile);
      console.log("imageFile.toString()", imageFile.toString());
      console.log("aaaaaaaa");
      //const tx = bundlr.createTransaction(readFileSync(imageFile));
      const tx = bundlr.createTransaction(imageFile);
      console.log("bbbbbb");
      const txSize = tx.size;
      const txCost = await bundlr.getPrice(txSize);
      const formattedTxCost = txCost / bundlr.currencyConfig.base[1];
      const loadedBalance = await bundlr.getLoadedBalance();
      const decimalBalance = bundlr.utils.unitConverter(loadedBalance);
      let formattedDecimalBalance = utils.formatEther(decimalBalance.toString());
      console.log("decimalBalance: ", formattedDecimalBalance);
      setBundlrBalance(formattedDecimalBalance);
      console.log("bundlrBalance: ",  bundlrBalance);

      const notLoaded = await bundlr.getBalance(bundlr.address);
      console.log("notLoaded: ", notLoaded.toNumber());

      console.log("txCost: ", formattedTxCost);
      console.log("fetched balance: ", formattedDecimalBalance);
      console.log("check: ",  bundlrBalance > txCost);

      if (formattedDecimalBalance > formattedTxCost) {
        console.log("zzzzz");
        const res = await uploadFile(imageFile);
        setImageURI(`${res.data.id}`);
        console.log("res: ", res);
      } else {
        console.log("yyyyy");
        let fundAmount = formattedTxCost - formattedDecimalBalance;
        console.log("fundAmount: ", fundAmount);

        //fundWallet(bundlr, +fundAmount);
        fundWallet(bundlr, +0.02);
        console.log("funded!");
        const bal = await bundlr.getBalance(bundlr.address);
        console.log("balance after: ", bal.toNumber());

        const res = await uploadFile(imageFile);
        console.log("res: ", res);
        setImageURI(`${res.data.id}`);
      }
    } catch(error) {
      toast.error(error.message);
    }
  }

  const createNewService = async (e) => {
    e.preventDefault();
    console.log("Creating new service");
    console.log("Uploading image to arweave");
    //await uploadImageToArweave();
    console.log("Done uploading");

    try {
      console.log("creating new service");
      console.log("serviceName: ", serviceName);
      //console.log("imageURI: ", imageURI);
      let randomUri = "rofjfkflfsssaaaaaaaaaaaaaaaaaaaaaajsjjsjjs";
      const txResponse = await subflow.createService(serviceName, randomUri);
      await txResponse.wait();
      console.log("done creating service");
    } catch(error) {
      toast.error(error.message);
    }
  }

  const searchByAddress = () => {
    console.log("Searching by address");
    let results = [];

    // for(service of services && service.address == searchText) results.push(service);
    // Querying from the blockchain is probably less cost-intensive
    
    setSearchResults(results);
  }

  const searchByName = () => {
    console.log("Searching by name");
    let results = [];

    //
  }

  const searchByCreator = () => {
    console.log("Searching by creator");
  }

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='fader'>
     
      <div className='min-h-screen transition-all duration-300 ease-in w-[90vw] mx-auto pt-4 pb-8'>   
    
        <h1 className="text-indigo-700 dark:text-indigo-500 text-center font-semibold mt-8 text-2xl sm:text-3xl md:text-4xl trans">
          All services available on Subflow.
        </h1>
 
        
          <p className='text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 pt-2'>
            Explore subscription opportunities.
          </p>
         
         
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
                className="d-flex justify-content-center align-items-center "
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
                  
                    <TextField fullWidth label="Service Name" id="fullWidth" variant="outlined" value={serviceName} onChange={(e) => setServiceName(e.target.value) } />
                  
                    <Button
                        variant="contained"
                        component="label"
                        className="d-flex justify-content-center align-items-center"
                      >
                        Upload Image
                        <input type="file" ref={hiddenFileInput} hidden onChange={handleChange}
                        />
                      </Button>

                      <Button
                        type="submit"
                        className="bttn blue-button d-flex justify-content-center align-items-center" 
                        onClick={createNewService}
                    >
                        Create
                    </Button>
                  </Box>
                  </Typography>
                </Box>
              </Modal>
            </div>
          
          <div className='container'>
        <div style={{margin: "10vh 0 3vh"}} className='d-flex justify-content-around align-content-center'>
            <form  className = 'search-box' action="#" method="post">
                <input className= "search-text" type="text" name="search_services" id="searchServices" placeholder='Search for services by address' />
                
                <button type="submit" className="search-btn">
                  <svg stroke="#fff" fill="#fff" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#fff" stroke-width="2" d="M15,15 L22,22 L15,15 Z M9.5,17 C13.6421356,17 17,13.6421356 17,9.5 C17,5.35786438 13.6421356,2 9.5,2 C5.35786438,2 2,5.35786438 2,9.5 C2,13.6421356 5.35786438,17 9.5,17 Z"></path></svg>
                </button>
            </form>

        </div>
      </div>
      
      {/**THIS IS MY DESIGN FOR THE SERVICES  PUT IT WHEREVER U WANT TO PUT IT */}
        <div className='row'>
          {services.map((service) => (
            <div className='col-md-4 gap-2' style={{borderRight: "1px solid grey"}}>
            <div className="card img-fluid " style={{height: "50vh"}}>
                <img className="card-img-top text-center center m-auto" style={{width: "30vw", height: "30vh"}} src="https://cdn.cdnlogo.com/logos/s/47/spotify.svg" alt="Card image" />
                <div className="card-img-overlay">
                  <h4 className="card-title fw-bold h4 text-underline">{service.creator}</h4>
                  <Link to="/plans" style={{marginTop: "40vh"}} className="text-center bttn blue-button-border">View Plan</Link>
                </div>
            </div> 

            <div className='d-flex flex-column mt-5'>
              <div className='d-flex align-items-center gap-3 text-center'>
                <p className='fw-bold'>Address:</p>
                <p className='fw-bold'>{shortenAddress(service.serviceAddress)}</p>
                <button className='copy-icon' onClick={copyServiceAddress}>
                  <svg className='cursor-pointer' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"></path></svg>
                </button>
                <div className="copy-icon-copied address" id='copy_service_icon'>Copied Address</div>
              </div>
              <div className='d-flex align-items-center gap-3 text-center'>
                <p className='fw-bold'>Creator:</p>
                <p className='fw-bold'>{shortenAddress(service.ownerAddress)}</p>
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