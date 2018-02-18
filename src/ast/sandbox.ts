import { parse, buildASTSchema } from 'graphql'

const typeDefs = `
type Query {
  hello: String!
}
`

const ast = parse(typeDefs)
console.log(ast)
// console.log(JSON.stringify(ast, null, 2))

const schema = buildASTSchema(ast)
// console.log(schema)

// console.log(printSchema(schema))