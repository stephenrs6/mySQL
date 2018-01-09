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
var item_ids = [];
// function which prompts the user for what action they should take
function start() {
    showInventory();



}
function showInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        var itemExists = false;
        res.forEach(function (value) {
            item_ids.push("" + value.item_id);
        });
        inquirer.prompt({
            name: "item_id",
            type: "rawlist",
            message: "What item would you like to buy? Please enter item ID. ",
            choices: item_ids
        })
            .then(function (answer) {
                for (var i = 0; i < res.length; i++) {
                    if (answer.item_id == res[i].item_id) {
                        console.log(res[i].product_name);
                        itemExists = true;
                        avail(answer.item_id);
                    }
                    
                }
                if (!itemExists) console.log("item does not exist");
            }).catch(function (err) {
                console.log(err);
            });
    });
}
function purchase(id, purchaseQuantity, originalQuantity, price) {
    var newStockQuantity = originalQuantity - purchaseQuantity;
    connection.query(
        "UPDATE products SET stock_quantity= " + newStockQuantity + " WHERE item_id = " + id,
        function (err) {
            if (err) throw err;
            console.log("Your purchase was successful!");
            console.log("Your total is: $" + purchaseQuantity * price + ".");
            // re-prompt the user for if they want to buy again
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                console.table(res);
            });
        }
    );
};
function avail(item_id) {
    inquirer
        .prompt(
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        },
    )
        .then(function (answer) {
            connection.query("SELECT stock_quantity, price FROM products WHERE item_id = " + item_id,
                function (err, res) {
                    if (err) throw err;
                    if (parseInt(answer.quantity) > parseInt(res[0].stock_quantity)) {
                        console.log("Not enough stock! Please enter quantity fewer than " + res[0].stock_quantity + ".");
                    }
                    else {
                        purchase(parseInt(item_id), parseInt(answer.quantity), parseInt(res[0].stock_quantity), parseInt(res[0].price));
                    }

                }
            );
        });
}

