const { MongoClient } = require('mongodb');
const dotenv = require("dotenv");

dotenv.config();

async function main() {
    const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.a4c6owf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    const client = new MongoClient(connectionString);

    try {
        await client.connect();
        await createListing(client,{
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1        
       })
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


main().catch(console.error);


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createListing(client, newListing){
   const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
   console.log(`New listing created with the following id: ${result.insertedId}`);
}