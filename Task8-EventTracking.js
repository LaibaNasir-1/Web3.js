//logs are built using events and they can be listened through web3
//we are not listening to contract but its events

var Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const rpcUrl = "https://ropsten.infura.io/v3/9d3abb594bbb4be99e86186d3d9e87de";
const web3 = new Web3(rpcUrl); 

const address = "0xDDd87fa940A1DF80e70752474641697f29E0D6E0"; //contract address as we have to listen to events
const abi = [
	{
		"inputs": [],
		"name": "doSomething",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
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
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "logString",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "logUint",
		"type": "event"
	},
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
	}
];

const contract = new web3.eth.Contract(abi, address);

contract.getPastEvents(
    "AllEvents", 
    {
        fromBlock: 0,
        toBlock: 'latest'
    }, 
    (err, events) => {
        console.log('event testing', events);
    }
) //will return all the past events of this contract

contract.getPastEvents(
    "logUint", 
    {
        fromBlock: 0,
        toBlock: 'latest'
    }, 
    (err, events) => {
        console.log('particular event testing', events);
    }
) //returning a particular event

/*for performing some action against a particular event when occured, there is
a list of promises like .on('changed' => .....) or .on('data', =>)*/
