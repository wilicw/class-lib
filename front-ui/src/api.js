import axios from 'axios';
import { config } from '../config'

const client = axios.create({
  baseURL: config.api,
  timeout: 100000
}
)

console.log(config.api)

export default {
  get_books: async () =>
    client.get('/books')
  ,
  get_book_by_id: async (id) =>
    client.get(`/books/${id}`)
  ,
  order_book: (id, username, password) =>
    client.post(`/books/order/${id}`, {
      username: username,
      password: password
    }),
  return_book: (id, username, password) =>
    client.post(`/books/return/${id}`, {
      username: username,
      password: password
    })
}
