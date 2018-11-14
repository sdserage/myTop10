const assert = require('assert');
const { User } = require('../mongodbModels/user');
const mongoose = require('mongoose');
const uuidv4 = require('../util/uuidv4');

describe('Updating records', () => {


  beforeEach(done => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it('Create a user with sub-documents', done => {
    let newUser = new User({
      firstName: 'Michael',
      lastName: 'Scott',
      lists: [{title: 'Action Movies', category: 'Entertainment'}],
    });
    newUser.save().then(() => {
      User.findOne({firstName: 'Michael', lastName: 'Scott'}).then(result => {
        assert(result.lists.length === 1);
        done();
      });
    });
  });

  it('Add a list to a user', done => {
    let newUser = new User({
      firstName: 'Dwight',
      lastName: 'Schrute',
      lists: [{title: 'Weapons', category: 'Education'}],
    });

    newUser.save().then(() => {
      User.findOne({firstName: 'Dwight', lastName: 'Schrute'}).then(result => {
        result.lists.push({title: 'Bears', category: 'Education'});
        result.save().then(() => {
          User.findById(newUser._id).then(result => {
            assert(result.lists.length === 2);
            done();
          });
        });
      });
    });
  });
});