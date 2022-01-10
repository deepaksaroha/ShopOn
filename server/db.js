const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

exports.connect = (dbConfig) => {
    try {

        const {host, username, password, database} = dbConfig;
        // const {host, database} = dbConfig;

        let absoluteHostName = host;
        
        // const mongoUri = `mongodb://${absoluteHostName}/${database}`;
        // const mongoUri = `mongodb://localhost/test2`;
        
        // if (username) {
        //     if (password !== undefined) {
        //         absoluteHostName = `${username}:${password}@${absoluteHostName}`;
        //     } else {
        //         absoluteHostName = `${username}@${absoluteHostName}`;
        //     }
        // }

        const mongoUri = `mongodb+srv://${absoluteHostName}/${database}?retryWrites=true&w=majority`;

        return mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
        console.log(`Error connecting to MongoDB: ${err}`);
        // throw err;
    }
};

exports.getClient = () => {
    return mongoose.connection.getClient();
}
