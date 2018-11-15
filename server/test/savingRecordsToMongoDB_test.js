const assert = require('assert');
const User = require('../mongodbModels/user');
const uuidv4 = require('../util/uuidv4');

describe('Saving records', () => {
  it('Saves a record to the database', done => {
    let newUser = new User({
      auth0ID: uuidv4(),
      firstName: 'Bob',
      lastName: 'Parr',
      userName: 'bParr43',
      email: 'bobparr@example.com',
      lists: []
    });

    newUser.save().then(() => {
      assert(newUser.isNew === false);
      done();
    });
  });
});