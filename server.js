import express from 'express';

import cors from 'cors';

import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import Issue from './models/issue';

const app = express();

const router = express.Router();

app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://[server]/issues');

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!')
});

app.use('/', router);

app.get('/', (req,res) => res.send('Hello World'));
app.listen(4000, () => console.log(`Express server running on port 4000`));

//Retrieve all issues
router.route('/issues').get((req,res) => {
    Issue.find((err,issues) => {
        if(err) {
            console.log(err);
        }else{
            res.json(issues);
        }
    });
});

//Retrieve An Issue By Id
router.route('/issues/:id').get((req,res) => {
    Issue.findById(req.params.id, (err,issue) => {
        if(err)
            console.log(err);
        else
            res.json(issue);
    });
});

