import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useApi } from './useApi.ts';

const scheme = window.location.protocol.slice(0, -1);
const domain = window.location.host;
const origin = window.location.origin;

const provider = new BrowserProvider(window.ethereum);

interface Web3 {
  signInWithEthereum: () => void;
  logOut: () => void;
  isWalletConnected: boolean;
  network: null | string;
  isLoggedIn: boolean;
  address: null | string;
  currentAccount: null | string;
  connectWallet: () => void;
  isProcessing: boolean;
}

const Web3Context = createContext<Web3>({
  signInWithEthereum: () => {},
  logOut: () => {},
  isWalletConnected: false,
  network: null,
  isLoggedIn: false,
  address: null,
  currentAccount: null,
  connectWallet: () => {},
  isProcessing: false,
});

export const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<null | string>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const callApi = useApi();

  useEffect(() => {
    const checkWalletConnection = async () => {
      setIsProcessing(true);
      if (window.ethereum) {
        const accounts = await provider.send('eth_accounts', []);
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          setCurrentAccount(accounts[0]);
        } else {
          setIsWalletConnected(false);
        }

        const network = await provider.getNetwork();
        setNetwork(network.name);
      } else {
        console.log('Please install MetaMask!');
      }
      setIsProcessing(false);
    };

    void checkWalletConnection();

    window.ethereum.on('accountsChanged', (accounts: any) => {
      if (accounts.length > 0) {
        setIsWalletConnected(true);
        setCurrentAccount(accounts[0]);
      } else {
        setIsWalletConnected(false);
        setCurrentAccount(null);
      }
    });

    window.ethereum.on('chainChanged', () => {
      console.log('chain changed, not implemented so reloading');
      window.location.reload();
    });
  }, []);

  function connectWallet() {
    console.log('connecting wallet');
    setIsProcessing(true);
    provider
      .send('eth_requestAccounts', [])
      .catch(() => console.log('user rejected request'))
      .finally(() => setIsProcessing(false));
  }

  async function createSiweMessage(address: string, statement: string) {
    const res = await callApi(`/auth/nonce`);
    const nonce = res.data;
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

  async function signInWithEthereum() {
    setIsProcessing(true);
    const signer = await provider.getSigner();

    const message = await createSiweMessage(await signer.getAddress(), 'Sign in with Ethereum to the app.');
    const signature = await signer.signMessage(message);

    const res = await callApi(`/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature }),
    });
    console.log(res);
    await getMe();
    setIsProcessing(false);
  }

  async function getMe() {
    const data = await callApi(`/auth/me`);
    console.log(data);
    setIsLoggedIn(data.data?.isLoggedIn ?? false);
    setAddress(data.data?.address ?? null);
  }

  async function logOut() {
    setIsProcessing(true);
    const res = await callApi(`/auth/logout`, {
      method: 'POST',
    });
    console.log(res);
    await getMe();
    setIsProcessing(false);
  }

  return (
    <Web3Context.Provider
      value={{
        signInWithEthereum,
        logOut,
        isWalletConnected,
        network,
        isLoggedIn,
        address,
        currentAccount,
        connectWallet,
        isProcessing,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  const {
    signInWithEthereum,
    logOut,
    isWalletConnected,
    network,
    isLoggedIn,
    address,
    currentAccount,
    connectWallet,
    isProcessing,
  } = useContext(Web3Context);
  return {
    signInWithEthereum,
    logOut,
    isWalletConnected,
    network,
    isLoggedIn,
    address,
    currentAccount,
    connectWallet,
    isProcessing,
  };
};
