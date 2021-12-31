import { ChainId, Token, Fetcher, WETH, Route, TradeType, TokenAmount, Trade, address } from "@uniswap/sdk";
import Web3 from 'web3';


//IMPORTANTE, simpre al usar esta clase ejecutar la funcion web3Connect()
export default class UniSwap {

	constructor() {
    		this.web3 = '';
	   		this.web3Account = false
  	}

  	//esta fucion se usa para conectar con web3 rellena los datos de (this.web3, this.web3Account)
    async web3Connect (){
		//nos guiamos por el eip para preguntar primero si hay un proveedor de la red de eth
		var account;
   		if(window.ethereum){
			var web3;
			//si existe este proveedor, ej meta mask. creamos eel objeto web3 para usarlo luego
			try {
				this.web3 = new Web3(Web3.givenProvider);
  
			}
			catch (e) {
			  	alert('error al conectar con su proveedor de web3')
			  	return
			}

		
			//esperamos a que traiga la cuenta del usuario
			await this.web3.eth.getAccounts(function(err, accounts) {
				account = true

				if (err != null) {
					alert("Error retrieving accounts.");
					account = false
				}

				if (accounts.length == 0) {


					account = false
				}

				if(account){
					account = accounts[0];
				}

			});

			//si trae la cuenta la seteamos como default en web3 para usar posteriormente los contratos con este objeto
			// y agregamos a web3Account el valor de la cuenta correspondiente
			if(account){
				
				this.web3.eth.defaultAccount = account;
				this.web3Account = account
			}else {
				
				await window.ethereum.request({ method: 'eth_requestAccounts' }).then(function(value){

					account = value[0]

				}, function(reason) {

					account = false

				});
				
				this.web3Account = account
			}

		}else{

			this.web3Account = false
			 
		}

   	}


	static async prices() {

		// const url = 'ADD_YOUR_ETHEREUM_NODE_URL';
		const chainId = ChainId.ROPSTEN;
		const tokenAddress = "0xad6d458402f60fd3bd25163575031acdce07538d"; // dai

		const dai = await Fetcher.fetchTokenData(chainId, tokenAddress);
		const weth = WETH[chainId];
		const pair = await Fetcher.fetchPairData(dai, weth);
		const route = new Route([pair], weth);
		const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);

		return '1 WETH = ' + route.midPrice.toSignificant(6) + ' DAI'
		// console.log("Mid Price WETH --> DAI:", route.midPrice.toSignificant(6));
		// console.log("Mid Price DAI --> WETH:", route.midPrice.invert().toSignificant(6));
		// console.log("-".repeat(45));
		// console.log("Execution Price WETH --> DAI:", trade.executionPrice.toSignificant(6));
		// console.log("Mid Price after trade WETH --> DAI:", trade.nextMidPrice.toSignificant(6));
	}
	//realiza el swap

	async swap(){

		const chainId = ChainId.ROPSTEN;
		const tokenAddress = "0xad6d458402f60fd3bd25163575031acdce07538d"; // dai
		const tokenAddress2 = "0x110a13fc3efe6a245b50102d2d79b3e76125ae83"; // usdt

		// note that you may want/need to handle this async code differently,
		// for example if top-level await is not an option
		// const DAI: Token = await Fetcher.fetchTokenData(chainId, tokenAddress);
		const DAI 	= await Fetcher.fetchTokenData(chainId, tokenAddress);
		DAI.symbol 	= "DAI"
		DAI.name 	= "Dai Stablecoin"

		const USDT 	= await Fetcher.fetchTokenData(chainId, tokenAddress2);
		USDT.symbol = "USDT"
		USDT.name 	= "USDT Stablecoin"

		const DAIUSDT = await Fetcher.fetchPairData(DAI, USDT);
		var DAIpair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
		var USDTpair = await Fetcher.fetchPairData(USDT, WETH[DAI.chainId]);


		const buyUSDTinDAI = await new Route([DAIUSDT], USDT);

	  	var tokenAmount = await new TokenAmount(USDT, "2000000000000000000");

	  	console.log(buyUSDTinDAI)

	    const trade = new Trade(buyUSDTinDAI, tokenAmount, TradeType.EXACT_INPUT);
	  	console.log(trade)


		// const trade = new Trade(
		//   NOT_TO_HOT,
		//   new TokenAmount(NOT, "1000000000000000"),
		//   TradeType.EXACT_INPUT
		// );

		console.log(buyUSDTinDAI.midPrice.toSignificant(6)); // cantidad de tokens dai para comprar  un usdt
		console.log(buyUSDTinDAI.midPrice.invert().toSignificant(6)); // cantidad de tokens usdt al vender dai


		if(this.web3Account){



			var contractAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
			var abi = JSON.parse( '[{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]' );

			//contract instance
			var contract = new this.web3.eth.Contract(abi, contractAddress);


			

			var path = [];
			
			path[0] = DAI.address;
			path[1] = USDT.address;

			var minutesToAdd=30;
			var currentDate = new Date();
			var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

			var amountIn = 1
			var amountOutMin = parseInt(((buyUSDTinDAI.midPrice.invert().toSignificant(6) * amountIn) * 0.9) * Math.pow(10, USDT.decimals))

			// amountIn = amountIn * Math.pow(10, DAI.decimals)
			amountOutMin = 0
			var block = await this.web3.eth.getBlock('latest');
			console.log(amountIn, amountOutMin, path, this.web3Account, futureDate.getTime())
			contract.methods.swapExactTokensForTokens(amountIn, amountOutMin, path, this.web3Account, futureDate.getTime()).estimateGas({from: this.web3Account})
			.then(function(gasAmount){
				console.log(gasAmount)
				return 'ok'
			})
			.catch(function(error){
				console.log(error)
			});

		}
		return 'nok'

	}
}
