const express = require("express")
const { connectToServer, getDb } = require("../db/conn")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "/build")))
app.use(express.json())

// perform a database connection when the server starts
connectToServer(function (err) {
  if (err) {
    console.error(err)
    process.exit()
  }
  // start the Express server
  const PORT = 8000
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })
})

app.get("/api/articles/:name", async (req, res) => {
  const articleName = req.params.name
  const dbConnect = getDb()
  dbConnect.collection("articles").findOne({ name: articleName }, function (err, result) {
    if (err) {
      res.status(400).send("Error finding article!")
    } else {
      res.status(200).json(result)
    }
  })
})

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name
  const dbConnect = getDb()
  dbConnect.collection("articles").updateOne({ name: articleName }, { $inc: { upvotes: 1 } }, function (err, _result) {
    if (err) {
      res.status(400).send("Error updating upvotes on article!")
    } else {
      res.status(200).json(_result)
      console.log("1 document updated")
    }
  })
})
app.post("/api/articles/:name/add-comment", (req, res) => {
  const articleName = req.params.name
  const { username, text } = req.body
  const dbConnect = getDb()
  dbConnect
    .collection("articles")
    .updateOne({ name: articleName }, { $push: { comments: { username, text } } }, function (err, _result) {
      if (err) {
        res.status(400).send("Error updating comment on article!")
      } else {
        res.status(200).json(_result)
        console.log("1 document updated")
      }
    })
})

// page routing handled in react
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"))
})
