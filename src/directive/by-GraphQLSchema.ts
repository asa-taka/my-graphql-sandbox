import {
  graphql,
  GraphQLSchema,
  GraphQLDirective,
  GraphQLObjectType,
  GraphQLString,
  printSchema,
} from 'graphql'

const myDirective = new GraphQLDirective({
  name: 'myDirective',
  locations: ['FIELD'],
  args: {
    age: { type: GraphQLString },
  },
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
      hello: { type: GraphQLString },
    },
  }),
  directives: [myDirective],
})

console.log(printSchema(schema))