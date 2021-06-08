const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");

class LambdaAuth {
  client;
  constructor(url) {
    this.client = jwksClient({
      jwksUri: "https://unitedingaming.us.auth0.com/.well-known/jwks.json" || url,
    });
  }

  useJwks = (token) =>
    new Promise((resolve, reject) => {
      jwt.verify(
        token,
        (header, callback) => {
          this.client.getSigningKey(header.kid, (err, key) => {
            const signingKey = key.publicKey || key.rsaPublicKey;
            callback(null, signingKey);
          });
        },
        null,
        (err, resp) => resolve(resp)
      );
    });
}

module.exports = LambdaAuth;
