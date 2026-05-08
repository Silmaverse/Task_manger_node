require("dotenv").config();
const express = require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();
const port = 3000;
const route = require("./routes");
const main = require("./configs/dbCofig");
main();

app.use(cookieParser())
app.use(express.json());
app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials:true
  }
))
app.use(route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
