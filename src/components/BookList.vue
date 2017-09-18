<template>
  <ul>
    <li v-for="book in books">
      {{ book.title }} ({{ book.rate }})
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'bookList',
    data() {
      return {
        books: [
          {
            title: 'C Programming Language',
            rate: 1,
          },
          {
            title: 'Learning Vue.js 2',
            rate: 0,
          },
        ],
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
