const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
import { Embed, TextChannel } from "discord.js";
import {
  WebsocketClient,
  API_ERROR_CODE,
  APIMarket,
  LinearClient,
  LinearPositionIdx,
} from "bybit-api";
import { channel } from "diagnostics_channel";
import { createChart } from "lightweight-charts";

const csv = require("csv-parser");
require("dotenv").config();
var csvWriter = require("csv-write-stream");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const key = process.env.BYBIT_KEY;
const secret = process.env.BYBIT_SECRET;

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async (interaction: { isChatInputCommand: () => any; commandName: any; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: false });
	}
});

var wsClient = new WebsocketClient({
  key: key,
  secret: secret,
  // USDT Perps
  market: "linear",
  // Inverse Perps
  // market: 'inverse',
  pongTimeout: 60000,
  // Spot
  // market: 'spotv3',
  testnet: false,
});
var writer = csvWriter;
var balancew: number;
wsClient.on("update", ({ data }) => {
  console.log(data);
  if (data[0].symbol != undefined) {
    var symbol = data[0].symbol;
  }
  if (data[0].entry_price != undefined) {
    var entry_price = data[0].entry_price;
  }
  if (data[0].leverage != undefined) {
    var leverage = data[0].leverage;
  }
  if (data[0].leverage != undefined) {
    var leverage = data[0].leverage;
  }
  if (data[0].position_margin != undefined) {
    var position_margin = data[0].position_margin;
  }
  if (data[0].take_profit != undefined) {
    var take_profit = data[0].take_profit;
  }
  if (data[0].stop_loss != undefined) {
    var stop_loss = data[0].stop_loss;
  }
  if (data[0].side != undefined) {
    var side = data[0].side;
  }
  if (data[0].realised_pnl != undefined) {
    var realised_pnl = data[0].realised_pnl;
  }
  if (data[0].position_value != undefined) {
    var position_value = data[0].position_value;
  }
  if (data[0].trade_time != undefined) {
    var trade_time = data[0].trade_time;
    console.log(data[0].trade_time);

  }
  if (data[0].cum_realised_pnl != undefined) {
    var cum_realised_pnl = data[0].cum_realised_pnl;
    console.log(data[0].cum_realised_pnl);
  }
  if (data[0].wallet_balance != undefined) {
    var wallet_balance = data[0].wallet_balance;
    console.log(data[0].wallet_balance);
  }
  console.log(trade_time);
  console.log(data);

  if (wallet_balance != undefined ) {
     balancew = wallet_balance;

    if (!fs.existsSync("out.csv"))
      writer = csvWriter({ headers: ["Date", "Balance"] });
    else writer = csvWriter({ sendHeaders: false });

    writer.pipe(fs.createWriteStream("out.csv", { flags: "a" }));
    writer.write({ header1: Date.now(), header2: wallet_balance });
    writer.end();
    const wallet = new EmbedBuilder()
.setTitle("Wallet")
.setDescription("Account Balance: " + '\n' + balancew)
.setThumbnail('https://cdn-icons-png.flaticon.com/512/2489/2489756.png');
(client.channels.cache.get("1014468301759463525") as TextChannel).send({
  embeds: [ wallet],
  });
  (client.channels.cache.get("948413493453942809") as TextChannel).send({
    embeds: [ wallet],
    });
    (client.channels.cache.get("1019394720717344838") as TextChannel).send({
      embeds: [wallet],
    });
  }




 

  const file = new AttachmentBuilder("../assets/discordjs.png");
  
  if(symbol != undefined && position_margin != 0 && position_margin != undefined){
    if(side == "Buy"){
    
  const exampleEmbed2 = new EmbedBuilder()
    .setTitle("New Position")
    .setDescription(symbol + "\n" + "Trade Price:" +"\n" +  (position_value/leverage) +"\n" + "Leverage:" +"\n" +  leverage + "\n" + "Long" + "\n" + "TP:" +"\n" + take_profit + "\n" + "SL:" + "\n" + stop_loss +"\n"+ "Cumulative P n L" + '\n' + cum_realised_pnl)
    .setThumbnail('https://static-00.iconduck.com/assets.00/rocket-emoji-512x511-vueorwt7.png');

   
  
  (client.channels.cache.get("1014468301759463525") as TextChannel).send({
    embeds: [exampleEmbed2],
  });
  (client.channels.cache.get("948413493453942809") as TextChannel).send({
    embeds: [exampleEmbed2],
  });
  (client.channels.cache.get("1019394720717344838") as TextChannel).send({
    embeds: [exampleEmbed2],
  });
};


 if(side != "Buy"){
  const exampleEmbed2 = new EmbedBuilder()
  .setTitle("New Position")
  .setDescription(symbol + "\n" + "Trade Price:" +"\n" +  (position_value/leverage) +"\n" + "Leverage:" +"\n" +  leverage + "\n" + "Short" + "\n" + "TP:" +"\n" + take_profit + "\n" + "SL:" + "\n" + stop_loss +"\n"+ "Cumulative P n L" + '\n' + cum_realised_pnl)
  .setThumbnail('https://static-00.iconduck.com/assets.00/chart-with-downwards-trend-emoji-512x512-fqes3tm6.png');

  
(client.channels.cache.get("1014468301759463525") as TextChannel).send({
  embeds: [exampleEmbed2],
  });
  (client.channels.cache.get("948413493453942809") as TextChannel).send({
    embeds: [exampleEmbed2],
    });
    (client.channels.cache.get("1019394720717344838") as TextChannel).send({
      embeds: [exampleEmbed2],
    });


};


};


if(symbol != undefined && position_margin == 0 && position_margin != undefined){
  if(side == "Buy"){
  
const exampleEmbed2 = new EmbedBuilder()
  .setTitle("Close Position")
  .setDescription(symbol + "\n" + "Realized P n L" + '\n' + realised_pnl + "\n" + "Cumulative P n L" + '\n' + cum_realised_pnl)
  .setThumbnail('https://static-00.iconduck.com/assets.00/rocket-emoji-512x511-vueorwt7.png');



(client.channels.cache.get("1014468301759463525") as TextChannel).send({
  embeds: [exampleEmbed2],
});
(client.channels.cache.get("948413493453942809") as TextChannel).send({
  embeds: [exampleEmbed2],
});
(client.channels.cache.get("1019394720717344838") as TextChannel).send({
  embeds: [exampleEmbed2],
});
};


if(side != "Buy"){
const exampleEmbed2 = new EmbedBuilder()
.setTitle("Close Position")
.setDescription(symbol + "\n" + "Realized P n L" + '\n' + realised_pnl + "\n" + "Cumulative P n L" + '\n' + cum_realised_pnl)
.setThumbnail('https://static-00.iconduck.com/assets.00/chart-with-downwards-trend-emoji-512x512-fqes3tm6.png');



(client.channels.cache.get("1014468301759463525") as TextChannel).send({
  embeds: [exampleEmbed2],
});
(client.channels.cache.get("948413493453942809") as TextChannel).send({
  embeds: [exampleEmbed2],
});
(client.channels.cache.get("1019394720717344838") as TextChannel).send({
  embeds: [exampleEmbed2],
});


};

};





});
wsClient.on("open", ({ wsKey, event }) => {
  console.log("connection open for websocket with ID: " + wsKey);
});

wsClient.on("response", (data) => {
  console.log(data);
});
wsClient.on("reconnect", ({ wsKey }) => {
  console.log("ws automatically reconnecting.... ", wsKey);
});
wsClient.on("reconnected", (data) => {
  console.log("ws has reconnected ", data?.wsKey);
});
wsClient.on("update", (data) => {
  console.log(data);
});

// subscribe to private endpoints
wsClient.subscribe(["position", "wallet", "execution", "order"]);









client.login(process.env.DISCORD_TOKEN);

