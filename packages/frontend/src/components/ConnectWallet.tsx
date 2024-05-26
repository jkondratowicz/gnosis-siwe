import { useWeb3Context } from '../hooks/useWeb3Context.tsx';

export const ConnectWallet = () => {
  const { isWalletConnected, connectWallet } = useWeb3Context();

  if (isWalletConnected) {
    return null;
  }

  return (
    <>
      <p className="mb-4">To use the app, first connect Metamask.</p>
      <button
        type="button"
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => connectWallet()}
      >
        Connect your wallet
      </button>
    </>
  );
};
