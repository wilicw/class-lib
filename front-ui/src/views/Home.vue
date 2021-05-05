<template>
  <v-row>
    <v-col md="3" sm="6" xs="12" v-for="book in books" :key="book.id">
      <BookCard
        :id="book.id"
        :title="book.title"
        :img="book.imageUrl"
        :introduction="book.introduction"
        :status="book.status"
      />
    </v-col>
  </v-row>
</template>

<script>
import BookCard from "../components/BookCard";
import api from "@/api";

export default {
  name: "Home",
  data: () => ({
    books: [],
  }),
  components: {
    BookCard,
  },
  created: async function () {
    let books = await api.get_books();
    this.books = books.data;
    console.log(this.books);
  },
};
</script>
