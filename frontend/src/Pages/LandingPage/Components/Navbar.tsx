import React,{useState} from 'react'
import Logo from '../../../assets/Logo.svg'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { ethers } from "ethers";



function Navbar() {
  const navigate = useNavigate();
   const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");

async function Auth() {
//   await fetch("http://localhost:3001/api/deploy", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     name: "MemeCoin",
//     symbol: "MEME",
//     supply: 1000000,
//     decimals: 2,
//   }),
// });


//  if (!window.ethereum) return alert("Install MetaMask");

//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     await provider.send("eth_requestAccounts", []);

//     const signer = provider.getSigner();
//     const address = await signer.getAddress();
//     const message = "Verify your wallet for Hedera Memecoin";
//     const signature = await signer.signMessage(message);

//     // Send to backend for verification
//     const res = await fetch("http://localhost:3000/api/verify-wallet", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ address, signature, message }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       setAccount(address);
//       setStatus("Connected and Verified");
//     } else {
//       setStatus("Verification failed");
//     }
 
}

  return (
    <div className='Nav'>
        
            <img src={Logo} alt='Logo' className='Logo'/>
        
        <div className='Nav_bttns'>
            <div className='Register Nav_Box' onClick={Auth}>REGISTER</div>
            <div className='Login Nav_Box'>LOGIN</div>
        </div>
    </div>
  )
}

export default Navbar