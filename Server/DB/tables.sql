-- Table: Area
CREATE TABLE Area (
    Area_ID INT PRIMARY KEY,
    Area_Name VARCHAR(100)
);

-- Table: Post_Office
CREATE TABLE Post_Office (
    Post_Office_ID INT PRIMARY KEY,
    Post_Office_Category_ID INT,  
    Post_Office_Name VARCHAR(100),
    Location VARCHAR(255),
    Area_ID INT,
    Head_Office_Post_ID INT, 
    FOREIGN KEY (Area_ID) REFERENCES Area(Area_ID)
);

-- Table: Employee
CREATE TABLE Employee (
    Employee_ID INT PRIMARY KEY,
    Employment_Status VARCHAR(50),
    Employee_Name VARCHAR(100),
    Employee_Category_ID INT,
    Post_Office_ID INT,
    Telephone VARCHAR(15),
    Email VARCHAR(100),
    password VARCHAR(255),
    FOREIGN KEY (Post_Office_ID) REFERENCES Post_Office(Post_Office_ID)
);

-- Table: Sub_Area
CREATE TABLE Sub_Area (
    Sub_Area_ID INT PRIMARY KEY,
    Sub_Area_Name VARCHAR(100),
    Area_ID INT,
    FOREIGN KEY (Area_ID) REFERENCES Area(Area_ID)
);

-- Table: Postman
CREATE TABLE Postman (
    Employee_ID INT,
    Sub_Area_ID INT,
    PRIMARY KEY (Employee_ID, Sub_Area_ID),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID),
    FOREIGN KEY (Sub_Area_ID) REFERENCES Sub_Area(Sub_Area_ID)
);

-- Table: Address
CREATE TABLE Address (
    Address_ID INT PRIMARY KEY,
    Address VARCHAR(255),
    Location VARCHAR(255),
    Post_Office_ID INT,
    Customer_ID INT,
    FOREIGN KEY (Post_Office_ID) REFERENCES Post_Office(Post_Office_ID)
);

-- Table: Mail_Item_Category
CREATE TABLE Mail_Item_Category (
    Mail_Item_Category_ID INT PRIMARY KEY,
    Category_Name VARCHAR(100),
    Category_Price_Per1g_Per1km DECIMAL(10, 2) 
);

-- Table: Delivery
CREATE TABLE Delivery (
    Delivery_ID INT PRIMARY KEY,
    Transaction_ID INT,
    Recipient_Address_ID INT,
    Recipient_Name VARCHAR(100),
    FOREIGN KEY (Recipient_Address_ID) REFERENCES Address(Address_ID)
);

-- Table: Mail_Item
CREATE TABLE Mail_Item (
    Mail_Item_ID INT PRIMARY KEY,
    Category_ID INT,
    Bundle_ID INT, 
	Delivery_ID INT,
    Weight DECIMAL(10, 2),
    Price DECIMAL(10, 2),
    FOREIGN KEY (Delivery_ID) REFERENCES Delivery(Delivery_ID),
	FOREIGN KEY (Category_ID) REFERENCES Mail_Item_Category(Mail_Item_Category_ID)
);
