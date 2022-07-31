import React, { useState, useContext, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getWarrantyDetails } from "../contexts/useContract/readContract";
import Web3Context from "../contexts";

function Warranty() {
  const { Contract } = useContext(Web3Context);
  const { warrantyID } = useParams();
  const [data, setData] = useState("");
  const [expiry,setExpiry]=useState("");
  useEffect(() => {
    getDetails();
  }, [Contract]);

  const getDetails = async () => {
    const res = await getWarrantyDetails(Contract, warrantyID);
    // console.log(res)
    setData(res);
    const date = new Date(res.expiry*1000);
    setExpiry(date)
  };
  return (
    <>
      <div className="w-screen h-screen">
        <Navbar />
        <div className="w-full h-full bg-new-secondary flex flex-col justify-center items-center">
          <div className="w-1/3 h-4/6 flex justify-start items-center flex-col bg-secondary-3 rounded-lg border-2 border-black">
            <div className="text-2xl mt-4 font-bold">
              Warranty #{warrantyID}
            </div>
            <div className="flex flex-col justify-evenly items-center w-full h-3/4">
              <img
                className="w-auto rounded-lg p-0.5 h-2/3 mt-5 mb-5"
                src={data.imageURI}
              />
              <div className="flex flex-col justify-center items-center mt-4">
                <span className="w-full text-xl text-left">
                  <span className="font-semibold">Product ID:</span>{" "}
                  {data.productId}
                </span>
                <span className="w-full text-xl text-left">
                  <span className="font-semibold">Current Owner</span>{" "}
                  {`${String(data && data.buyers[data.buyers.length - 1]).slice(
                    0,
                    5
                  )}...${String(
                    data && data.buyers[data.buyers.length - 1]
                  ).slice(
                    String(data && data.buyers[data.buyers.length - 1]).length -
                      5
                  )}`}
                </span>
                <span className="w-full text-xl text-left">
                  <span className="font-semibold">Expiry Date:</span>
                  {data && String(expiry).slice(3,25)}
                </span>
              </div>
            </div>
           { data && (data.status ==2 || data.status == 3)&&(<a href={`https://testnets.opensea.io/assets/mumbai/0x4e29D98d0A7f1b45ed75242928f7D07b338b700B/${data.tokenId}`} className="text-right mt-5 cursor-pointer underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
              See at OpenSea
            </a>)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Warranty;
