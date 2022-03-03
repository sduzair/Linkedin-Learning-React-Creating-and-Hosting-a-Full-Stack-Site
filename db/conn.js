const { MongoClient } = require("mongodb")
require("dotenv").config({ path: "./config.env" })

const connectionString = process.env.CONNECTION_URI
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let dbConnection

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err)
      }

      dbConnection = db.db("my-blog")
      console.log("Successfully connected to MongoDB.")

      return callback()
    })
  },

  getDb: function () {
    return dbConnection
  },
}
