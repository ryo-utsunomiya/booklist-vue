const mysql = require('mysql');

class DB {
  /**
   * @param config object
   */
  constructor(config) {
    this.connection = mysql.createConnection(config);
    this.connection.connect();
  }

  /**
   * @param sql string
   * @returns {Promise}
   */
  query(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
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
