var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "audirs6",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
        inquirer
            .prompt({
                name: "item_id",
                type: "rawlist",
                message: "What item would you like to buy? Please enter item ID. ",
                choices: item_id
            })
            .then(function (answer) {
                // for (var i = 0; i < res.length; i++) {
                //     if (answer.item_id === res[i].item_id) {
                //         // avail(answer.item_id);
                //         return
                //      }
                // }
                console.log("item does not exist");
                return

            });
            return



}
function selectProducts(item_id){
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res);
        console.log(res);
        var item_id = res.map(function (item) {
            return item.item_id
        });
        console.log(item_id);
    });
};
function purchase(item_id) {
       connection.query(
            "INSERT INTO auctions SET ?",
            {
                item_name: answer.item,
                category: answer.category,
                starting_bid: answer.startingBid,
                highest_bid: answer.startingBid
            },
            function (err) {
                if (err) throw err;
                console.log("Your auction was created successfully!");
                // re-prompt the user for if they want to bid or post
                start();
            }
        );
};


// function to handle posting new items up for auction
// function avail(item_id) {
//     // prompt for info about the item being put up for auction
//     inquirer
//         .prompt(
//             {
//                 name: "quantity",
//                 type: "input",
//                 message: "How much would you like to buy?"
//             },
//         )
//         .then(function (answer) {
//             // when finished prompting, insert a new item into the db with that info
//             connection.query("SELECT stock_quantity FROM products WHERE item_id = " + item_id, 
//                     function (err, res) {
//                     if (err) throw err;
//                     console.log(res);
//                     // re-prompt the user for if they want to bid or post
//                 }
//             );
//         });
// }

// function bidAuction() {
//     // query the database for all items being auctioned
//     connection.query("SELECT * FROM auctions", function (err, results) {
//         if (err) throw err;
//         // once you have the items, prompt the user for which they'd like to bid on
//         inquirer
//             .prompt([
//                 {
//                     name: "choice",
//                     type: "rawlist",
//                     choices: function () {
//                         var choiceArray = [];
//                         for (var i = 0; i < results.length; i++) {
//                             choiceArray.push(results[i].item_name);
//                         }
//                         return choiceArray;
//                     },
//                     message: "What auction would you like to place a bid in?"
//                 },
//                 {
//                     name: "bid",
//                     type: "input",
//                     message: "How much would you like to bid?"
//                 }
//             ])
//             .then(function (answer) {
//                 // get the information of the chosen item
//                 var chosenItem;
//                 for (var i = 0; i < results.length; i++) {
//                     if (results[i].item_name === answer.choice) {
//                         chosenItem = results[i];
//                     }
//                 }

//                 // determine if bid was high enough
//                 if (chosenItem.highest_bid < parseInt(answer.bid)) {
//                     // bid was high enough, so update db, let the user know, and start over
//                     connection.query(
//                         "UPDATE auctions SET ? WHERE ?",
//                         [
//                             {
//                                 highest_bid: answer.bid
//                             },
//                             {
//                                 id: chosenItem.id
//                             }
//                         ],
//                         function (error) {
//                             if (error) throw err;
//                             console.log("Bid placed successfully!");
//                             start();
//                         }
//                     );
//                 }
//                 else {
//                     // bid wasn't high enough, so apologize and start over
//                     console.log("Your bid was too low. Try again...");
//                     start();
//                 }
//             });
//     });
// }
