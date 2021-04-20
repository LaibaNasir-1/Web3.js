//ethereumjs-tx to be installed
var Tx = require('ethereumjs-tx');
const Web3 = require('web3'); //Now we have access to a variable where you can create a new Web3 connection
//console.log(Web3)

const rpcUrl = "https://ropsten.infura.io/v3/9d3abb594bbb4be99e86186d3d9e87de";
let web3 = new Web3(rpcUrl); 
//console.log("rpc", web3)

const account1 = "0x8C91F839D66C21fA5E1edFE603aB8A69cEC8324A";
const privatekey1 = "3f88c028317a13955cbfd6db46c6d89710a7e548dea6f60ce86208ad2a12c31d";

const account2 = "0x8eca46ba3af27E90F9bFB492800e4e6ea7Ab3C1c";
//const privatekey2 = "4192839d9a95dbada0bd0f47f3c46be8b1211294fa3eaff29dcbd4298244d64a";

const privatekey1Buffer = Buffer.from(privatekey1, 'hex'); //converting the hexadecimal string of private key into binary array 
//const privatekey2Buffer = Buffer.from(privatekey2, 'hex');

web3.eth.getTransactionCount(account1, (err, txCount) =>{
    if (err){
        console.log('error',err)
    }
    else{
        //let convert = web3.utils.toHex; then convert can be used everywhere instead of whole command
        const txObject = { 
            nonce: web3.utils.toHex(txCount), //utils have web3 helper methods
            to: account2, //from not defined here, will be specified when we use it to sign tx 
            value: web3.utils.toHex(web3.utils.toWei("1", 'ether')),
            gasLimit: web3.utils.toHex(21000), //this is how muh a normal transaction like this, consumes gas
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", 'gwei'))
        }
        const tx = new Tx.Transaction(txObject, {chain: 'ropsten', hardfork: 'petersburg'});
        tx.sign(privatekey1Buffer);
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        console.log('tx: ',tx);

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
