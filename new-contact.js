const { MongoClient } = require('mongodb');
const dotenv = require("dotenv");

dotenv.config();


const dbName = 'project1';
const collectionName = 'contacts'

async function main() {
    const client = new MongoClient(process.env.CONNECTIONSTRING);

    try {
        await client.connect();
        const db = client.db(dbName);
        const contacts = db.collection(collectionName);

        const result = await contacts.insertMany([
            {
                firstName: 'Alice',
                lastName: 'Williams',
                email: 'alice@williams.com',
                favoriteColor: 'Blue',
                birthday: new Date('1990-05-15')
            },
            {
                firstName: 'Jane',
                lastName: 'Brown',
                email: 'jane@gmail.com',
                favoriteColor: 'Green',
                birthday: new Date('1998-10-20')
            },
            {
                firstName: 'Michael',
                lastName: 'Johnson',
                email: 'mike@outlook.com',
                favoriteColor: 'Red',
                birthday: new Date('1995-03-08')
            }

        ]);
        console.log(`${result.insertedCount} documents inserted.`);

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await client.close();
    }
}


main().catch(console.error); 