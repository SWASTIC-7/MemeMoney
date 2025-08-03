import { useState } from 'react';
import { ethers } from 'ethers';
import MemeTokenFactoryABI from '../abi/memetokenfactory.json';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const FACTORY_CONTRACT_ADDRESS = '0x35267D331E44f0d61761DB1859eA7C0b55843291'; // Your factory address

interface WalletInfo {
  address: string;
  signer: ethers.JsonRpcSigner;
}

export default function CreateToken() {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [status, setStatus] = useState<string>('');

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWallet({ address, signer });
      console.log('Wallet connected:', address);
      setStatus('Wallet connected: ' + address);
    } catch (error: any) {
      console.error('Connection failed:', error);
      setStatus('Error: ' + error.message);
    }
  };

const createToken = async () => {
  if (!wallet) {
    alert('Connect your wallet first');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/create-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'MemeC',
        symbol: 'MEME',
        supply: '10000',
        userAddress: wallet.address
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    
    setStatus(`Token created! Tx: ${data.txHash}`);
  } catch (error: any) {
    console.error('Token creation failed:', error);
    setStatus('Error: ' + error.message);
  }
}; 

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={connectWallet}>Connect MetaMask</button>
      <button onClick={createToken} disabled={!wallet}>
        Deploy Meme Token
      </button>
      <p>Status: {status}</p>
    </div>
  );
}
