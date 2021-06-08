const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");

class LambdaAuth {
  client;
  constructor(url) {
    this.client = jwksClient({
      jwksUri: url,
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
