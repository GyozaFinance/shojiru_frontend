import './App.css';

import DashBoard from './composents/dashboard';
import { Web3ModalProvider } from './contexts/web3-modal-context';
import { DashBoardProvider } from './contexts/dashboard-context';
import { LoadProvider } from './contexts/load-context';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function App() {

  
  return (
    <Web3ModalProvider>
      <LoadProvider>
        <DashBoardProvider>
          <DashBoard/>
        </DashBoardProvider>
      </LoadProvider>
      <div className="fixed z-50 w-full" style={{ top: "0", right: "0" }}>
        <ToastContainer className="fixed right-0 top-O z-50" />
      </div>
    </Web3ModalProvider>
  );
}

export default App;
