const { User } = require('../mongodbModels/user');
const { List } = require('../mongodbModels/list');
const { Item } = require('../mongodbModels/item');
const uuidv4 = require('../util/uuidv4');

module.exports = {
  Query: {
    users: () => User.find({})
      .then(users => users)
      .catch(error => {
        console.log('An error occurred while attempting to retrieve users from MongoDB: ', error);
        return [];
      }),
  },

  User: {
    // lists: user => List.find({userId: user.id}).then(lists => lists).catch(error => {
    //   console.log('An error occurred while attempting to retrieve a user\'s lists from MongoDB: ', error);
    //   return [];
    // }),
  },

  List: {
    // author: list => User.findById(list.userId).then(user => user).catch(error => {
    //   console.log('An error occurred while attempting to retrieve a list\'s author from MongoDB: ', error);
    //   return null;
    // }),
    author: list => User.findOne({lists: {$in: [list._id]}}).then(user => user).catch(error => {
        console.log('An error occurred while attempting to retrieve a list\'s author from MongoDB: ', error);
        return null;
      }),
    items: list => Item.find({listId: list.id}).then(items => items).catch(error => {
      console.log('An error occurred while attempting to retrieve a list\'s items from MongoDB: ', error);
      return [];
    }),
  },

  Item: {
    // list: item => find(lists, {id: Number(item.listId)}),
    list: item => List.findById(item.listId).then(list => list).catch(error => {
      console.log('An error occurred while attempting to retrieve an item\'s parent list: ', error);
      return null;
    }),
  },

  Mutation: {
    createItem: (_, args) => new Promise((resolve, reject) => {
      const {
        listId, name, description, details, nextItemId, pictures,
      } = args.input;
      let newItem = new Item({
        listId,
        name,
        description,
        details,
        nextItemId,
        pictures: pictures ? pictures : [],
      });
      newItem.save().then(()=> {
        resolve(newItem);
      }).catch(error => {
        console.log('An error occurred while attempting to save a new item: ', error.message);
        reject(error.message);
      });
    }),

    createList: (_, args) => new Promise((resolve, reject) => {
      const {
        userId, title, category,
      } = args.input;
      let newList = new List({
        userId,
        title,
        category,
        subCategories: [],
        size: 10,
        items: [],
      });
      newList.save().then(() => {
        resolve(newList);
      }).catch(error => {
        console.log('An error occured while attempting to save a new list: ', error.message);
        reject(error.message);
      });
    }),

    createUser: (_, args) => new Promise((resolve, reject) => {
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
      newUser.save()
      .then(() => {
        resolve(newUser);
      }).catch(error => {
        console.log('An error occurred while attempting to save a new user: ', error.message);
        reject(error.message);
      });
    }),
  },
};