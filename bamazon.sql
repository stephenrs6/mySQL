DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  dept_name VARCHAR(100) NULL,
  price DECIMAL(10, 2) NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Phone Case", "Accessories", 10, 15), 
("Holy Bible", "Books", 20, 5), 
("Fridge", "Appliances", 2000, 8), 
("Heater", "Appliances", 100, 4), 
("Inception", "Movies", 12, 13), 
("Jacket", "Clothing", 80, 20), 
("Jeans", "Clothing", 40, 25), 
("Table", "Furniture", 150, 17), 
("Chair", "Furniture", 50, 9), 
("Omega Seamaster", "Watches", 5000, 10), 
("Lenovo Laptop", "Electronics", 1000, 20); 


SELECT * FROM products;

SELECT item_id FROM products;



