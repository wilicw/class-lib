const express = require('express');
const router = express.Router();
const { Book, Record, User } = require('../db');
const booksComTwCrawler = require('books-com-tw-crawler');

/* GET books list. */
router.get('/', async function (req, res, next) {
  const books = await Book.findAll();
  res.json(books);
});

/* GET books list. */
router.get('/:id', async function (req, res, next) {
  const book_id = parseInt(req.params.id)
  const book = await Book.findOne({
    where: {
      id: book_id
    }
  });
  const record = await Record.findAll({
    where: {
      book_id: book_id
    }
  })
  if (!book) {
    return next(new Error('Book not found!'));
  }
  res.json(Object.assign({}, { book }, { record: record }));
});

/* POST book. */
router.post('/', async function (req, res, next) {
  const book_name = req.body.title
  const result = await booksComTwCrawler(book_name)
  if (!result) {
    return next(new Error('Book not found!'))
  }
  const book = Book.build(result[0]);
  book.save();
  res.json(book);
});

/* POST order book. */
router.post('/order/:id', async function (req, res, next) {
  const book_id = parseInt(req.params.id);
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({
    where: {
      username: username,
      password: password
    }
  })
  if (!user) {
    return next(new Error('Login credentials error!'))
  }
  const result = (await Book.update({ status: true }, {
    where: {
      id: book_id,
      status: false
    }
  }));
  if (!result) {
    return next(new Error('Book not found!'))
  }
  const record = Record.build({ user_id: user.id, book_id: book_id })
  record.save();
  res.json({ status: 1 });
});

/* POST return book. */
router.post('/return/:id', async function (req, res, next) {
  const book_id = parseInt(req.params.id);
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({
    where: {
      username: username,
      password: password
    }
  })
  if (!user) {
    return next(new Error('Login credentials error!'))
  }
  const record = await Record.findAll({
    limit: 1,
    where: {
      book_id: book_id
    },
    order: [['createdAt', 'DESC']]
  })
  if (!record) {
    return next(new Error('Record not found!'));
  }
  if (record[0].user_id != user.id) {
    return next(new Error('Wait, Who are you??'));
  }
  const result = (await Book.update({ status: false }, {
    where: {
      id: book_id,
      status: true
    }
  }));
  if (!result) {
    return next(new Error('Book not found!'))
  }
  res.json({ status: result[0] });
});

module.exports = router;
