<template>
  <div>
    <el-table :data="books" style="width: 100%">
      <el-table-column label="Title" prop="title"></el-table-column>
      <el-table-column label="Rate" prop="rate" width="100"></el-table-column>
      <el-table-column label="Increment/Decrement Rating" width="250">
        <template scope="scope">
          <el-button type="primary" icon="plus" size="mini"></el-button>
          <el-button type="primary" icon="minus" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'bookList',
    data() {
      // todo: remove
      const dummyDataForUIDev = [
        {
          title: 'C Programming Language',
          rate: 1,
        },
        {
          title: 'Learning Vue.js 2',
          rate: 0,
        },
      ];

      return {
        books: dummyDataForUIDev,
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
