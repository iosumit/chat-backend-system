# Chat system design
This project is on MVC archietecture and client-server and event driven pattern

This project uses NoSQL DB (MONGO DB).

-------------
### Project Structure
```
root
|
|--- Controller
|--- Handler
|--- Routes
|--- Utils 
````
---------
### Project Setup
- Create env.js file on root dir
```python
const SERVER_SECRET = 'secretKey'; # for generating jwt token
const MONGO_URI = "mongodb uri"; # mongo db uri

module.exports = {
    SERVER_SECRET,
    MONGO_URI
}
```
---

### Install Required Dependencies
```
npm i
```
### Run
```
npm start
```