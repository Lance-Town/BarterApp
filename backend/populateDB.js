require("dotenv").config();
const faker = require("faker");
const mysql = require("mysql");

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// Helper function to insert data
const insertData = (query, data) => {
    return new Promise((resolve, reject) => {
        db.query(query, data, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// Populate User Table
const populateUsers = async () => {
    for (let i = 0; i < 10; i++) {
        const email = faker.internet.email();
        const password = faker.internet.password();
        const phone_number = faker.phone.phoneNumber("##########");
        const address = faker.address.streetAddress();
        const access_level = faker.datatype.number({ min: 0, max: 2 });

        const query = `INSERT INTO users (email, password, phone_number, address, access_level) 
                       VALUES (?, ?, ?, ?, ?)`;
        await insertData(query, [
            email,
            password,
            phone_number,
            address,
            access_level,
        ]);
    }
    console.log("Users table populated");
};

// Populate Item Table
const populateItems = async () => {
    for (let i = 0; i < 10; i++) {
        const name = faker.commerce.productName();
        const value = faker.datatype.number({ min: 10, max: 100 });
        const transfer_cost = faker.datatype.number({ min: 1, max: 10 });

        const query = `INSERT INTO Item (name, value, transfer_cost) 
                       VALUES (?, ?, ?)`;
        await insertData(query, [name, value, transfer_cost]);
    }
    console.log("Items table populated");
};

// Populate Partnership Table
const populatePartnerships = async () => {
    for (let i = 0; i < 5; i++) {
        const user1_id = faker.datatype.number({ min: 1, max: 10 });
        const user2_id = faker.datatype.number({ min: 1, max: 10 });

        const query = `INSERT INTO Partnership (user1_id, user2_id) 
                       VALUES (?, ?)`;
        await insertData(query, [user1_id, user2_id]);
    }
    console.log("Partnerships table populated");
};

// Populate Post Table
const populatePosts = async () => {
    for (let i = 0; i < 5; i++) {
        const posting_partnership_id = faker.datatype.number({
            min: 1,
            max: 5,
        });
        const requesting_item_id = faker.datatype.number({ min: 1, max: 10 });
        const requesting_amount = faker.datatype.number({ min: 1, max: 10 });
        const offering_item_id = faker.datatype.number({ min: 1, max: 10 });
        const offering_amount = faker.datatype.number({ min: 1, max: 10 });
        const isNegotiable = faker.datatype.boolean();

        const query = `INSERT INTO Post (posting_partnership_id, requesting_item_id, requesting_amount, offering_item_id, offering_amount, isNegotiable) 
                       VALUES (?, ?, ?, ?, ?, ?)`;
        await insertData(query, [
            posting_partnership_id,
            requesting_item_id,
            requesting_amount,
            offering_item_id,
            offering_amount,
            isNegotiable,
        ]);
    }
    console.log("Posts table populated");
};

// Populate Equivalency Table
const populateEquivalencies = async () => {
    for (let i = 0; i < 5; i++) {
        const item1_id = faker.datatype.number({ min: 1, max: 10 });
        const item2_id = faker.datatype.number({ min: 1, max: 10 });
        const cost_ratio = faker.datatype.float({ min: 0.1, max: 2.0 });

        const query = `INSERT INTO Equivalency (item1_id, item2_id, cost_ratio) 
                       VALUES (?, ?, ?)`;
        await insertData(query, [item1_id, item2_id, cost_ratio]);
    }
    console.log("Equivalency table populated");
};

// Populate all tables
const populateAllTables = async () => {
    try {
        await populateUsers();
        await populateItems();
        await populatePartnerships();
        await populatePosts();
        await populateEquivalencies();
        console.log("Database populated with fake data");
        db.end(); // Close connection
    } catch (err) {
        console.error("Error populating database:", err);
    }
};

populateAllTables();
