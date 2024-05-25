import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import { useState } from 'react';

const scheme = window.location.protocol.slice(0, -1);
const domain = window.location.host;
const origin = window.location.origin;
// @ts-ignore
const provider = new BrowserProvider(window.ethereum);

const BACKEND_ADDR = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export const useSiwe = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [address, setAddress] = useState<string | undefined>();

  async function createSiweMessage(address: string, statement: string) {
    const res = await fetch(`${BACKEND_ADDR}/auth/nonce`, {
      credentials: 'include',
    });
    const nonce = (await res.json()).data;
    const message = new SiweMessage({
      scheme,
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: 1,
      nonce,
    });
    return message.prepareMessage();
  }

  function connectWallet() {
    provider.send('eth_requestAccounts', []).catch(() => console.log('user rejected request'));
  }

  async function signInWithEthereum() {
    const signer = await provider.getSigner();

    const message = await createSiweMessage(await signer.getAddress(), 'Sign in with Ethereum to the app.');
    const signature = await signer.signMessage(message);

    const res = await fetch(`${BACKEND_ADDR}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature }),
      credentials: 'include',
    });
    console.log(await res.json());
    await getMe();
  }

  async function getMe() {
    const res = await fetch(`${BACKEND_ADDR}/auth/me`, {
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);
    setIsLoggedIn(data.data?.isLoggedIn);
    setAddress(data.data?.address);
  }

  async function logOut() {
    const res = await fetch(`${BACKEND_ADDR}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    console.log(await res.json());
    await getMe();
  }

  return { connectWallet, signInWithEthereum, getMe, logOut, isLoggedIn, address };
};
