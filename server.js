const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react-crud",
});

app.post('/create', (request, response) => {
    const { item_name, price, category, quantity } = request.body;
    const sql = 'INSERT INTO items (item_name, price, category, quantity) VALUES (?, ?, ?, ?)';
    db.query(sql, [item_name, price, category, quantity], (error, result) => {
        if (error) throw error;
        response.send('Item Added Successfully');
    });
});

// app.post('/edit', (request, response) => {
//     const { item_id, item_name, price, category, quantity } = request.body;
//     const sql = 'UPDATE items SET item_name = ?, price = ?, category = ?, quantity = ? WHERE item_id = ?';
//     db.query(sql, [item_name, price, category, quantity, item_id], (error, result) => {
//         if (error) throw error;
//         response.send('Item Updated Successfully');
//     });
// });

app.delete('/items/:id', (request, response)=>{
    const id = request.params.id;
    const sql = 'DELETE FROM items WHERE item_id = ?';
    db.query(sql, [id], (error, result) => {
        if(error) throw error;
        response.send("Items Deleted");
    });
});

app.put('/edit/:id', (request, response) => {
    const id = request.params.id;
    const { item_name, price, category, quantity } = request.body;
    const sql = 'UPDATE items SET item_name = ?, price = ?, category = ?, quantity = ? WHERE item_id = ?';
    
    db.query(sql, [item_name, price, category, quantity, id], (error, result) => {
        if (error) {
            console.error("Error updating item:", error);
            return response.status(500).json({ error: "Internal Server Error" });
        }

        if (result.affectedRows === 0) {
            // No rows were affected, meaning the item with the given ID was not found
            return response.status(404).json({ error: "Item not found" });
        }

        response.send('Item Updated');
    });
});


app.get('/edit/:id', (request, response) => {
    const id = request.params.id;
    const sql = 'SELECT * FROM items WHERE item_id = ?';
    
    db.query(sql, [id], (error, data) => {
        if (error) {
            console.error("Error fetching item:", error);
            return response.status(500).json({ error: "Internal Server Error" });
        }

        if (data.length === 0) {
            // No data returned, meaning the item with the given ID was not found
            return response.status(404).json({ error: "Item not found" });
        }

        response.json(data[0]);
    });
});


app.get('/users', (request, response)=>{
    const sql = "SELECT * FROM user";
    db.query(sql, (error, data)=>{
        if(error) return response.json(error);
        return response.json(data);
    });
});

app.get('/items', (request, response)=>{
    const sql = "SELECT * FROM items";
    db.query(sql, (error, data)=>{
        if(error) return response.json(error);
        return response.json(data);
    })
});


app.get('/tbl_user', (request, response)=>{
    const sql = "SELECT * FROM tbl_user";
    db.query(sql, (error, data)=>{
        if(error) return response.json(error);
        return response.json(data);
    })
});

app.get('/', (request, response)=>{
    return response.json("The server started");
});

app.listen(8081, () => {
    console.log("listening..");
});

app.post('/register', async (request, response) => {
  const { name, email, password } = request.body;

  try {
      // Check if the email already exists in the database
      const checkEmailQuery = 'SELECT * FROM tbl_user WHERE email = ?';
      db.query(checkEmailQuery, [email], (checkError, checkResult) => {
          if (checkError) {
              console.error('Error checking email:', checkError);
              return response.status(500).send('Internal Server Error');
          }

          if (checkResult.length > 0) {
              // Email already exists
              return response.status(409).send('Email already in use');
          }

          // Email does not exist, proceed with user registration
          bcrypt.hash(password, saltRounds, (hashError, hashedPassword) => {
              if (hashError) {
                  console.error('Error hashing password:', hashError);
                  return response.status(500).send('Internal Server Error');
              }

              const insertUserQuery = 'INSERT INTO tbl_user (name, email, password) VALUES (?, ?, ?)';
              db.query(insertUserQuery, [name, email, hashedPassword], (insertError, insertResult) => {
                  if (insertError) {
                      console.error('Error inserting user:', insertError);
                      return response.status(500).send('Internal Server Error');
                  }

                  response.send('Register Successfully');
              });
          });
      });
  } catch (error) {
      console.error('Error:', error);
      response.status(500).send('Internal Server Error');
  }
});


  app.get('/getUserId/:id', (req, res) => {
    const userId = req.params.id;
  
    const getUserIdQuery = 'SELECT id FROM users WHERE id = ?';
  
    db.query(getUserIdQuery, [userId], (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
      }
  
      if (result.length === 0) {
        return res.status(404).send('User not found');
      }
  
      const fetchedUserId = result[0].id;
      res.json({ user_id: fetchedUserId });
    });
  });


  app.post('/login', async (request, response) => {
    const { email, password } = request.body;
  
    try {
      // Retrieve the hashed password and user ID from the database based on the email
      const sql = 'SELECT * FROM tbl_user WHERE email = ?';
      db.query(sql, [email], async (error, results) => {
        if (error) throw error;
  
        if (results.length > 0) {
          const user = results[0];
  
          // Compare the entered password with the hashed password from the database
          const passwordMatch = await bcrypt.compare(password, user.password);
  
          if (passwordMatch) {
            // Passwords match, user is authenticated
            response.json({
              message: 'Login Successful',
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          } else {
            // Passwords do not match, authentication failed
            response.status(401).send('Invalid Credentials');
          }
        } else {
          // No user found with the provided email
          response.status(401).send('Invalid Credentials');
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      response.status(500).send('Internal Server Error');
    }
  });
  