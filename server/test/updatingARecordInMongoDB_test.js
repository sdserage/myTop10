const assert = require('assert');
const { User } = require('../mongodbModels/user');
const uuidv4 = require('../util/uuidv4');

describe('Updating records', () => {
  let newUser;

  beforeEach(done => {
    newUser = new User({
      auth0ID: uuidv4(),
      firstName: 'Leia',
      lastName: 'Organa',
      userName: 'rememberAlderaan',
      email: 'lorgana@testemail.com',
      lists: [],
    });

    newUser.save().then(() => {
      done();
    });
  });

  it('Updates one record in the database', done => {
    User.findOneAndUpdate({firstName: 'Leia', email: 'lorgana@testemail.com'}, {lastName: 'Skywalker'}).then(() => {
      User.findById(newUser._id).then(result => {
        assert(result.lastName === 'Skywalker' && result.userName === 'rememberAlderaan');
        done();
      });
    }).catch(error => {
      console.log('Error, finding and updating the user failed: ', error);
    });
  });
});