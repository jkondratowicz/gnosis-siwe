import { useSiwe } from './hooks/useSiwe.ts';

function App() {
  const { connectWallet, signInWithEthereum, getMe, logOut, isLoggedIn, address } = useSiwe();

  return (
    <div className={'flex flex-row items-center h-screen bg-green-200'}>
      <div className="flex flex-col items-center h-screen w-full">
        <div className="bg-green-100 p-6 rounded-sm max-w-screen-xl w-full mt-4">
          <button
            onClick={() => connectWallet()}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Connect wallet
          </button>
          <button
            onClick={() => signInWithEthereum()}
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Sign in with Ethereum
          </button>
          <button
            onClick={() => getMe()}
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Me
          </button>
          <button
            onClick={() => logOut()}
            type="button"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Log out
          </button>
          <pre>{JSON.stringify({ isLoggedIn, address }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
