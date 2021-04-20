const Web3 = require('web3'); //Now we have access to a variable where you can create a new Web3 connection
console.log(Web3)

const rpcUrl = "HTTP://127.0.0.1:7545";
let web3 = new Web3(rpcUrl); //accesing ganache with web3
console.log("rpc", web3) 

let address = "0xA27a58AC2Ed4A050f865C6004f3065C58d1e9363";
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
