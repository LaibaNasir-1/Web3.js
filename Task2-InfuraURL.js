const Web3 = require('web3'); //Now we have access to a variable where you can create a new Web3 connection
console.log(Web3)

const rpcUrl = "https://ropsten.infura.io/v3/9d3abb594bbb4be99e86186d3d9e87de";
let web3 = new Web3(rpcUrl); 
console.log("rpc", web3) 

let address = "0x8C91F839D66C21fA5E1edFE603aB8A69cEC8324A";
web3.eth.getBalance(address, (err, wei)=> { //this arrow function is from ECMA6 we can use normal function keyword here as well
    if(err){
        console.log("This is an error", err)
    }
    else{
        console.log('wei balance', wei) //showing balances in wei of the address
        let balance = web3.utils.fromWei(wei, "ether");
        console.log("balance in ethers", balance);
    }
})
