import { useWeb3Context } from './hooks/useWeb3Context.tsx';
import { ConnectWallet } from './components/ConnectWallet.tsx';
import { SignIn } from './components/SignIn.tsx';
import { SpinnerOverlay } from './components/SpinnerOverlay.tsx';
import { Profile } from './components/Profile.tsx';

function App() {
  const { isWalletConnected, network, currentAccount, isLoggedIn, address, isProcessing } = useWeb3Context();

  return (
    <div className={'flex flex-row items-center h-full bg-green-200 py-4'}>
      <div className="flex flex-col items-center h-screen w-full">
        <div className="bg-green-100 p-6 rounded-sm max-w-screen-xl w-full mt-4 relative">
          {isProcessing && <SpinnerOverlay />}
          <ConnectWallet />
          <SignIn />
          <Profile />
        </div>
        <pre className="mt-6 p-4 border border-green-300 rounded text-xs w-full max-w-screen-xl">
          {JSON.stringify(
            {
              isLoggedIn,
              address,
              isWalletConnected,
              network,
              currentAccount,
              isProcessing,
            },
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  );
}

export default App;
