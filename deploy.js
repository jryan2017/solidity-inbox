const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const keysConfig = require('./keysConfig');

const provider = new HDWalletProvider(
    keysConfig.mnemonic,
    keysConfig.rinkebyKey
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] });
        
    // Why don't I need this line below?  Maybe it was fixed in a package or maybe HDWallerProvider takes care of it
    // result.setProvider(provider);
        
    console.log('Contract deployed to', result.options.address);
};
deploy();