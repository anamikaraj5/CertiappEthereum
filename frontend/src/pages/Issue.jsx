import { BrowserProvider, Contract } from 'ethers';
import { useState } from 'react';
import abi from '../assets/CertiApp.json'
import address from '../assets/deployed_addresses.json'
import Nav from '../components/Nav'

function App() {
  const [details, setDetails] = useState({
    ID: 0,
    Name: '',
    Course: '',
    Grade: '',
    Date: '',
  });

  const [output, setOutput] = useState('');
  const [wallet, setWallet] = useState('');

  const provider = new BrowserProvider(window.ethereum);

  async function handleConnect() {
    if (!window.ethereum) {
      alert("MetaMask not detected. Please install MetaMask.");
      return;
    }

    try {
      const signer = await provider.getSigner();
      setWallet(signer.address);
      alert(`${signer.address} logged in successfully`);
    } catch (err) {
      console.error(err);
      alert("MetaMask connection failed");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const signer = await provider.getSigner();
      const contractObj = new Contract(address['CertModule#CertiApp'], abi.abi, signer);
      const receipt = await contractObj.issue(
        parseInt(details.ID),
        details.Name,
        details.Course,
        details.Grade,
        details.Date
      );
      if (receipt) {
        console.log(receipt);
        alert(`Certificate created! TX Hash: ${receipt.hash}`);
      } else {
        alert("Error issuing certificate");
      }
    } catch (err) {
      console.error(err);
      alert("Transaction failed: " + err.message);
    }
  }



  return (
    <div className='bg-purple-300 min-h-screen'>
    <Nav/>
  
    <div className=" p-10 text-purple-950">
      <div className="mb-6">
        <input
          type="button"
          value="Connect to MetaMask"
          onClick={handleConnect}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        />

      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-[800px]">
        <p className="text-xl font-bold mb-4">Issue Certificate</p>

        <div className="mb-3">
          <label>ID: </label>
          <input type="number" onChange={handleChange} name="ID" className="border p-1 w-full" required />
        </div>
        <div className="mb-3">
          <label>Name: </label>
          <input type="text" onChange={handleChange} name="Name" className="border p-1 w-full" required />
        </div>
        <div className="mb-3">
          <label>Course: </label>
          <input type="text" onChange={handleChange} name="Course" className="border p-1 w-full" required />
        </div>
        <div className="mb-3">
          <label>Grade: </label>
          <input type="text" onChange={handleChange} name="Grade" className="border p-1 w-full" required />
        </div>
        <div className="mb-4">
          <label>Date: </label>
          <input type="date" onChange={handleChange} name="Date" className="border p-1 w-full" required />
        </div>

        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Issue
        </button>
      </form>

    </div>
    </div>
  );
}

export default App;


