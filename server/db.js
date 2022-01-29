const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

exports.connect = (dbConfig) => {
    try {

        const {host, username, password, database} = dbConfig;
        // const {host, database} = dbConfig;
        // console.log(password);
        let absoluteHostName = host;
        
        // const mongoUri = `mongodb://${absoluteHostName}/${database}`;
        
        if (username) {
            if (password !== undefined) {
                console.log('in password')
                absoluteHostName = `${username}:${password}@${absoluteHostName}`;
            } else {
                absoluteHostName = `${username}@${absoluteHostName}`;
            }
        }

        // const abc = `mongodb+srv://${absoluteHostName}/${database}?retryWrites=true&w=majority`;

        // console.log(abc);

        const mongoUri = `mongodb+srv://${absoluteHostName}/${database}?retryWrites=true&w=majority`;
        
        
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
