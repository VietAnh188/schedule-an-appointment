---------------------------------------------------LECTURE 3------------------------------------------------------------
--3.1/Which products have a standard price of less than 275
SELECT PRODUCT_DESCRIPTION,STANDARD_PRICE
FROM T_PRODUCT
WHERE STANDARD_PRICE<275

--3.2/What is the address of the customer named Home Furnishings? Use an Alias, NAME, for customer name
SELECT CUSTOMER_NAME N'Name',CUSTOMER_ADDRESS
FROM T_CUSTOMER
WHERE CUSTOMER_NAME=N'Home Fumishings'

--3.3/List the unit price, product name, and product ID for all products in the PRODUCT table
SELECT STANDARD_PRICE,PRODUCT_DESCRIPTION,PRODUCT_ID
FROM T_PRODUCT

--3.4/What is the average standard price for each product in inventory?
SELECT AVG(STANDARD_PRICE) N'Average standard price'
FROM T_PRODUCT

--3.5/How many different items were ordered on order number 1004 and what are they?
SELECT P.PRODUCT_DESCRIPTION,COUNT(*) N'Items'
FROM T_ORDER_LINE OL INNER JOIN T_PRODUCT P ON OL.PRODUCT_ID=P.PRODUCT_ID
WHERE ORDER_ID=1004
GROUP BY P.PRODUCT_DESCRIPTION

--3.6/Which orders have been placed since 10/24/2013?
SELECT ORDER_ID
FROM T_ORDER
WHERE ORDER_DATE>='10/24/2013'

--3.7/What furniture does Pine Valley carry that isn’t made of cherry?
SELECT PRODUCT_ID,PRODUCT_DESCRIPTION,PRODUCT_FINISH
FROM T_PRODUCT
WHERE PRODUCT_FINISH!=N'Cherry'

--3.8/List product name, finish, and unit price for all desks and all tables that cost more than 300 in the PRODUCT view
SELECT PRODUCT_DESCRIPTION,PRODUCT_FINISH,STANDARD_PRICE
FROM T_PRODUCT
WHERE PRODUCT_DESCRIPTION LIKE'% desk' OR PRODUCT_DESCRIPTION LIKE'% table' AND STANDARD_PRICE>300

--3.9/List product name, finish, and unit price for all desks and all tables in the PRODUCT view that cost more than 300
SELECT PRODUCT_DESCRIPTION,PRODUCT_FINISH,STANDARD_PRICE
FROM T_PRODUCT
WHERE (PRODUCT_DESCRIPTION LIKE'% desk' OR PRODUCT_DESCRIPTION LIKE'% table') AND STANDARD_PRICE>300

--3.10/Which products in the PRODUCT view have a standard price between 200 and 300? 
SELECT PRODUCT_DESCRIPTION,STANDARD_PRICE
FROM T_PRODUCT
WHERE STANDARD_PRICE>=200 AND STANDARD_PRICE<=300

--3.11/What are the order numbers include in the ORDER-LINE table?
SELECT ORDER_ID
FROM T_ORDER_LINE

--3.12/What are the distinct order numbers include in the ORDER-LINE table?
SELECT DISTINCT ORDER_ID
FROM T_ORDER_LINE

--3.13/WHat are the unique combination of order number and order quantity included in the ORDER_LINE table?
SELECT ORDER_ID,ORDERED_QUANTITY
FROM T_ORDER_LINE

--3.14/List all customers who live in warmer states
SELECT CUSTOMER_NAME,CITY,STATE
FROM T_CUSTOMER
WHERE STATE IN ('FL', 'TX', 'CA', 'HI')

--3.15/List customer, city, and state for all customers in the CUSTOMER view whose address is Florida, Texas, California or Hawaii. List the customer alphabetically by state, and alphabetically by customer within each state
SELECT CUSTOMER_NAME,CITY,STATE
FROM T_CUSTOMER
WHERE STATE IN ('FL', 'TX', 'CA', 'HI')
ORDER BY CUSTOMER_NAME ASC,STATE ASC

--3.16/Count the number of customers with addresses in each to which we ship
SELECT CUSTOMER_ADDRESS,STATE, COUNT(STATE) N'Number customer in area'
FROM T_CUSTOMER
GROUP BY CUSTOMER_ADDRESS,STATE

--3.17/Count the number of customers with addresses in each to which we ship. List the cities by state.
SELECT CUSTOMER_ADDRESS,CITY,STATE, COUNT(STATE) N'Number customer in area'
FROM T_CUSTOMER
GROUP BY CUSTOMER_ADDRESS,CITY,STATE

--3.18/Find only states with more than one customer
SELECT STATE,CITY,COUNT(STATE) N'Number customers'
FROM T_CUSTOMER
GROUP BY STATE,CITY
HAVING COUNT(CUSTOMER_ID) >= 1

--3.19/List the product finish and average standard price for each finish for selected finishes where the average standard price is less than 750
SELECT PRODUCT_FINISH,AVG(STANDARD_PRICE) N'Average price'
FROM T_PRODUCT
GROUP BY PRODUCT_FINISH
HAVING AVG(STANDARD_PRICE)<750

---------------------------------------------------LECTURE 4------------------------------------------------------------
--4.1/What are the names of all customers who have placed orders?
SELECT T_C.CUSTOMER_ID,T_C.CUSTOMER_NAME,T_O.ORDER_ID
FROM T_CUSTOMER T_C INNER JOIN T_ORDER T_O ON T_C.CUSTOMER_ID=T_O.CUSTOMER_ID

--4.2/List customer name, identification number, and order number for all customers listed in the CUSTOMER table. 
--Include the customer identification number and name even if there is no order available for that customer
SELECT DISTINCT T_C.CUSTOMER_NAME,T_C.CUSTOMER_ID,T_O.ORDER_ID
FROM T_CUSTOMER T_C LEFT JOIN T_ORDER T_O ON T_C.CUSTOMER_ID=T_O.CUSTOMER_ID

--4.3/List customer name, identification number, and order number for all order listed in the ORDER table. 
--Include order number even if there is no customer name and identification number available 
SELECT T_C.CUSTOMER_NAME,T_C.CUSTOMER_ID,T_O.ORDER_ID
FROM T_ORDER T_O RIGHT JOIN T_CUSTOMER T_C ON T_O.CUSTOMER_ID=T_C.CUSTOMER_ID

--4.4/What is the name and address of the customer who placed order number 1008?
SELECT T_C.CUSTOMER_NAME,T_C.CUSTOMER_ADDRESS
FROM T_CUSTOMER T_C INNER JOIN T_ORDER T_O ON T_C.CUSTOMER_ID=T_O.CUSTOMER_ID
WHERE T_O.ORDER_ID=1008

--4.5/Which customers have placed orders?
SELECT DISTINCT T_C.CUSTOMER_NAME,T_C.CUSTOMER_ADDRESS
FROM T_CUSTOMER T_C INNER JOIN T_ORDER T_O ON T_C.CUSTOMER_ID=T_O.CUSTOMER_ID
INNER JOIN T_ORDER_LINE T_O_L ON T_O.ORDER_ID=T_O_L.ORDER_ID

--4.6/Assemble all information necessary to create an invoice for order number 1006?
SELECT T_C.CUSTOMER_ID,T_C.CUSTOMER_NAME,T_C.CUSTOMER_ADDRESS,T_O.ORDER_ID,T_P.PRODUCT_ID,T_P.PRODUCT_DESCRIPTION,T_P.STANDARD_PRICE,T_O_L.ORDERED_QUANTITY,T_P.STANDARD_PRICE*T_O_L.ORDERED_QUANTITY N'Total'
FROM T_CUSTOMER T_C INNER JOIN T_ORDER T_O ON T_C.CUSTOMER_ID=T_O.CUSTOMER_ID
INNER JOIN T_ORDER_LINE T_O_L ON T_O.ORDER_ID=T_O_L.ORDER_ID
INNER JOIN T_PRODUCT T_P ON T_O_L.PRODUCT_ID=T_P.PRODUCT_ID
WHERE T_O.ORDER_ID=1006

--4.7/Which customers have not placed any orders for computer desk?
SELECT DISTINCT T_C.CUSTOMER_ID,T_C.CUSTOMER_NAME,T_C.CUSTOMER_ADDRESS
FROM T_CUSTOMER T_C INNER JOIN T_ORDER T_O ON T_C.CUSTOMER_ID=T_O.CUSTOMER_ID
INNER JOIN T_ORDER_LINE T_O_L ON T_O.ORDER_ID=T_O_L.ORDER_ID
INNER JOIN T_PRODUCT T_P ON T_O_L.PRODUCT_ID=T_P.PRODUCT_ID
WHERE T_P.PRODUCT_DESCRIPTION!=N'computer desk'

--4.8/What are the order IDs for all orders that have included furniture finished in natural ash?
SELECT T_O.ORDER_ID,T_P.PRODUCT_DESCRIPTION
FROM T_ORDER T_O INNER JOIN T_ORDER_LINE T_O_L ON T_O.ORDER_ID=T_O_L.ORDER_ID
INNER JOIN T_PRODUCT T_P ON T_O_L.PRODUCT_ID=T_P.PRODUCT_ID
WHERE T_P.PRODUCT_FINISH=N'natural ash'

--4.9/List the details about the product with the highest unit price 
SELECT TOP 1 WITH TIES T_O.ORDER_ID,T_P.PRODUCT_ID,T_P.PRODUCT_DESCRIPTION,T_P.STANDARD_PRICE,T_O_L.ORDERED_QUANTITY,T_P.STANDARD_PRICE*T_O_L.ORDERED_QUANTITY N'Total'
FROM T_ORDER T_O INNER JOIN T_ORDER_LINE T_O_L ON T_O.ORDER_ID=T_O_L.ORDER_ID
INNER JOIN T_PRODUCT T_P ON T_O_L.PRODUCT_ID=T_P.PRODUCT_ID
ORDER BY T_P.STANDARD_PRICE*T_O_L.ORDERED_QUANTITY DESC