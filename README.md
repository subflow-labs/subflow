# SUBFLOW

> ## Table of contents
- [Description](#description)
- [Use of the product](#use-of-features)
- [Tech Stack](#tech-stack)
- [Deployment](#repo-setup)
- [Live Site](#livesite)


#
> ## Description

Subflow is Polygon's first third-party subscription model for web2 integration. Subflow can be
used by web2 companies that have subscription services and want to integrate web3. Subflow is
used to create a subscription contract for the web2 company. The web2 company can create plans,
and the subscription contract created manages access based on the subscription plans of the users.

#
> ## Use of the product

### ADMINS

A web2 company representative can visit the platform and 'create a service.' Subflow generates a subscription contract for the web2 company that includes a checkValidity function. The web2 company refers to this function to manage subscribers' access to its platform. The web2 team can also create a UI on their end by using the subscription contract address and the ABI (provided by subflow). Service can be managed on Subflow or the web2 platform

Users' interactions with the web2 plaform are reflected for the service on Subflow, and subscriptions can be managed on any platform (Subflow or the web2 company). Webflow exposes an api that lets companies manage their
own service contracts, letting them manage user access via web3 connection with minimal changes to their codebase.

### USERS

Users connect to the platform and are immediately presented with a list of available services.
Services can be found by name or address. The user is presented with the subscription plans of the web2 service
and they can be subscribed to, granting access to the the web2 platform. Users can switch between the navigaion tab
to manage all services subscribed to, and can also create a service, with its subscription plans.

#
> ## Tech Stack

- Solidity: This is the language used to write the smart contracts
- OpenZeppelin: This is a solidity library. Used it to enumerate an array of structs and as a counter
- Hardhat: This is development environment used to run the project to Polygon
- Alchemy: This is a web3 development platform and a key is obtained to send requests
- Polygon Mumbai: This is the blockchain the smart contract is deployed to
- React.js: This is the javascript library used for the User Interface
- wagmi: This is the react hook used for the project

#
> ## Deployment

#### Subflow.sol

This project was deployed on Polygon testnet, mumbai. The ink below contains the verified contract address 

- https://mumbai.polygonscan.com/address/0x390927068c8970d7A3D0C996DA4f1C432CD85F60#code

#
> ## Live Link


