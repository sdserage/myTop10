const assert = require('assert');
const User = require('../mongodbModels/user');
const uuidv4 = require('../util/uuidv4');

describe('Deleting records', () => {
  let newUser;

  beforeEach(done => {
    newUser = new User({
      auth0ID: uuidv4(),
      firstName: 'Josuke',
      lastName: 'Higashikata',
      userName: 'shiningDiamond',
      email: 'higashikatajosuke@jojo.com',
      lists: [],
    });

    newUser.save().then(() => {
      done();
    });
  });

  it('Deletes one record from the database', done => {
    User.findOneAndDelete({name: 'Josuke'}).then(result => {
      User.findOne({name: 'Josuke'}).then(result => {
        assert(result === null);
        done();
      });
    });
  });
});