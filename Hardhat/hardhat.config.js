require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:'localhost',  //name of the nw that we have given
  solidity: "0.8.30",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/"
    },
    hoodi:{
      url:`https://eth-hoodi.g.alchemy.com/v2/${process.env.HOODI_KEY}`,
      accounts:[process.env.PRIVATE_KEY]
    },
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/tSjMtBTO8b8gmqIdaDcXcIdN8MYbjwA5',
      accounts:['b68c2e13e0022da45e3f629e39eec574a5fe1cbdb98c34dc0affc098a0bee8b0']
    }
  }
};
