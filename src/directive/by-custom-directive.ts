import {
  graphql,
  GraphQLSchema,
  GraphQLDirective,
  GraphQLObjectType,
  GraphQLString,
  printSchema,
} from 'graphql'

import {
  GraphQLCustomDirective,
  applySchemaCustomDirectives,
} from 'graphql-custom-directives'

const withAge = new GraphQLCustomDirective({
  name: 'withAge',
  locations: ['FIELD'],
  args: {
    age: {
      type: GraphQLString,
    },
  },
  resolve(resolve, src) {
    return resolve().then(res => res + 'with!')
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
      hello: { type: GraphQLString },
    },
  }),
  directives: [withAge],
})

console.log(schema._queryType._fields instanceof Object)
// console.log(printSchema(schema))
applySchemaCustomDirectives(schema)


const query = `{ hello @withAge(age: "12") }`

const rootValue = {
  hello: 'world',
}

graphql(schema, query, rootValue).then(console.log, console.error)
