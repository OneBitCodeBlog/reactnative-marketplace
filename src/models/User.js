const { Schema, model } = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  phone: String,
  addresses: [{
    street: String,
    number: String,
    complement: String,
    district: String,
    city: String,
    state: String,
    cep: String
  }],
  ratings: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: Number
  }],
  favorites: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

userSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) {
        next(err)
      } else {
        this.password = hashedPassword;
        next()
      }
    })
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isSmae) => {
    if (err) {
      callback(err)
    } else {
      callback(err, isSmae)
    }
  })
}

const User = model('User', userSchema)

module.exports = User