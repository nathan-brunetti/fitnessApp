const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const MemberProfile = require('./models/member-profile');
const TrainerProfile = require('./models/trainer-profile');

const app = express();

mongoose.connect('mongodb+srv://Nate:CdyQIGomtE6TmmR5@cluster0-7fyxu.mongodb.net/nodeAngular', { useNewUrlParser: true, useCreateIndex: true, })
  .then(() => {
    console.log('SERVER MESSAGE: Connected to database');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

// middleware that parses JSON body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// middleware that allows access to a folder on the server
app.use('/images', express.static(path.join('backend/images')));

// middleware that handles CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

//
// API calls for Members
//

app.post('/api/members', (req, res, next) => {
  const member = new MemberProfile({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    bio: req.body.bio
    // weight: req.body.weight,
    // height: req.body.height
  });
  console.log('SERVER MESSAGE: Member created! ' + member);
  member.save()
  .then(result => {
    res.status(201).json({
      message: 'Member added!!!',
      memberId: result
    });
  });
});

app.put('/api/members/:_id', (req, res, next) => {
  const member = new MemberProfile({
    _id: req.body._id,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    bio: req.body.bio
  });
  console.log('Updated member info: ' + member);
  MemberProfile.updateOne({ _id: req.params._id}, member )
    .then(result => {
    console.log('This is the PUT result: ' + result);
    res.status(200).json({
      message: 'Member update successful!'
    })
  })
});

// GET all members
app.get('/api/members', (req, res, next) => {
  MemberProfile.find()
    .then(documents => {
      console.log('SERVER MESSAGE: Members: ' + documents);
      res.status(200).json({
        message: 'Members fetched!',
        numberOfMembers: documents.length,
        members: documents
      });
    })
    .catch();
});

// GET one member
app.get('/api/members/:_id', (req, res, next) => {
  const _id = req.params._id;
  MemberProfile.findById(req.params._id)
    .then(member => {
      if (member) {
        res.status(200).json({_id: _id,
          email: member.email,
          firstName: member.firstName,
          lastName: member.lastName,
          age: member.age,
          gender: member.gender,
          bio: member.bio,
          message: 'Here is the member you requested:'
        })
      } else {
        res.status(404).json({
          message: 'Member not found'
        })
      }
    });
});

// DELETE on member
app.delete('/api/members/:_id', (req, res, next) => {
  const _id = req.params._id;
  MemberProfile.deleteOne({_id: _id})
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Member: ' + _id + ' has been deleted'
      });
    console.log('Member: ' + _id + ' has been deleted');
    });
});

//
// API calls for Trainers
//

// POST a single trainer
app.post('/api/trainers', (req, res, next) => {
  const trainer = new TrainerProfile({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    bio: req.body.bio
    // weight: req.body.weight,
    // height: req.body.height
  });
  console.log('SERVER MESSAGE: Trainer created! ' + trainer);
  trainer.save()
  .then(result => {
    res.status(201).json({
      message: 'Trainer added!!!',
      trainerId: result
    });
  });
});

// PUT one trainer
app.put('/api/members/:_id', (req, res, next) => {
  const trainer = new TrainerProfile({
    _id: req.body._id,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    bio: req.body.bio
  });
  console.log('Updated trainer info: ' + trainer);
  TrainerProfile.updateOne({ _id: req.params._id}, trainer )
    .then(result => {
    console.log('This is the PUT result: ' + result);
    res.status(200).json({
      message: 'Trainer update successful!'
    })
  })
});

// GET all trainers
app.get('/api/trainers', (req, res, next) => {
  TrainerProfile.find()
    .then(documents => {
      console.log('SERVER MESSAGE: Trainers: ' + documents);
      res.status(200).json({
        message: 'Trainers fetched!',
        numberOfTrainers: documents.length,
        trainers: documents
      });
    })
    .catch();
});

// GET one trainer
app.get('/api/trainers/:_id', (req, res, next) => {
  const _id = req.params._id;
  TrainerProfile.findById(req.params._id)
    .then(trainer => {
      if (trainer) {
        res.status(200).json({
          _id: _id,
          email: trainer.email,
          firstName: trainer.email,
          lastName: trainer.lastName,
          age: trainer.age,
          gender: trainer.gender,
          bio: trainer.bio,
          message: 'Here is the trainer you requested'
        })
      } else {
        res.status(404).json({
          message: 'Trainer not found'
        })
      }
    });
});

module.exports = app;
