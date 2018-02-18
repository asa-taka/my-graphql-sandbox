import {
  graphql,
  buildSchema,
  GraphQLScalarType,
  GraphQLObjectType,
  GraphQLSchema,
  introspectionQuery,
} from 'graphql'

const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  serialize(value) {
    return new Date(value)
  },
  parseValue(value) {
    console.log('parseValue', value)    
  },
  parseLiteral(value) {
    console.log('parseLiteral', value)    
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
      now: {
        type: GraphQLDate,
      },
    },
  }),
  // types: [
  //   GraphQLDate,
  // ]
})

graphql(schema, `{ now }`, Date).then(console.log, console.error)
