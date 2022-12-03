import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from "./components/Home";
//import About from './components/About/About';
import Services from './components/Services/Services'
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Plans from './components/Plans';

//olaj
import './App.css'
//end olaj

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// Set-up accepted chains and providers 
const { chains, provider } = configureChains([chain.polygon, chain.polygonMumbai],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_MUMBAI_URL }),
    publicProvider()
  ]
);
// Set up connector(appName to show in Rainbowkit UI and accepted chains)
const { connectors } = getDefaultWallets({ appName: "FreeChain", chains });
//Set up a wagmi wallet client
const wagmiClient = createClient({ autoConnect: true, connectors, provider });


function App() {
  return (
    <WagmiConfig client={wagmiClient}>
    
      <RainbowKitProvider chains={chains}
        theme={lightTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
        })}
      >
        
        <Router>
        
          <div className='font-mod flex flex-col relative overflow-x-hidden dark:bg-[#202020] transition-all duration-300 ease-in-out'>
            
            <div><Toaster position="bottom-right" reverseOrder={false} /></div>
            <Routes>
              
              <Route path='/' element={<Home />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/*' element={<NotFound />}></Route>
              <Route path='/services' element={<Services />}></Route>
              <Route path='/plans' element={<Plans />}></Route>
              
            </Routes>
          </div>
         
        </Router>
        
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;


// <Route path='/about' element={<About />}></Route>