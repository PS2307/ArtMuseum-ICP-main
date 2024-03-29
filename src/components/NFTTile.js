import axie from "../tile.jpeg";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils";

function NFTTile(data) {
  const newTo = {
    pathname: "/nftPage/" + data.data.tokenId,
  };

  const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

  return (
    <Link to={newTo}>
      <div className='border-2 ml-8 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl'>
        <img
          src={IPFSUrl}
          alt=''
          className='w-72 h-80 rounded-lg object-cover'
          crossOrigin='anonymous'
        />
        <div className='text-white w-full p-2 border-b-indigo-400 rounded-lg '>
          <strong className='text-xl'>{data.data.name}</strong>
          {/* <p className='display-inline'>{data.data.description}</p> */}
        </div>
      </div>
    </Link>
  );
}

export default NFTTile;
