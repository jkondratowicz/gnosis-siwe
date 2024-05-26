import { useWeb3Context } from '../hooks/useWeb3Context.tsx';

export const SignIn = () => {
  const { isWalletConnected, signInWithEthereum, isLoggedIn, address, logOut } = useWeb3Context();

  if (!isWalletConnected) {
    return null;
  }

  if (isLoggedIn) {
    return (
      <>
        <p className="mb-4">
          You are logged in with address <code>{address}</code>
        </p>
        <button
          onClick={() => logOut()}
          type="button"
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Log out
        </button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => signInWithEthereum()}
        type="button"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Sign in with Ethereum
      </button>
    </>
  );
};
