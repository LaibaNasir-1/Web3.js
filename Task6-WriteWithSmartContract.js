//since state of the contract is changing hence writing will be a transaction
var Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const rpcUrl = "https://ropsten.infura.io/v3/9d3abb594bbb4be99e86186d3d9e87de";
const web3 = new Web3(rpcUrl); 

const account1 = "0x8C91F839D66C21fA5E1edFE603aB8A69cEC8324A";
const privatekey1 = "3f88c028317a13955cbfd6db46c6d89710a7e548dea6f60ce86208ad2a12c31d";

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

const privatekey1Buffer = Buffer.from(privatekey1, 'hex');
const contract = new web3.eth.Contract(abi, address); //object of a contract instantiated

web3.eth.getTransactionCount(account1, (err, txCount) =>{
    if (err){
        console.log('error',err)
    }
    else{
        const txObject = { 
            nonce: web3.utils.toHex(txCount), //utils have web3 helper methods
            to: address,  
            data: contract.methods.setAge(22).encodeABI(), //converts abi to bytecode
            gasLimit: web3.utils.toHex(80000), 
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", 'gwei'))
        }
        const tx = new Tx.Transaction(txObject, {chain: 'ropsten', hardfork: 'petersburg'});
        tx.sign(privatekey1Buffer);
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
        console.log('txObject: ',txObject);

        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            if(err){
                console.log('error',err)
            }
            else{
                console.log('Transaction Hash: ',txHash)
            }
        })
    }
})
