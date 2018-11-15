const gqlProjection = require('graphql-advanced-projection');

module.exports = gqlProjection({
  User: {
    proj: {
      id: '_id',
      lists: 'lists',
    },
  },
  List: {
    proj: {
      id: '_id',
      // author: 'author',
      // items: 'items',
    },
  }, 
  Item: {
    proj: {
      id: '_id',
      // list: 'list',
    },
  },
});