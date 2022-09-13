// const test = require('dotenv').config()
const mysql = require("mysql2");

const Unique  = require('uuid').v4()
require('dotenv').config()
let db_URL = process.env.DATABASE_URL;
const connection = mysql.createConnection(db_URL);

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("successfully connected 👍👍");
});

async function getAll(onRowsReceived) {
  const query_string = `SELECT * FROM Users`;
  connection.query(query_string, (err, rows) => {
    if (err) {
      return onRowsReceived(err);
    }
    return onRowsReceived(null, rows);
  });
}
async function getOne(id, onRowsReceived) {
  const query_string = `SELECT * FROM Users WHERE id=${id}`;
  connection.query(query_string, (err, rows) => {
    if (err) {
      return onRowsReceived(err);
    }
    return onRowsReceived(null, rows);
  });
}

async function createNewUser(
  { Full_Name, Email, Username, Password },
  onReceived
) {
  const id = Unique
  const query_string_1 = `SELECT * FROM Users WHERE Full_Name='${Full_Name}' AND Username='${Username}'`;
  const query_string_2 = `INSERT INTO Users (id, Full_Name, Email, Username, Password)
    VALUES ('${id}', '${Full_Name}', '${Email}', '${Username}', '${Password}')`;
  connection.query(query_string_1, (err, rows) => {
    if (err) return onReceived(err);
    if (rows && rows.length > 0) {
      return onReceived(`User with that name & username already exists`);
    }
    connection.query(query_string_2, (err, rows) => {
      if (err) return onReceived(err);
    });
  });
}

async function UpdateUser(
  { id, Full_Name, Email, Username, Password },
  onReceived
) {
  const query_string_1 = `SELECT * FROM Users WHERE id='${id}'`;
  const query_string_2 = `UPDATE Users 
    SET Full_Name='${Full_Name}', Email='${Email}', Username='${Username}', Password='${Password}' 
    WHERE id=${id}`;
  connection.query(query_string_1, (err, rows) => {
    if (err) return onReceived(err);
    if (rows.length == 0) {
      return onReceived(`no records match that id`);
    }
    connection.query(query_string_2, (err, rows) => {
      if (err) return onReceived(err);
    });
  });
}

async function DeleteUser({ id }, onReceived) {
  const query_string_1 = `SELECT * FROM Users WHERE id='${id}'`;
  const query_string_2 = `delete from Users where id='${id}'`;
  connection.query(query_string_1, (err, rows) => {
    if (err) return onReceived(err);
    if (rows.length == 0) {
      return onReceived(`no records match that id`);
    }
    connection.query(query_string_2, (err, rows) => {
      if (err) return onReceived(err);
    });
  });
}

/* DeleteUser({id: 2}, (err, result) => {
    if (err) {
        return console.error(err)
    }
    console.log(result)
}) */

module.exports = { getAll, createNewUser, UpdateUser, DeleteUser, getOne };
