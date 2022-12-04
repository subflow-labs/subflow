import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import DarkMode from "../utils/DarkMode";
//import './css/Navbar.css'
import "./../style/Navbar.css";

import {
  MenuIcon,
  XIcon,
  ViewGridIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function Navbar() 
{
  const [colorScheme, setTheme] = DarkMode();

  //o-laj
    // When the user scrolls down 100px from the top of the document, show the button
    let nav = document.getElementById("navbarBig");
    
    window.onscroll = function() {ChangeNavBgFunction()};

    function ChangeNavBgFunction() 
    {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) 
      {
        nav.style.backgroundColor = "#212529";
      } else 
      {
        nav.style.backgroundColor = "transparent";
      }
    }
  //end of change nav bg
//end olaj
  
  return (
    <Popover className="relative bg-lg">
      <div className="w-full mx-auto px-4 sm:px-6 fixed-top" style={{zIndex: '10'}} id="navbarBig">
        <div className="flex justify-between lg:justify-evenly items-center pt-6 pb-4  md:space-x-10 ">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link
              to="/"
              className="font-bold  text-black text-base sm:text-2xl mr-1"
            >
              <div className="flex gap-2">
                <span className="text-indigo-600">
                  Sub
                  <span className="text-gray-900 dark:text-gray-200">
                    Flow
                  </span>
                </span>
              </div>
            </Link>
          </div>
          {/* Navbar(Larger screens) */}

          <Popover.Group
            as="nav"
            className="hidden lg:flex items-center justify-center space-x-10 text-ld font-medium"
          >
            <NavLink exact="true" to="/services">
              Services
            </NavLink>
            
            <NavLink exact="true" to="/creators">
              Creators
            </NavLink>

            <NavLink exact="true" to="/docs">
              Documentation
            </NavLink>
            
          </Popover.Group>

          {/* Connect Button(Large Screens)*/}
          <div className="flex gap-4 items-center justify-end md:flex-1 lg:w-0">
            <Link to="/profile" style={{cursor: "pointer"}}>
                <svg stroke="currentColor" fill="white" stroke-width="0" viewBox="0 0 16 16" height="2.5em" width="2.5em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
            </Link>
            <ConnectButton
              showBalance={false}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              chainStatus={{ smallScreen: "none", largeScreen: "full" }}
            />
          </div>
          {/*Menu Button(smaller buttons) */}
          <div className="-mr-2 -my-2 flex gap-2 items-center lg:hidden">
            <Popover.Button className=" rounded-md p-2 inline-flex items-center justify-center text-gray-400  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-8 w-8" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
      </div>

      {/* Responsive Navbar for smaller phones*/}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          style={{zIndex: '11'}}
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden z-50"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-slate-100 dark:bg-slate-800 trans divide-y divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-indigo-600">
                    Sub
                    <span className="text-gray-900 dark:text-gray-200">
                      Flow
                    </span>
                  </span>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-ld rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-4 space-y-6">
              <div className="flex flex-col items-start gap-y-4 gap-x-8 font-metro text-ld text-base font-medium">
                <NavLink
                  exact="true"
                  to="/services"
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 w-full flex gap-2 items-center rounded-md"
                >
                  <ShoppingCartIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  Services
                </NavLink>
                <NavLink
                  exact="true"
                  to="/services/all721tokens"
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 w-full flex gap-2 items-center rounded-md"
                >
                  <UserGroupIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  Creators
                </NavLink>
                <NavLink
                  exact="true"
                  to="/profile"
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 p-3 w-full flex gap-2 items-center rounded-md"
                >
                  <ViewGridIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  Profile
                </NavLink>
              </div>
              <div></div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}


