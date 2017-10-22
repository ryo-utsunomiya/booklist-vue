class Book {
  /**
   * @param db DB instance
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Get all books
   * @returns {Promise}
   */
  all() {
    return this.db.query('SELECT * FROM books ORDER BY rate DESC, id ASC');
  }

  /**
   * Create new book
   * @param title string
   * @returns {Promise}
   */
  create(title) {
    return this.db.exec('INSERT INTO books (title, created_at, updated_at) VALUES(?, NOW(), NOW())', [title]);
  }

  /**
   * Remove book
   * @param id
   * @returns {Promise}
   */
  remove(id) {
    return this.db.exec('DELETE FROM books WHERE id = ?', [Number(id)]);
  }

  /**
   * Increment book rate
   * @param id
   * @returns {Promise}
   */
  incRate(id) {
    return this.db.exec('UPDATE books SET rate = rate + 1 WHERE id = ?', [Number(id)]);
  }

  /**
   * Decrement book rate
   * @param id
   * @returns {Promise}
   */
  decRate(id) {
    return this.db.exec('UPDATE books SET rate = rate - 1 WHERE id = ?', [Number(id)]);
  }
}

module.exports = Book;
