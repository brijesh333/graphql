const graphql = require('graphql');

const books = [
    {
        name: 'abc',
        genere: 'Fantasy',
        id: '1'
    },
    {
        name: 'def',
        genere: 'Fantasy',
        id: '2'
    },
    {
        name: 'xyz',
        genere: 'Sci-Fi',
        id: '3'
    }
]

const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        genere: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                // code to get data from other DB
                return _.find(books, {
                    id: args.id
                })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});