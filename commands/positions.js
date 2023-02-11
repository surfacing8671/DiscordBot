const {
	default: queryDeployment,
  } = require("@openzeppelin/cli/lib/scripts/query-deployment");
  const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
  const newman = require("newman"); // require newman in your project
  const text = [];
  var symbol= "";
   var pValue;
   var leverage;
   var realizedPnL;
   var unrealizedPnL;
   var cumPnL;
  module.exports = {
  
	data: new SlashCommandBuilder()
	  .setName("positions")
	  .setDescription("Shows the current open positions on the Bybit account."),
  
	  
	async execute(message) {
	  // call newman.run to pass `options` object and wait for callback
	 
	  newman.run({
		collection: require('../QuickStartWithPostman/newmanVersion/Bybit_futures_position.json'),
		environment: require('../QuickStartWithPostman/BybitMainnet.postman_environment.json'),
		reporters: 'json'
	}).on('start', function (err, args) { // on start of run, log to console
		console.log('running a collection...');
	}).on('done', function (err, summary) {
		summary.run.executions.forEach(exec => {
			console.log('Request name:', exec.item.name);
			var position = JSON.parse(exec.response.stream);
		   
			console.log(position.result[0].data.symbol);
			j = 0;
				for(i = 0; i < position.result.length; i++){
					if(position.result[i].data.size != 0){
						symbol = position.result[i].data.symbol;
						pValue = position.result[i].data.position_value;
						leverage = position.result[i].data.leverage;
						realizedPnL = position.result[i].data.realised_pnl;
						unrealizedPnL = position.result[i].data.unrealised_pnl;
						cumPnL = position.result[i].data.cum_realised_pnl;
						text[j]= ("Current Open Trade Positions:" + "\n" +
						"Symbol:" + "\n" + "```" + symbol + "```" + "\n" +
						"Order size:" + "\n" + "```" + (pValue/leverage) + "```" +"\n" +
						"Realized PnL:" + "\n" + "```" + realizedPnL + "```" +"\n" +
						"Unrealized PnL:" + "\n" + "```" + unrealizedPnL + "```" +"\n" + 
						"cumulative PnL:" + "\n" + "```" + cumPnL + "```" );
						console.log(text[j]);
						j++;
						
					}
					
				}
				
		   
			
	
	
	
		});
			
	
	
	
	});
	
	
	
		
	
	  for(i=0; i<= text.length; i++){
		
	  await message.channel.send( text[i] );
	
			
		
	 
	  };
	},
  };