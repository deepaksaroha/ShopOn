const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

exports.connect = (dbConfig) => {
    try {

        const {host, username, password, database} = dbConfig;
        // const {host, database} = dbConfig;
        // console.log(password);
        
        // const mongoUri = `mongodb://${absoluteHostName}/${database}`;

        let absoluteHostName;
        
        if (username) {
            if (password !== undefined) {
                absoluteHostName = `${username}:${password}@${host}`;
            } else {
                absoluteHostName = `${username}@${host}`;
            }
        }

        // const abc = `mongodb+srv://${absoluteHostName}/${database}?retryWrites=true&w=majority`;

        // console.log(abc);

        const mongoUri = `mongodb+srv://${absoluteHostName}/${database}?retryWrites=true&w=majority`;
        // const mongoUri = `mongodb+srv://admins:admins@cluster0.afyc4.mongodb.net/RRDB?retryWrites=true&w=majority`;
        
        
        // const mongoUri = `mongodb://localhost/test2`;
        return mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
        console.log(`Error connecting to MongoDB: ${err}`);
        // throw err;
    }
};

exports.getClient = () => {
    return mongoose.connection.getClient();
}
