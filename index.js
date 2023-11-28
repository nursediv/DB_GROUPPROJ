// Import necessary modules
const express = require('express');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig'); 

// Initialize the Express app
const app = express();
const port = 3001; 

// Middleware to parse JSON bodies
app.use(express.json());

// API endpoint for the button action
app.get('/api/button-action', async (req, res) => {
    let connection;

    try {
        // Establish a connection to the Oracle database
        connection = await oracledb.getConnection(dbConfig);

        // Example query - modify according to your database schema
        const result = await connection.execute(`SELECT * FROM your_table`);

        // Send the query results as a response
        res.json(result.rows);
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).send("Error occurred while accessing the database.");
    } finally {
        // Close the database connection
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

