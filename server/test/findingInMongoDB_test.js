const assert = require('assert');
const { User } = require('../mongodbModels/user');
const uuidv4 = require('../util/uuidv4');

describe('Finding records', () => {
  let newUser;

  beforeEach(done => {
    newUser = new User({
      auth0ID: uuidv4(),
      firstName: 'Inigo',
      lastName: 'Montoya',
      userName: 'youKilledMyFather6Fingers',
      email: 'imontoya@exampleemail.com',
      lists: [],
    });

    newUser.save().then(() => {
      done();
    });
  });

  it('Finds one record from the database', done => {
    User.findOne({firstName: 'Inigo', lastName: 'Montoya'}).then(result => {
      assert(result.firstName === 'Inigo' && result.lastName === 'Montoya');
      done();
    });
  });

  it('Finds one record by ID from the database', done => {
    User.findById(newUser._id).then(result => {
      assert(result._id.toString() === newUser._id.toString());
      done();
    });
  });
});