const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect('mongodb://localhost/mongoTest');
  mongoose.connection.once('open', () => {
    console.log('Connection to MongoDB has been made, starting tests.');
    done();
  }).on('error', error => {
    console.log('Connection error: ', error);
  });

  beforeEach(done => {
    mongoose.connection.collections.items.drop(() => {
      mongoose.connection.collections.lists.drop(() => {
        mongoose.connection.collections.users.drop(() => done());
      });
    });
  });
});