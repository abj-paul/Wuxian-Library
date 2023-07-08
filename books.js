const express = require('express')
const cors = require('cors');
const axios = require('axios');

const app = express()
app.use(cors());
app.use(express.json());

const BOOK_SERVER_PORT = 3001
const PAGE_SIZE = 10; // Set the desired page size
const OPEN_LIBRARY_ADDRESS = "https://openlibrary.org/search.json";

// Initialize an in-memory cache
const cache = new Map();

app.get('/', (req, res) => {
  const authorName = req.query.author;
  const pageNumber = req.query.pageNumber;

    console.log(authorName, pageNumber);

  if (validate(authorName) === false) {
    res.status(400).send({ Status: 'Invalid User Data' });
    return;
  }

  const cacheKey = `${authorName}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
      // Serve the response from cache
      books = cachedData.books
      
      page = getPage(books, pageNumber, PAGE_SIZE);
      
      res.status(200).json({ author: authorName, page });

  } else {
    const url = `${OPEN_LIBRARY_ADDRESS}?author=${authorName}`;

    axios
      .get(url)
      .then((response) => {
        const books = response.data.docs;
	  console.log("GOT RESPONSE FROM OPEN LIB");
          // Store the response in cache
          cache.set(cacheKey, { author: authorName, books });
	  
	  page = getPage(books, pageNumber, PAGE_SIZE);
	  
          res.status(200).json({ author: authorName, page });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({ Status: 'Internal Server Error' });
      });
  }
});

function getPage(books, pageNumber, pageSize) {
  let PAGE = [];

  let startingIndex = pageNumber * pageSize;
  let endingIndex = startingIndex + pageSize;

  for (let i = startingIndex; i < endingIndex && i < books.length; i++) {
    PAGE.push(books[i].title);
  }

  console.log("PAGE:");
  console.log(startingIndex, endingIndex);

  return PAGE;
}
function validate(userInfo){
    // http encode them
    // check parameters limit
    return true;
}

app.listen(BOOK_SERVER_PORT, () => {
  console.log(`BOOK Proxy Server app listening on port ${BOOK_SERVER_PORT}`)
})
