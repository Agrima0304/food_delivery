const mongoose = require('mongoose');
const URI = 'mongodb+srv://goFood:Agrima123@cluster0.y2crqso.mongodb.net/gofoodmern?retryWrites=true&w=majority'
mongoose.connect(`${URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
    console.log('Mongodb connection')

})