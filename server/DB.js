const mysql = require('mysql');

class DB {
  /**
   * @param config object
   */
  constructor(config) {
    this.config = config;
    this.connected = false;
  }

  connect() {
    if (this.connected) return;
    this.connection = mysql.createConnection(this.config);
    this.connection.connect();
    this.connected = true;
  }

  close() {
    if (!this.connected) return;
    this.connection.end();
    this.connected = false;
  }

  /**
   * @param sql string
   * @returns {Promise}
   */
  query(sql) {
    return new Promise((resolve, reject) => {
      this.connect();
      this.connection.query(sql, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
      this.close();
    });
  }

  /**
   * @param sql string
   * @param values []
   * @returns {Promise}
   */
  exec(sql, values) {
    return this.query(mysql.format(sql, values));
  }
}

module.exports = DB;
