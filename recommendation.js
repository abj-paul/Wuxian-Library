const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://getbooksinfo.p.rapidapi.com/',
  params: {s: 'The Lord of the Rings'},
  headers: {
    'X-RapidAPI-Key': 'a0238ece52mshad0e09356030627p185b2cjsnaaa0080a47f3',
    'X-RapidAPI-Host': 'getbooksinfo.p.rapidapi.com'
  }
};

axios.request(options)
    .then((response)=>{
	console.log(response);
    })
