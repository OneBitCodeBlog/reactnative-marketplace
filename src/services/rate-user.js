const User = require("../models/User")

module.exports = async function rateUser(currentUserId, ratedUserId, rating) {
  const userToRate = await User.findById(ratedUserId)
  const ratingIndex = userToRate.ratings.findIndex(rating => rating.user.equals(currentUserId))

  if (ratingIndex === -1) {
    userToRate.ratings.push({ user: currentUserId, rating })
  } else {
    userToRate.ratings[ratingIndex].rating = rating
  }
 
  await userToRate.save()
}