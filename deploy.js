const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile.js');

const provider = new HDWalletProvider(
				'antique seek canoe jealous design oil simple misery pact sorry soft artwork', 
				'https://rinkeby.infura.io/v3/63ffec82e5504765b8d21997d29a7b31'
				);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({data:bytecode, arguments:['Hi there!']})
		.send({gas:'1000000', from: accounts[0]})

};

deploy();