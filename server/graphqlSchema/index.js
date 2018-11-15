const { makeExecutableSchema } = require('graphql-tools');
// const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const _ = require('lodash');
const User = require('../mongodbModels/user');
const List = require('../mongodbModels/list');
const { resolvers, project } = require('../projection');
const mongoose = require('mongoose');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: _.merge(resolvers, {
    Query: {
      user(parent, { id }, context, info) {
        const proj = project(info);
        return User.findById(id, proj).then(user => {
          return user;
        });
      },
      users(parent, {}, context, info) {
        const proj = project(info);
        return User.find({}).then(users => users);
      },
    },
    User: {
      lists(parent, args, context, info) {
        const proj = project(info);
        if (_.keys(proj).length === 1) {
          return parent.lists.map(id => ({ _id: id }));
        }
        return User.populate(parent, {path: 'lists', select: proj}).then(() => {
          return parent.lists;
        });
      },
    },
    List: {
      author(parent, args, context, info) {
        const proj = project(info);
        if (_.keys(proj).length === 1) {
          return {id: parent.author._id};
        }
        return User.populate(parent, {path: 'author', select: proj}).then(() => {
          return parent.author;
        });
      },
      items(parent, args, context, info) {
        const proj = project(info);
        if (_.keys(proj).length === 1) {
          return parent.items.map(id => ({ _id: id }));
        }
        return List.populate(parent, {path: 'items', select: proj}).then(() => {
          return parent.items;
        });
      },
    },
    Item: {

    },
    Mutation: {
      createList: (parent, args, context, info) => new Promise((resolve, reject) => {
        const {
          userId, title, category,
        } = args.input;
        const proj = project(info);
        let newList = new List({
          author: userId,
          title,
          category,
          subCategories: [],
          size: 10,
          items: [],
        });
        newList.save().then(() => {
          User.findById(newList.author).then(user => {
            user.lists.push(newList._id)
            user.save().then(() => {
              resolve(newList);
            });
          });
        }).catch(error => {
          console.log('An error occured while attempting to save a new list: ', error.message);
          reject(error.message);
        });
      }),
    },
  }),
});

module.exports = schema;