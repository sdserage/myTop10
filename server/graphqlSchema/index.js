const { makeExecutableSchema } = require('graphql-tools');
// const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const _ = require('lodash');
const User = require('../mongodbModels/user');
const List = require('../mongodbModels/list');
const Item = require('../mongodbModels/item');
const { resolvers, project } = require('../projection');
const mongoose = require('mongoose');
const uuidv4 = require('../util/uuidv4');

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
      id: (parent, args, context, info) => parent._id.toString(),
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
      id: (parent, args, context, info) => parent._id.toString(),
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
      id: (parent, args, context, info) => parent._id.toString(),
      list(parent, args, context, info) {
        const proj = project(info);
        if (_.keys(proj).length === 1) {
          return {id: parent.list._id};
        }
        return Item.populate(parent, {path: 'list', select: proj}).then(() => {
          return parent.list;
        });
      },
    },
    Mutation: {
      createUser: (parent, args, context, info) => new Promise((resolve, reject) => {
        const {
          firstName, lastName, userName, email,
        } = args.input;
        let newUser = new User({
          auth0ID: uuidv4(),
          firstName,
          lastName,
          userName,
          email,
          lists: [],
        });
        newUser.save().then(() => {
          resolve(newUser);
        }).catch(error => {
          console.log('An error occurred while attempting to save a new user: ', error.message);
          reject(error.message);
        });
      }),
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
            user.lists.push(newList._id);
            user.save().then(() => resolve(newList));
          });
        }).catch(error => {
          console.log('An error occured while attempting to save a new list: ', error.message);
          reject(error.message);
        });
      }),
      createItem: (parent, args, context, info) => new Promise((resolve, reject) => {
        const {
          listId, name, description, details, nextItemId, pictures,
        } = args.input;
        const proj = project(info);
        let newItem = new Item({
          list: listId,
          name,
          description,
          details,
          nextItemId,
          pictures: pictures ? pictures : [],
        });
        newItem.save().then(() => {
          List.findById(newItem.list).then(list => {
            list.items.push(newItem._id);
            list.save().then(() => resolve(newItem));
          });
        }).catch(error => {
          console.log('An error occurred while attempting to save a new item: ', error.message);
          reject(error.message);
        });
      }),
    },
  }),
});

module.exports = schema;