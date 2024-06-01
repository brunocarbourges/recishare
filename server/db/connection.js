import dontenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import {connect} from "mongoose";

// Reads from the .env file to set process.env
dontenv.config();

const URI = process.env.ATLAS_URI;
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

const dbconnect = async () => {
  await connect(URI);
  console.log("Connected to Database");
}

dbconnect().catch((err) => console.error(err))

let db = client.db("employees");

export default db;