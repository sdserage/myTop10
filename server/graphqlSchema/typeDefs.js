module.exports = `
  type User {
    id: ID!
    auth0ID: String! # Will be changed to ID if allowed. must be unique
    firstName: String!
    lastName: String!
    userName: String
    email: String! # must be unique
    lists: [List]!
  }

  type List {
    id: ID!
    author: User
    title: String!
    category: String! #will be changed to enum
    subCategories: [String]!
    size: Int # The size of the list, anything items whose rank exceeds the size value will be honorable mentions.
    items: [Item]!
    # displayHonrableMentions: Bool # Determines whether or not to include the honorable mentions. This should probably be a variable for resolvers instead.
  }

  type Item {
    id: ID!
    list: List
    name: String!
    description: String!
    nextItem: Item # If null this Item is #1 in a list
    details: String! # probably needs to be its own type
    pictures: [String]! # could end up being its own type
  }

  input ItemInput {
    listId: ID!
    name: String!
    description: String!
    details: String!
    nextItemId: ID
    pictures: [String]
  }

  input ListInput {
    userId: ID!
    title: String!
    category: String!
  }

  input UserInput {
    email: String!
    firstName: String!
    lastName: String!
    userName: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createItem (input: ItemInput): Item
    createList (input: ListInput): List
    createUser (input: UserInput): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;