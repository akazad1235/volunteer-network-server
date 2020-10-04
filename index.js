const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pass = "volunteer12345";



const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://volunteer:volunteer12345@cluster0.e0dyf.mongodb.net/volunteer-network?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const newUserCollection = client.db("volunteer-network-").collection("volunteer");

  app.post('/addUser', (req, res) => {
      const newUser = req.body;
      newUserCollection.insertOne(newUser)
      .then( result => {
          res.send(result.insertedCount > 0);
      })
      console.log(newUser);
  })
  app.get('/showEvents', (req, res) => {
    newUserCollection.find({email:req.query.email})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })

  app.delete('/delete/:id', (req, res) => {
   // console.log(ObjectId(req.params.id));
    newUserCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then( result => {
      console.log(result);
    })
  })

  app.get('/allVolunteer', (req, res) => {
    newUserCollection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    })
  })
  //delete registerd person
  app.delete('/deleteRegPerson/:id', (req, res) => {
    // console.log(ObjectId(req.params.id));
     newUserCollection.deleteOne({_id: ObjectId(req.params.id)})
     .then( result => {
       console.log(result);
     })
   })
  

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})