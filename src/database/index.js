
const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = async(app) => {
    // connect to a database
    let dbURI = process.env.DB_CONNECTION;

    try {
        await mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology:true  })
        console.log('conected')
        let port = process.env.PORT || 3000;
        app.listen(port)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    dbConnection
}
