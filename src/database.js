const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log('Connected to MongoDB!')
}).catch(err => {
  console.log(err.message)
})