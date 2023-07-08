const express = require('express')
const cors = require('cors');
const axios = require('axios');

const app = express()
app.use(cors());
app.use(express.json());

const USER_MANAGEMENT_SERVER_PORT = 3002
const MYSQL_SERVER_ADDRESS = "https://httpbin.org/post";

app.post('/', (req, res) => {
  const userInfo = req.body;
    console.log(userInfo);
    if(validate(userInfo)==false){
	res.status(400).send({'Status': 'Invalid User Data'});
	return;
    }
  const data = {
    name: userInfo.name,
    age: userInfo.age,
    password: userInfo.password,
  };

  axios
    .post(MYSQL_SERVER_ADDRESS, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log(response.data);
      res.status(200).send({ Status: 'Successful' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ Status: 'Internal Server Error' });
    });
});




function validate(userInfo){
    // http encode them
    // check parameters limit
    return true;
}

app.listen(USER_MANAGEMENT_SERVER_PORT, () => {
  console.log(`USER MANAGEMENT app listening on port ${USER_MANAGEMENT_SERVER_PORT}`)
})
