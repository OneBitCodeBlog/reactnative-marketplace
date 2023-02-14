const { Schema, model, default: mongoose } = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  addresses: [{
    _id: mongoose.Schema.Types.ObjectId,
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
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
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

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.getAverageRating = function () {
  return this.ratings.reduce((total, current) => total + current.rating, 0) / this.ratings.length
}

const User = model('User', userSchema)

module.exports = User