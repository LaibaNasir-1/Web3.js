var Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const rpcUrl = "https://ropsten.infura.io/v3/9d3abb594bbb4be99e86186d3d9e87de";
const web3 = new Web3(rpcUrl); 

const account1 = "0x8C91F839D66C21fA5E1edFE603aB8A69cEC8324A";
const privatekey1 = "3f88c028317a13955cbfd6db46c6d89710a7e548dea6f60ce86208ad2a12c31d";

//Now bytecode of the contract will be used to deploy contract
const byteCode = '608060405234801561001057600080fd5b5061012f806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c8063967e6e65146037578063d5dcf127146051575b600080fd5b603d6069565b6040516048919060c2565b60405180910390f35b6067600480360381019060639190608f565b6072565b005b60008054905090565b8060008190555050565b60008135905060898160e5565b92915050565b60006020828403121560a057600080fd5b600060ac84828501607c565b91505092915050565b60bc8160db565b82525050565b600060208201905060d5600083018460b5565b92915050565b6000819050919050565b60ec8160db565b811460f657600080fd5b5056fea2646970667358221220c61df327c3c81f028e9c9d81cedde99cb578ebda1286b795803ca885c579294a64736f6c63430008010033';
const byteCodeBuffer = Buffer.from(byteCode, 'hex');

const privatekey1Buffer = Buffer.from(privatekey1, 'hex');

web3.eth.getTransactionCount(account1, (err, txCount) =>{
    if (err){
        console.log('error',err)
    }
    else{
        const txObject = { 
            nonce: web3.utils.toHex(txCount), //utils have web3 helper methods
            data: byteCodeBuffer,
            gasLimit: web3.utils.toHex(800000), 
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", 'gwei'))
        }
        const tx = new Tx.Transaction(txObject, {chain: 'ropsten', hardfork: 'petersburg'});
        tx.sign(privatekey1Buffer);
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            if(err){
                console.log('error',err)
            }
            else{
                console.log('Transaction Hash: ',txHash)
            }
        }).then(receipt => {
            console.log(receipt);
        });
    }
})
