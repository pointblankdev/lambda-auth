# lambda-auth

## Usage

Use lambda-auth to `verify()` RS256 JWTs and decode their accessToken.

```ts
const { verify } = require('@pointblankdev/lambda-auth');

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: async ({ event, context }) => {
    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      user: await verify(event),
    };
  },
  playground: {
    endpoint: `/${process.env.ENV}/graphql`,
  },
  introspection: true,
});
```

## Notes

The verify function is asynchronous so you can either await the function like it's been done above or `await context.user` whenever you want to access it
