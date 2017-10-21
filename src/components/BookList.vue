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
        books: [],
      };
    },
    created() {
      // FIXME: hard code of API URL
      const baseUrl = 'http://192.168.33.10:3000';
      fetch(`${baseUrl}/api/`)
        .then(response => response.json())
        .then((data) => {
          this.books = data;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    },
  };
</script>

<style scoped>
</style>
