const mongoose = require('mongoose');
const URI = 'mongodb+srv://goFood:Agrima123@cluster0.y2crqso.mongodb.net/gofoodmern?retryWrites=true&w=majority';

mongoose.connect(`${URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');

    const db = mongoose.connection.db;

    // Fetch food items data
    const fetchedDataPromise = db.collection("food_items").find({}).toArray();

    // Fetch food category data
    const foodCategoryPromise = db.collection("food_category").find({}).toArray();

    return Promise.all([fetchedDataPromise, foodCategoryPromise]);
})
.then(([data, catData]) => {
    global.food_items = data;
    global.food_category = catData;
    console.log('Data fetched and stored.');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose.connection;
