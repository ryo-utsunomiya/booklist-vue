<template>
  <div>
    <el-input placeholder="New book" v-model="newBook" style="width: 90%;"></el-input>
    <el-button type="primary" @click.prevent="create">Add</el-button>
    <el-table :data="books" style="width: 100%; margin-top: 10px;">
      <el-table-column label="Title" prop="title"></el-table-column>
      <el-table-column label="Rate" prop="rate" width="100"></el-table-column>
      <el-table-column label="Increment/Decrement Rating" width="250">
        <template scope="scope">
          <el-button type="primary" icon="plus" size="mini" @click.prevent="increment(scope.$index)"></el-button>
          <el-button type="primary" icon="minus" size="mini" @click.prevent="decrement(scope.$index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  // FIXME: hard code of API URL
  const baseUrl = 'http://192.168.33.10:3000';

  export default {
    name: 'bookList',
    data() {
      // todo: remove
      const dummyDataForUIDev = [
        {
          id: 1,
          title: 'C Programming Language',
          rate: 1,
        },
        {
          id: 2,
          title: 'Learning Vue.js 2',
          rate: 0,
        },
      ];

      return {
        books: dummyDataForUIDev,
        newBook: '',
      };
    },
    methods: {
      create() {
        fetch(`${baseUrl}/api/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: this.newBook,
          }),
        })
          .then(response => response.json())
          .then((data) => {
// eslint-disable-next-line no-console
            console.log(data);
            this.newBook = '';
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
          });
      },
      increment(index) {
        const id = this.books[index].id;
        if (!id) return;
        fetch(`${baseUrl}/api/${id}/rate/inc`, { method: 'POST' })
          .then(response => response.json())
          .then((data) => {
// eslint-disable-next-line no-console
            console.log(data);
            this.books[index].rate += 1;
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
          });
      },
      decrement(index) {
        const id = this.books[index].id;
        if (!id) return;
        fetch(`${baseUrl}/api/${id}/rate/dec`, { method: 'POST' })
          .then(response => response.json())
          .then((data) => {
// eslint-disable-next-line no-console
            console.log(data);
            this.books[index].rate -= 1;
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
          });
      },
    },
    created() {
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
