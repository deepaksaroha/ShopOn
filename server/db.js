import Mong from "mongoose";

Mong.set('useNewUrlParser', true);
Mong.set('useFindAndModify', false);
Mong.set('useCreateIndex', true);

export function connect(dbConfig) {
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
        return Mong.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
        console.log(`Error connecting to MongoDB: ${err}`);
        // throw err;
    }
}

export function getClient() {
    return Mong.connection.getClient();
}
