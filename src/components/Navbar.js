import logo from "../logo_3.png";
import fullLogo from "../full_logo.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }
  async function isConnected() {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      console.log(`You're connected to: ${accounts[0]}`);
      updateButton();
      toggleConnect(true);
      getAddress();
    } else {
      console.log("Metamask is not connected");
    }
  }

  async function connectWebsite() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const addr = await signer.getAddress();
    updateAddress(addr);
    updateButton();
    toggleConnect(true);

    // const chainId = await window.ethereum.request({ method: "eth_chainId" });
    // if (chainId !== "0x56b29") {
    //   //alert('Incorrect network! Switch your metamask network to Rinkeby');
    //   await window.ethereum.request({
    //     method: "wallet_switchEthereumChain",
    //     params: [{ chainId: "0x56b29" }],
    //   });
    // }
    // await window.ethereum
    //   .request({ method: "eth_requestAccounts" })
    //   .then(() => {
    //     updateButton();
    //     console.log("here");
    //     getAddress();
    //     window.location.replace(location.pathname);
    //   });
  }

  useEffect(() => {
    isConnected();

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  return (

    <div className=''>
    
      <nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
        <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          
          <div class="text-indigo-500 md:order-1">
            <li className='flex items-end ml-5 pb-2'>
            <Link to='/'>
              <div className='inline-block font-bold text-xl font'>
                HOPE-TOKEN$
              </div>
            </Link>
          </li>
          </div>
          <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
			<ul class="flex font-semibold justify-between">
                
				<li class="md:px-4 md:py-2 hover:text-indigo-400">
          {location.pathname === "/" ? (
                <li class='text-indigo-400'>
                  <Link to='/'>Showcase</Link>
                </li>
              ) : (
                <li class='hover:text-indigo-400'>
                  <Link to='/'>Showcase</Link>
                </li>
              )}
          </li>
				<li class="md:px-4 md:py-2 hover:text-indigo-400">
          {location.pathname === "/sellNFT" ? (
                <li class='text-indigo-400'>
                  <Link to='/sellNFT'>List My ART</Link>
                </li>
              ) : (
                <li class='hover:text-indigo-400'>
                  <Link to='/sellNFT'>List My ART</Link>
                </li>
              )}</li>
				<li class="md:px-4 md:py-2 ">
          {location.pathname === "/profile" ? (
                <li class='text-indigo-400'>
                  <Link to='/profile'>Profile</Link>
                </li>
              ) : (
                <li class='hover:text-indigo-400'>
                  <Link to='/profile'>Profile</Link>
                </li>
                
              )}</li>
			</ul>
      </div>
      <div class="order-2 md:order-3">
			<button class="enableEthereumButton  px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
      onClick={connectWebsite}>
                
                
                  {connected ? "Connected" : "Connect Wallet"}
            </button>
		</div>
		
          
        </div>
      </nav>
      <div className='text-white text-bold text-right mr-10 text-sm'>
        {currAddress !== "0x"
          ? "Connected to"
          : <div class="text-slate-600">"Not Connected. Please login to view NFTs"</div>}{" "}
        {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
      </div>
    </div>
  );
}

export default Navbar;
