const Web3 = require('web3');

const rpcUrl = "https://mainnet.infura.io/v3/9d3abb594bbb4be99e86186d3d9e87de";
const web3 = new Web3(rpcUrl); 

web3.eth.getBlockNumber().then(console.log) //retreiving latest block number
web3.eth.getBlock('latest').then(console.log)//retreiving latest block 

//get trasaction from a specific block
const hash = '0x33311fe588498a2276b86deaf4f8ff3e74467a883a7e103ce6d239ddf2156c1b'; //block hash
web3.eth.getTransactionFromBlock(hash, 2).then(console.log) ///Transaction index 2

// get latest 10 blocks
web3.eth.getBlockNumber().then((latest) => {
    for (let i = 0; i < 10; i++) {
      web3.eth.getBlock(latest - i).then(console.log)
    }
  })
