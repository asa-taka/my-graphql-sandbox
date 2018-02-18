import {
  graphql,
  buildSchema,
  introspectionQuery,
  buildClientSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLDirective,
} from 'graphql'
import * as g from 'graphql'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
      hello: {
        type: GraphQLString,
      },
    },
  }),
  directives: [
    new GraphQLDirective({
      name: 'myDirective',
      locations: ['QUERY', 'FIELD'],
      args: {
        age: {
          type: GraphQLString,
        },
      },
    }),
  ],
})

graphql(schema, introspectionQuery).then(res => {
  console.log(res)
  const clientSchema = buildClientSchema(res.data)
  console.log(clientSchema)
})
