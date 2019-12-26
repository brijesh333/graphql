const graphql = require('graphql');

const books = [{
        name: 'abc',
        genere: 'Fantasy',
        id: '1',
        authorId: "1"
    },
    {
        name: 'def',
        genere: 'Fantasy',
        id: '2',
        authorId: "2"
    },
    {
        name: 'xyz',
        genere: 'Sci-Fi',
        id: '3',
        authorId: "3"
    }
];

const authors = [{
        name: 'auth 1',
        age: 11,
        id: '1'
    },
    {
        name: 'auth 2',
        age: 22,
        id: '2'
    },
    {
        name: 'auth 3',
        age: 33,
        id: '3'
    }
]

const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genere: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {
                    id: parent.authorId
                })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // code to get data from other DB
                return _.find(books, {
                    id: args.id
                })
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return _.find(authors, {
                    id: args.id
                })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});