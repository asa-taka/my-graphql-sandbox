import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  directive @auth(permitted: [String!]) on FIELD

  type Document {
    title: String!
    content: String! @auth(permitted: ["asa-taka"])
  }

  type Query {
    document: Document!
  }
`

const directiveResolvers = {
  auth(next, src, args, ctx, info) {
    return next().then(res => {
      if (args.permitted.includes(ctx.auth.name)) return res
      const path = info.path
      throw new Error(`User not permitted: ${path.prev.key}.${path.key}`)
    })
  },
}

const schema = makeExecutableSchema({ typeDefs, directiveResolvers })

const query = `{
  document { title }
}`

const rootValue = {
  document: { title: 'My Document', content: 'Awesome contents...' },
}

const context = { auth: { name: 'sasa-taka' } }

graphql(schema, query, rootValue, context).then(console.log, console.error)
