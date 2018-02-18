import {
  graphql,
  GraphQLDirective,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  type Query {
    hello: String!
  }
`

const resolvers = {}

const directiveResolvers = {
  myDirective(...args) {
    console.log(...args)
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers, directiveResolvers })

const query = `{ hello @myDirective(age: "12") }`

const rootValue = {
  hello: 'world',
}

graphql(schema, query, rootValue).then(console.log, console.error)
