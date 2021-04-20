//ethereumjs-tx to be installed
var Tx = require('ethereumjs-tx');
const Web3 = require('web3'); //Now we have access to a variable where you can create a new Web3 connection
//console.log(Web3)

const rpcUrl = "HTTP://127.0.0.1:7545";
let web3 = new Web3(rpcUrl); //accesing ganache with web3
//console.log("rpc", web3)

const account1 = "0xA27a58AC2Ed4A050f865C6004f3065C58d1e9363";
const privatekey1 = "72f942f018ca6afcec880d6b4de68c2ebbb9ab83a71e562377c7318c61d5c1c6";

const account2 = "0x02eb2F7D9b10b0b3800fd78E0f2f3e8efdD11553";
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
            value: web3.utils.toHex(web3.utils.toWei("4", 'ether')),
            gasLimit: web3.utils.toHex(21000), //this is how muh a normal transaction like this, consumes gas
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", 'gwei'))
        }
        const tx = new Tx.Transaction(txObject);
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
