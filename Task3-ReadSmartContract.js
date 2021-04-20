const rpcUrl = "https://ropsten.infura.io/v3/9d3abb594bbb4be99e86186d3d9e87de";
const web3 = new Web3(rpcUrl); 
console.log("rpc", web3)

const address = "0x94A48bfBAE88b45111c4D4A64ad8d88f9aB56b13";
const abi = [    //code's representation in JSON. Web3 does not read code but this interface
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setAge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(abi, address); //object of a contract instantiated
//console.log("Contract",contract)
contract.methods.getAge().call((err, result) => { //This is not a transaction only call
    if(err){
        console.log("Error",err)
    }
    else{
        console.log("Age is: ", result)
        document.getElementById("main").innerHTML = `Age is: ${result}`
    }
})
