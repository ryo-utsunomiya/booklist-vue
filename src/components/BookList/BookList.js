import axios from 'axios';

// FIXME: hard code of API URL
const baseUrl = 'http://192.168.33.10:3000';
let requesting = false;

export default {
  name: 'bookList',
  data() {
    return {
      books: [],
      newBook: '',
      dialogVisible: false,
      dialogMessage: '',
    };
  },
  methods: {
    create() {
      if (!this.newBook) return;
      if (requesting) return;
      requesting = true;
      axios.post(`${baseUrl}/api/`, { title: this.newBook })
        .then((res) => {
          this.books.push({
            id: res.data.insertId,
            title: this.newBook,
            rate: 0,
          });
          this.dialogMessage = `${this.newBook} is added`;
          this.dialogVisible = true;
          this.newBook = '';
          requesting = false;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          requesting = false;
        });
    },
    increment(index) {
      const id = this.books[index].id;
      if (!id) return;
      if (requesting) return;
      requesting = true;
      axios.post(`${baseUrl}/api/${id}/rate/inc`)
        .then(() => {
          this.books[index].rate += 1;
          requesting = false;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          requesting = false;
        });
    },
    decrement(index) {
      const id = this.books[index].id;
      if (!id) return;
      if (requesting) return;
      requesting = true;
      axios.post(`${baseUrl}/api/${id}/rate/dec`)
        .then(() => {
          this.books[index].rate -= 1;
          requesting = false;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          requesting = false;
        });
    },
    remove(index) {
      const book = this.books[index];
      if (!book) return;
      if (requesting) return;
      requesting = true;
      axios.delete(`${baseUrl}/api/${book.id}`)
        .then(() => {
          this.books.splice(index, 1);
          this.dialogMessage = `${book.title} is removed`;
          this.dialogVisible = true;
          requesting = false;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
          requesting = false;
        });
    },
  },

  created() {
    axios.get(`${baseUrl}/api/`)
      .then((res) => {
        this.books = res.data;
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  },
};
