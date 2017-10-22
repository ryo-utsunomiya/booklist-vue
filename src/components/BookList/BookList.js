// FIXME: hard code of API URL
const baseUrl = 'http://192.168.33.10:3000';

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
        .then(() => {
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
        .then(() => {
          this.books[index].rate -= 1;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    },
    remove(index) {
      const book = this.books[index];
      if (!book) return;
      fetch(`${baseUrl}/api/${book.id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => {
          this.books.splice(index, 1);
          this.dialogMessage = `${book.title} is removed`;
          this.dialogVisible = true;
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
