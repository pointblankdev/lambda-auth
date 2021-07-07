const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");

const client = jwksClient({
  jwksUri: "https://unitedingaming.us.auth0.com/.well-known/jwks.json",
});

const verify = (token) => {
  if (!token) return;
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      (header, callback) => {
        client.getSigningKey(header.kid, (err, key) => {
          const signingKey = key.publicKey || key.rsaPublicKey;
          callback(null, signingKey);
        });
      },
      null,
      (err, resp) => {
        if (err) {
          console.error(err);
          resolve({});
        } else {
          resolve(resp);
        }
      }
    );
  });
};

module.exports = { verify };
