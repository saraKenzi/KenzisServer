 import mongoose  from "mongoose";
export const connectToDB = async () => {
    try {
        let con = await mongoose.connect(process.env.DB_CONNECTION||"mongodb+srv://527676896s:sarakenzi@sarakenzidb.ixe9ry8.mongodb.net/?retryWrites=true&w=majority");
        console.log(`MongoDB connction successfully!! HOST: ${con.connection.host}`)
    }
    catch (err) {
        console.log(`----Unable to connect to database ${err}`)
        process.exit(1);
    }

}
