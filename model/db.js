// const test = require('dotenv').config()
import mysql from "mysql2";
import { v4 } from "uuid";
import { config } from "dotenv";
import { promisify } from "util";

config();


let db_URL = process.env.DATABASE_URL;
const connection = mysql.createConnection(db_URL);
const query = promisify(connection.query).bind(connection)

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("successfully connected 👍👍");
});

async function getAll() {
  const query_string = `SELECT * FROM Users`;
  const result = await query(query_string).then((result) => {return result}, (err) => {return err})
  if (result?.errno) {
    return {error: `${result.code}`}
  }
  return result
}
async function getOne(id) {
  const query_string = `SELECT * FROM Users WHERE id='${id}'`;
  const result = await query(query_string).then((result) => {return result}, (err) => {return err})
  if (result?.errno) {
    return {error: `${result.code}`}
  }
  return result
}

async function createNewUser({ Full_Name, Email, Username, Password }) {
  const id = v4();
  const query_string_1 = `SELECT * FROM Users WHERE Full_Name='${Full_Name}' AND Username='${Username}'`;
  const query_string_2 = `INSERT INTO Users (id, Full_Name, Email, Username, Password)
  VALUES ('${id}', '${Full_Name}', '${Email}', '${Username}', '${Password}')`;
  const result_1 = await query(query_string_1).then((result) => {return result}, (err) => {return err})
  if (result_1?.errno) {
    return {error: `${result_1.code}`}
  }
  if (result_1.length > 0) {
    return {error: `User with that name & username already exists`}
  }
  const result = await query(query_string_2).then((result) => {return result}, (err) => {return err})
  if (result?.errno) {
    return {error: `${result.code}`}
  }
  return {success: `Registration Successful`}

}

async function UpdateUser({ id, Full_Name, Email, Username, Password }) {
  const query_string_1 = `SELECT * FROM Users WHERE id='${id}'`;
  const query_string_2 = `UPDATE Users 
  SET Full_Name='${Full_Name}', Email='${Email}', Username='${Username}', Password='${Password}' 
  WHERE id=${id}`;
  const result_1 = await query(query_string_1).then((result) => {return result}, (err) => {return err})
  if (result_1?.errno) {
    return {error: `${result_1.code}`}
  }
  if (result_1.length == 0) {
    return {error: `User with that id does not exist`}
  }
  const result = await query(query_string_2).then((result) => {return result}, (err) => {return err})
  if (result?.errno) {
    return {error: `${result.code}`}
  }
  return {success: `User Update Successful`}

}

async function DeleteUser({ id }, onReceived) {
  const query_string_1 = `SELECT * FROM Users WHERE id='${id}'`;
  const query_string_2 = `delete from Users where id='${id}'`;
  const result_1 = await query(query_string_1).then((result) => {return result}, (err) => {return err})
  if (result_1?.errno) {
    return {error: `${result_1.code}`}
  }
  if (result_1.length == 0) {
    return {error: `User with that id does not exist`}
  }
  const result = await query(query_string_2).then((result) => {return result}, (err) => {return err})
  if (result?.errno) {
    return {error: `${result.code}`}
  }
  return {success: `User Delete Successful`}
}

export { getAll, createNewUser, UpdateUser, DeleteUser, getOne };