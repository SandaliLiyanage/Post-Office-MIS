-- Insert data into Area
INSERT INTO Area (Area_ID, Area_Name) VALUES
(1, 'Colombo'),
(2, 'Kandy'),
(3, 'Mathara');

-- Insert data into Post_Office
INSERT INTO Post_Office (Post_Office_ID, Post_Office_Category_ID, Post_Office_Name, Location, Area_ID, Head_Office_Post_ID) VALUES
(1, 1, 'Main Post Office', '123 Main St', 1, NULL),
(2, 2, 'Sub Post Office', '456 Elm St', 2, 1);

-- Insert data into Employee
INSERT INTO Employee (Employee_ID, Employment_Status, Employee_Name, Employee_Category_ID, Post_Office_ID, Telephone, Email, password) VALUES
(1, 'Active', 'John Doe', 1, 1, '555-1234', 'john.doe@example.com', 'hashedpassword1'),
(2, 'Active', 'Jane Smith', 2, 2, '555-5678', 'jane.smith@example.com', 'hashedpassword2'),
(3, 'Active', 'Emily Davis', 1, 1, '555-8765', 'emily.davis@example.com', 'hashedpassword3'),
(4, 'Active', 'Michael Brown', 1, 2, '555-4321', 'michael.brown@example.com', 'hashedpassword4'),
(5, 'Active', 'Sarah Wilson', 2, 2, '555-9876', 'sarah.wilson@example.com', 'hashedpassword5');

-- Insert data into Sub_Area
INSERT INTO Sub_Area (Sub_Area_ID, Sub_Area_Name, Area_ID) VALUES
(1, 'sub1', 3),
(2, 'sub2', 2);

-- Insert data into Postman
INSERT INTO Postman (Employee_ID, Sub_Area_ID) VALUES
(1, 1),
(2, 2),
(3, 1);

-- Insert data into Address
INSERT INTO Address (Address_ID, Address, Location, Post_Office_ID, Customer_ID) VALUES
(1, '789 Oak St', 'Downtown', 1, 1),
(2, '101 Maple Ave', 'Uptown', 2, 2),
(3, '123 Pine St', 'Suburb', 1, 3),
(4, '456 Cedar St', 'Downtown', 1, 4),
(5, '789 Birch St', 'Uptown', 2, 5);

-- Insert data into Mail_Item_Category
INSERT INTO Mail_Item_Category (Mail_Item_Category_ID, Category_Name, Category_Price_Per1g_Per1km) VALUES
(1, 'Normal Mail', 0.05),
(2, 'Registered Mail', 0.10),
(3, 'Parcel', 0.20);

-- Insert data into Delivery
INSERT INTO Delivery (Delivery_ID, Transaction_ID, Recipient_Address_ID, Recipient_Name) VALUES
(1, 1, 1, 'Alice Johnson'),
(2, 2, 2, 'Bob Brown'),
(3, 3, 3, 'Charlie Green'),
(4, 4, 4, 'Diana Prince'),
(5, 5, 5, 'Eve Adams');

-- Insert data into Mail_Item
INSERT INTO Mail_Item (Mail_Item_ID, Category_ID, Bundle_ID, Delivery_ID, Weight, Price) VALUES
-- Normal Mail
(1, 1, 1, 1, 150.00, 7.50),
(2, 1, 1, 2, 200.00, 10.00),
(3, 1, 1, 3, 250.00, 12.50),
(4, 1, 1, 4, 300.00, 15.00),
(5, 1, 1, 5, 350.00, 17.50),
-- Registered Mail
(6, 2, 1, 1, 150.00, 10.00),
(7, 2, 1, 2, 200.00, 15.00),
(8, 2, 1, 3, 250.00, 20.00),
(9, 2, 1, 4, 300.00, 25.00),
(10, 2, 1, 5, 350.00, 30.00),
-- Parcel
(11, 3, 1, 1, 150.00, 20.00),
(12, 3, 1, 2, 200.00, 25.00),
(13, 3, 1, 3, 250.00, 30.00),
(14, 3, 1, 4, 300.00, 35.00),
(15, 3, 1, 5, 350.00, 40.00);
