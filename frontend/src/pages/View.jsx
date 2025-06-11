import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import abi from '../assets/CertiApp.json';
import address from '../assets/deployed_addresses.json';
import logo from '../assets/images/images.png';
import Nav from '../components/Nav.jsx';

const View = () => {
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleView = async () => {
    const id = document.getElementById("iD").value.trim();
    if (!id) {
      setError("Please enter a valid Certificate ID");
      setCertificate(null);
      return;
    }

    setLoading(true);
    setError("");
    setCertificate(null);

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractObj = new Contract(address['CertModule#CertiApp'], abi.abi, signer);
      const result = await contractObj.Certificates(id);

      if (!result[0] && !result[1] && !result[2] && !result[3]) {
        throw new Error("Certificate not found!");
      }

      setCertificate({
        name: result[0],
        course: result[1],
        grade: result[2],
        date: result[3],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetView = () => {
    setCertificate(null);
    setError("");
    document.getElementById("iD").value = "";
  };

  return (
    <div className="bg-purple-100 min-h-screen">
      <Nav />
      <div className="flex justify-center pt-20">
        <div className="bg-white p-10 rounded-md shadow-lg text-center w-[600px]">
          <h1 className="text-2xl font-bold text-purple-900 mb-6">Certificate Dapp</h1>
          <img src={logo} alt="logo" className="h-[120px] mx-auto mb-6" />

          <input
            id="iD"
            type="text"
            placeholder="Enter Certificate ID"
            className="w-full p-2 border rounded-md text-md mb-4"
          />
          <button
            onClick={handleView}
            className="w-full p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Search
          </button>

          {loading && <p className="text-sm mt-4 text-gray-600">Loading...</p>}
          {error && <p className="text-sm mt-4 text-red-600">{error}</p>}
        </div>
      </div>

      {certificate && (
        <div className="min-h-screen bg-purple-100 p-10">

          <div className="bg-white shadow-lg mx-auto p-10 w-[80%] border border-gray-400 text-center">
            <h3 className="text-xl font-semibold text-purple-800">Kerala Blockchain Academy</h3>
            <img src={logo} alt="logo" className="h-[150px] my-10 mx-auto" />
            <p className="text-lg">This is to certify that <strong>{certificate.name}</strong></p>
            <p className="text-lg mt-4">has successfully completed <strong>{certificate.course}</strong></p>
            <p className="text-lg mt-4">
              with <strong>{certificate.grade}</strong> on <strong>{certificate.date?.split("-").reverse().join("-")}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;



