const express = require('express');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig');
const app = express();
const port = 3001;

app.use(express.json());

// Define a route
app.get('/api/button-action', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    // Perform your SQL queries here
    const result = await connection.execute(`SELECT * FROM your_table`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
