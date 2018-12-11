var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'budget fly style midnight few cabbage wall catch unique topple phone act';


module.exports = {
    networks: {
         development: {
              host: "localhost",
              port: 8545,
              network_id: "*" // Match any network id
            },
            ropsten: {
              provider: function() {
                return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/RbLkBm9kjrdxyP9brVBZ")
              },
              network_id: 3,
              gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
            }
     }/* ,
     compilers:{
      solc: {
        version: "0.5.0"
      }
     } */
};
