const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile.js');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({data : bytecode, arguments : [INITIAL_STRING]})
		.send({from : accounts[0], gas:1000000});
});

describe('Inbox', () => {
	it('Deploys a contract', () => {
		assert.ok(inbox.options.address);
	});

	it('Has a default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Hi there!');
	});

	it('Can change the message', async () => {
		await inbox.methods.setMessage('Bye').send({from: accounts[0]});
		
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Bye');
	});
});