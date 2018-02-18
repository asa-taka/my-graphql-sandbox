import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  enum CaseType {
    UPPER
    LOWER
    CAMEL
  }

  directive @myDirective(age: Int) on FIELD | QUERY
  directive @upperCase on QUERY | FIELD
  directive @case(type: CaseType) on QUERY | FIELD

  type Document {
    title: String! @case(type: UPPER)
    content: String!
  }

  type Query {
    hello: String!
    document: Document!
  }
`

const resolvers = {
  Query: {
    document() {
      return { title: 'sugoi', content: 'sugoi' }
    }
  }
}

const directiveResolvers = {
  myDirective(resolve, src, args, ctx, info) {
    console.log(resolve, src, args, ctx, info)
    return 'test'
  },
  upperCase(resolve, src, args, ctx, info) {
    console.log('aaa', resolve)
    const v = resolve(src, args, ctx, info)
    return v.toUppercase()
  },
  case(resolve, src, args, ctx, info) {
    console.log('case', resolve)
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers, directiveResolvers })

// const query = `{ hello @myDirective(age: 12) }`
// const query = `{ hello @upperCase }`
const query = `{
  document {
    title   @upperCase
    content @case(type: LOWER)
  }
}`

const rootValue = {
  hello: 'world',
}

graphql(schema, query, rootValue).then(console.log, console.error)
