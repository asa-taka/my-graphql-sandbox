import { graphql, buildSchema } from 'graphql'

const schema = buildSchema(`
directive @myDirective(age: Int) on FIELD

type Query {
  hello: String!
}
`)

const query = `{ hello @myDirective(age: 12) }`

const rootValue = {
  hello: 'world',
}

graphql(schema, query, rootValue).then(console.log, console.error)