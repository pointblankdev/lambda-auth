# lambda-auth

## Usage

Use lambda-auth to `verify()` RS256 JWTs and decode their session.

```ts
const { verify } = require("@pointblankdev/lambda-auth");

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: ({ event, context }) => {
    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      user: verify(event.headers.Authorization),
    };
  },
  playground: {
    endpoint: `/${process.env.ENV}/graphql`,
  },
  introspection: true,
});
```
