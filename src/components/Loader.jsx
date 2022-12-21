import React from 'react';
import styled from 'styled-components';
import "./css/Loader.css";

export default function Loader() 
{
  return (
    <div id='loader_page'>
        
        <span className="text-indigo-600 loader-brand">
            Sub
            <span className="text-gray-900 dark:text-gray-200">
                Flow
            </span>
        </span>

        <section class="animation">
            <div class="first">
                <h2>
                   SubFlow is a platform that lets third-party services manage their subscriptions in a blockchain-centric way. 
                </h2>
            </div>
            <div class="second">
                <h2>
                Create a service which might have multiple plans and customers can subscribe to the service under any particular plan.                
                </h2>
            </div>
            <div class="third">
                <h2>
                Subflow severely limits the the amount of work the third-party service would need to implement to integrate a web3 subscriptions model.                </h2>
            </div>
        </section>
    </div>
  )
}
