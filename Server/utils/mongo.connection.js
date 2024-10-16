const mongoose = require("mongoose");
require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connection.once("open", () => {
   //TODO:insert in package
    console.log(`Mongodb Connection is ready..🚀🚀`);
});
mongoose.connection.on("error", (err) => {
    console.log(err);
});

async function ConnectDB() {
    await mongoose.connect(DATABASE_URL);
}
async function disconnectDB() {
    await mongoose.disconnect();
}

module.exports = {
    ConnectDB,
    disconnectDB,
};