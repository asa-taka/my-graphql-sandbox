import { GraphQLSchema, GraphQLObjectType, GraphQLString, printSchema } from 'graphql'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'rootQuery',
    description: 'This is Root Query',
    fields: {
      hello: {
        type: GraphQLString,
        description: 'Greeting',
      },
    },
  }),
})

console.log(printSchema(schema))
console.log(printSchema(schema, { commentDescriptions: true }))
