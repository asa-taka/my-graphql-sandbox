import { graphql, buildSchema, introspectionQuery, buildClientSchema } from 'graphql'
import * as g from 'graphql'

const schema = buildSchema(`
  type Query {
    hello: String!
  }
`)

graphql(schema, introspectionQuery).then(res => {
  console.log(res)
  const clientSchema = buildClientSchema(res.data)
  console.log(clientSchema)
})
