import {
  graphql,
  GraphQLSchema,
  GraphQLDirective,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

const myDirective = new GraphQLDirective({
  name: 'myDirective',
  locations: ['FIELD'],
  args: {
    age: {
      type: GraphQLString,
    },
  },
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
      hello: {
        type: GraphQLString,
        resolve(src, args, ctx, info) {
          console.log(info.fieldNodes[0].directives[0])
        }
      },
    },
  }),
  directives: [myDirective],
})

const query = `{ hello @myDirective(age: "12") }`

const rootValue = {
  hello: 'world',
}

graphql(schema, query, rootValue).then(console.log, console.error)
