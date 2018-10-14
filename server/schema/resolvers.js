const { find, filter } = require('lodash');

const users = [
  {id: 1, auth0ID: 1, email: 'wfukui@example.com', firstName: 'Wes', lastName: 'Fukui', userName: 'wFukui'},
  {id: 2, auth0ID: 2, email: 'ahill@example.com', firstName: 'Alex', lastName: 'Hill', userName: 'ahill'},
  {id: 3, auth0ID: 3, email: 'nmcarthur@example.com', firsName: 'Nick', lastName: 'McArthur', userName: 'nMcArthur'},
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
  {id: 1, name: 'Beetle', description: '', details: '', pictures: [], nextItemId: null},
  {id: 2, name: 'Moth', description: '', details: '', pictures: [], nextItemId: 1},
  {id: 3, name: 'Tabby', description: '', details: '', pictures: [], nextItemId: null},
  {id: 4, name: 'Calico', description: '', details: '', pictures: [], nextItemId: 3},
  {id: 5, name: 'German Short-haired Pointer', description: '', details: '', pictures: [], nextItemId: null},
  {id: 6, name: 'Wire-haired Fox Terrier', description: '', details: '', pictures: [], nextItemId: 5},
  {id: 7, name: 'Tree Frog', description: '', details: '', pictures: [], nextItemId: null},
  {id: 8, name: 'Poison-dart Frog', description: '', details: '', pictures: [], nextItemId: 7},
  {id: 9, name: 'Robin', description: '', details: '', pictures: [], nextItemId: null},
  {id: 10, name: 'Crow', description: '', details: '', pictures: [], nextItemId: 9},
  {id: 11, name: 'Piranha', description: '', details: '', pictures: [], nextItemId: null},
  {id: 12, name: 'Shark', description: '', details: '', pictures: [], nextItemId: 11},
];

let itemId = items.length;
let listId = lists.length;
let userId = users.length;

module.exports = {
  Query: {
    users: () => users,
  },

  User: {
    lists: user => filter(lists, {userId: user.id}),
  },

  List: {
    author: list => find(users, {id: list.userId}),
    items: list => filter(items, {listId: list.id}),
  },

  Item: {
    list: item => find(lists, {id: item.listId}),
  },

  Mutation: {
    addItem: (_, input) => {
      const { listId, name, description, details, nextItemId, pictures } = input;
      const item = {
        id: ++ itemId,
        listId,
        name,
        description,
        details,
        nextItemId,
        pictures,
      };
    items.push(item);
    return item;
    }
  },
};