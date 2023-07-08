const express = require('express')
const proxy = require('express-http-proxy')
const cors = require('cors');
const axios = require('axios');

const app = express()
app.use(cors());
app.use(express.json());

const PORT = 3000



app.use("/api/v1/book/search/author/pagination", proxy("http://localhost:3001"));
app.use("/api/v1/user/registration/", proxy("http://localhost:3002"));

app.listen(PORT, () => {
  console.log(`E-Library app listening on port ${PORT}`)
})
