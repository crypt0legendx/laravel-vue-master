import { TokenFactoryPublic, UniswapPair, ChainId } from 'simple-uniswap-sdk';
import Web3 from 'web3';

async function uniswap(accounts){

	
	var account = accounts.result[0]

	// var tokenContractAddress = '0x110a13fc3efe6a245b50102d2d79b3e76125ae83'; //usdt
	// // console.log(ChainId)
	// var tokenFactoryPublic = new TokenFactoryPublic(tokenContractAddress, {
	//   chainId: ChainId.ROPSTEN,
	//   // you can pass in the provider url as well if you want
	//   // providerUrl: YOUR_PROVIDER_URL,
	// });
	console.log(account)
	var ethereumAddress = account;

	// var balanceOf = await tokenFactoryPublic.balanceOf(ethereumAddress);
	// console.log('balanceOf ->');
	// '0x09195731e2ce35eb000000';

	const uniswapPair = new UniswapPair({
	    // // the contract address of the token you want to convert FROM
	    // fromTokenContractAddress: tokenContractAddress,

	    // // the contract address of the token you want to convert TO
	    // toTokenContractAddress: '0xad6d458402f60fd3bd25163575031acdce07538d',//dai
	    // // the ethereum address of the user using this part of the dApp
	    // ethereumAddress: ethereumAddress,
	    // // you can pass in the provider url as well if you want
	    // // providerUrl: YOUR_PROVIDER_URL,
	    // // OR if you want to inject your own ethereum provider (no need for chainId if so)
	    // // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,





		    // the contract address of the token you want to convert FROM
	    fromTokenContractAddress: '0x110a13fc3efe6a245b50102d2d79b3e76125ae83',
	    // the contract address of the token you want to convert TO
	    toTokenContractAddress: '0xad6d458402f60fd3bd25163575031acdce07538d',
	    // the ethereum address of the user using this part of the dApp
	    ethereumAddress: ethereumAddress,
	    // you can pass in the provider url as well if you want
	    // providerUrl: YOUR_PROVIDER_URL,
	    // OR if you want to inject your own ethereum provider (no need for chainId if so)
	    // ethereumProvider: YOUR_WEB3_ETHERS_OR_CUSTOM_ETHEREUM_PROVIDER,
	    chainId: ChainId.ROPSTEN
	});

	const uniswapPairFactory = await uniswapPair.createFactory();

	const web3 = new Web3(uniswapPairFactory.providerUrl);
	 web3.eth.defaultAccount = ethereumAddress;
	  // the amount is the proper entered amount
	  // so if they enter 10 pass in 10
	  // it will work it all out for you
	const trade = await uniswapPairFactory.trade('10', '0xC2662B6fD17a4d30DD6B14176D40C75119d5A7fa' );

	if (!trade.fromBalance.hasEnough) {
	throw new Error('You do not have enough from balance to execute this swap');
	}

	console.log(trade)
	var transactionParameters = trade.transaction
	console.log(transactionParameters)

	if (transactionParameters) {
		// web3.eth.signTransaction(transactionParameters).then(console.log);
		resp  = await web3.eth.sign(transactionParameters, ethereumAddress)
		console.log(resp)
	// const signedTransaction = await web3.eth.accounts.signTransaction(
	//   transactionParameters,
	//   ethereumAddress
	// );
	// console.log(signedTransaction)
	

	// web3.eth
	//   .sendSignedTransaction(signedTransaction.rawTransaction)
	//   .once('transactionHash', (transactionHash) => {
	//     console.log('approved txHash', transactionHash);
	//   })
	//   .once('receipt', async (receipt) => {
	//     console.log('approved receipt', receipt);
	//     await executeTrade(web3, trade);
	//   })

	}
}

async function connect() {
	// preguntamos si el proveedor esta definido
	if(window.ethereum){
		try {

			//le decimos al proveedor de ethereum que nos traiga las cuentas del usuario
			//mientras tanto mostramos un load
		    const accounts = await window.ethereum.send('eth_requestAccounts');
		    // console.log(accounts.privateKey)
			uniswap(accounts)

		} catch (error) {
			console.log('asd')
			alert('Ocurrio un error al obtener la cuenta.')
		}

	}else {
			console.log('asd2')

		alert('No se encontro un proveedor de la red ethereum.')
	}
}
connect();