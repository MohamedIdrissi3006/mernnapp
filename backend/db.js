const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://medskod13:user123@food.vtihcec.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB successfully");
  
  const fetch_data = mongoose.connection.db.collection("food_items").find({});
  const results = await fetch_data.toArray();
  if (results.length > 0) {
      const foodCategory = mongoose.connection.db.collection("foodCategory").find({});
      const result1 = await foodCategory.toArray();

      if (result1.length > 0) {
          result1.forEach((innerResult, j) => {
              global.food_category = result1;
          });
      } else {
          console.log('No listing found');
      }
      global.food_items = results;
  } else {
      console.log('No listings found');
  }
  
};
module.exports = mongoDB;