import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  directive @upperCase on QUERY | FIELD

  type Document {
    title: String! @upperCase
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
      return { title: 'My Document', content: 'Awesome contents...' }
    }
  }
}

const directiveResolvers = {
  upperCase(resolve, src, args, ctx, info) {
    console.log('aaa')
    const v = resolve(src, args, ctx, info)
    return v.toUppercase()
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers, directiveResolvers })

// const query = `{ hello @myDirective(age: 12) }`
// const query = `{ hello @upperCase }`
const query = `
  fragment Document on Document {
    title   @auth()
    content @upperCase
  }
  query getDocument {
    document {
      ...Document
    }
  }
`

const rootValue = {
  hello: 'world',
}

graphql(schema, query, rootValue).then(console.log, console.error)
