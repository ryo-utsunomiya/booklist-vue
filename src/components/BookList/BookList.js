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
        .then(() => {
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
      fetch(`${baseUrl}/api/${id}/rate/inc`, { method: 'POST' })
        .then(response => response.json())
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
      fetch(`${baseUrl}/api/${id}/rate/dec`, { method: 'POST' })
        .then(response => response.json())
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
      fetch(`${baseUrl}/api/${book.id}`, { method: 'DELETE' })
        .then(response => response.json())
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
