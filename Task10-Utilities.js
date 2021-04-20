const Web3 = require('web3');

const rpcUrl = "https://mainnet.infura.io/v3/9d3abb594bbb4be99e86186d3d9e87de";
const web3 = new Web3(rpcUrl); 

// Get average gas price in wei from last few blocks median gas price
web3.eth.getGasPrice().then((result) => {
    console.log(web3.utils.fromWei(result, 'ether'))
  })

// Use sha256 Hashing function
console.log(web3.utils.sha3('Laiba Nasir'))

// Use keccak256 Hashing function
console.log(web3.utils.keccak256('Laiba Nasir'))

// Get a Random Hex
console.log(web3.utils.randomHex(32))

// Get access to the underscore JS library
const _ = web3.utils._

_.each({ key1: 'value1', key2: 'value2' }, (value, key) => {
  console.log(key)
})
