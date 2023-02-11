const {
  default: queryDeployment,
} = require("@openzeppelin/cli/lib/scripts/query-deployment");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const newman = require("newman"); // require newman in your project
var account;
var totalBalnce = "";
var availableBalance= "";
var amountInOrders= "";
var totalWalletBalance= "";
var unrealizedPnL= "";
var cumulativeRealizedPnL= "";
// newman
//       .run({
//         collection: require("../QuickStartWithPostman/Bybit USDT_Perp for Newman.postman_collection.json"),
//         environment: require("../QuickStartWithPostman/BybitMainnet.postman_environment.json"),
//         reporters: "json",
//       })
//       .on("start", function(err, args) {
//         // on start of run, log to console
//         console.log("running a collection...");
//       })
//       .on("done", function(err, summary) {
//         summary.run.executions.forEach((exec) => {
//           console.log("Request name:", exec.item.name);
//           var wallet = JSON.parse(exec.response.stream);
//           console.log(wallet.result.USDT);

//           totalBalnce = wallet.result.USDT.equity;
//           availableBalance = wallet.result.USDT.available_balance;
//           amountInOrders = wallet.result.USDT.used_margin;
//           totalWalletBalance = wallet.result.USDT.wallet_balance;
//           unrealizedPnL = wallet.result.USDT.unrealised_pnl;
//           cumulativeRealizedPnL = wallet.result.USDT.cum_realised_pnl;
//           console.log(totalBalnce + "hope");
//         });
//       });
module.exports = {
  
  data: new SlashCommandBuilder()
    .setName("account")
    .setDescription("Shows the current stats on the Bybit account."),

    
  async execute(interaction) {
    // call newman.run to pass `options` object and wait for callback
   
    newman
      .run({
        collection: require("../QuickStartWithPostman/Bybit USDT_Perp for Newman.postman_collection.json"),
        environment: require("../QuickStartWithPostman/BybitMainnet.postman_environment.json"),
        reporters: "json",
      })
      .on("start", function(err, args) {
        // on start of run, log to console
        console.log("running a collection...");
      })
      .on("done", function(err, summary) {
        summary.run.executions.forEach((exec) => {
          console.log("Request name:", exec.item.name);
          var wallet = JSON.parse(exec.response.stream);
          console.log(wallet.result.USDT);

          totalBalnce = wallet.result.USDT.equity;
          availableBalance = wallet.result.USDT.available_balance;
          amountInOrders = wallet.result.USDT.used_margin;
          totalWalletBalance = wallet.result.USDT.wallet_balance;
          unrealizedPnL = wallet.result.USDT.unrealised_pnl;
          cumulativeRealizedPnL = wallet.result.USDT.cum_realised_pnl;
          console.log(totalBalnce + "hope");
        });
      });
      console.log(totalBalnce + "hope");
    console.log(account);
    await interaction.reply(
      "Account Balance: " +
        "\n" +
        "``` " +
        "\n" +
        totalBalnce+
        "```" +
        "\n" +
        "Available Balance: " +
        "\n" +"``` " +
        "\n" +
        availableBalance +"```"+
        "\n" +
        "Amount in Orders: " +
        "\n" +"``` "+
        "\n"+
        amountInOrders +"```"+
        "\n" +
        "Total Ammount in Account:" +
        "\n" +"``` "+
        "\n"+
        totalWalletBalance +"```"+
        "\n" +
        "Unrealized Profit and Loss: " +
        "\n" +"``` "+
        "\n"+
        unrealizedPnL +"```"+
        "\n" +
        "Cumulative Realized Profit and Loss: " +
        "\n" +"``` "+
        "\n"+
        cumulativeRealizedPnL+"```"
    );
  },
};
