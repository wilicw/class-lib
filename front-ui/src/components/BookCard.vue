<template>
  <v-container>
    <v-card class="mx-auto" @click="$router.push(`book/${id}`)">
      <v-img :src="img"></v-img>
      <v-card-title>{{ title }}</v-card-title>
      <v-chip dark class="ma-2" :color="status ? 'red' : 'green'">
        {{ status ? "借出" : "未借出" }}
      </v-chip>
      <v-card-subtitle> {{ introduction }} </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "book_card",
  props: ["id", "img", "title", "introduction", "status"],
};
</script>
