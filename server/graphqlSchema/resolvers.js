const { find, filter } = require('lodash');
const { User } = require('../mongodbModels/user');
const { List } = require('../mongodbModels/list');
const uuidv4 = require('../util/uuidv4');

const users = [
  {id: 1, auth0ID: 1, email: 'wfukui@example.com', firstName: 'Wes', lastName: 'Fukui', userName: 'wFukui'},
  {id: 2, auth0ID: 2, email: 'ahill@example.com', firstName: 'Alex', lastName: 'Hill', userName: 'ahill'},
  {id: 3, auth0ID: 3, email: 'nmcarthur@example.com', firstName: 'Nick', lastName: 'McArthur', userName: 'nMcArthur'},
];

const lists = [
  {id: 1, userId: 1, title: 'Bugs', category: 'Animals', subCategories: [], size: null},
  {id: 2, userId: 1, title: 'Cats', category: 'Animals', subCategories: [], size: null},
  {id: 3, userId: 2, title: 'Dogs', category: 'Animals', subCategories: [], size: null},
  {id: 4, userId: 2, title: 'Frogs', category: 'Animals', subCategories: [], size: null},
  {id: 5, userId: 3, title: 'Birds', category: 'Animals', subCategories: [], size: null},
  {id: 6, userId: 3, title: 'Fish', category: 'Animals', subCategories: [], size: null},
];

const items = [
  {id: 1, listId: 1, name: 'Beetle', description: '', details: '', pictures: [], nextItemId: null},
  {id: 2, listId: 1, name: 'Moth', description: '', details: '', pictures: [], nextItemId: 1},
  {id: 3, listId: 2, name: 'Tabby', description: '', details: '', pictures: [], nextItemId: null},
  {id: 4, listId: 2, name: 'Calico', description: '', details: '', pictures: [], nextItemId: 3},
  {id: 5, listId: 3, name: 'German Short-haired Pointer', description: '', details: '', pictures: [], nextItemId: null},
  {id: 6, listId: 3, name: 'Wire-haired Fox Terrier', description: '', details: '', pictures: [], nextItemId: 5},
  {id: 7, listId: 4, name: 'Tree Frog', description: '', details: '', pictures: [], nextItemId: null},
  {id: 8, listId: 4, name: 'Poison-dart Frog', description: '', details: '', pictures: [], nextItemId: 7},
  {id: 9, listId: 5, name: 'Robin', description: '', details: '', pictures: [], nextItemId: null},
  {id: 10, listId: 5, name: 'Crow', description: '', details: '', pictures: [], nextItemId: 9},
  {id: 11, listId: 6, name: 'Piranha', description: '', details: '', pictures: [], nextItemId: null},
  {id: 12, listId: 6, name: 'Shark', description: '', details: '', pictures: [], nextItemId: 11},
];

let itemId = items.length;
let listId = lists.length;

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
    lists: user => List.find({userId: user.id}).then(lists => lists).catch(error => {
      console.log('An error occurred while attempting to retrieve a user\'s lists from MongoDB: ', error);
      return [];
    }),
    // lists: user => filter(lists, {userId: Number(user.id)}),
  },

  List: {
    // author: list => find(users, {id: Number(list.userId)}),
    author: list => User.findById(list.userId).then(user => user).catch(error => {
      console.log('An error occurred while attempting to retrieve a user\'s author from MongoDB: ', error);
      return null;
    }),
    items: list => filter(items, {listId: Number(list.id)}),
  },

  Item: {
    list: item => find(lists, {id: Number(item.listId)}),
  },

  Mutation: {
    addItem: (_, args) => {
      const item = {
        id: ++ itemId,
        ...args.input,
      };
      items.push(item);
      return item;
    },
    createList: (_, args) => new Promise((resolve, reject) => {
      // const list = {
      //   id: ++ listId,
      //   ...args.input,
      //   subCategories: [],
      //   size: 10,
      // };
      // lists.push(list);
      // return list;
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