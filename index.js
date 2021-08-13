const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");
const { get } = require("lodash");

const isProd = process.env.ENV === "prod";

const jwksUri = isProd
  ? "https://gathergg.us.auth0.com/.well-known/jwks.json"
  : "https://unitedingaming.us.auth0.com/.well-known/jwks.json";

const client = jwksClient({ jwksUri });

const verify = (req) => {
  try {
    const [bearer, token] = get(req, "headers.Authorization").split(" ");
    if (bearer !== "Bearer") throw Error("Bearer prefix missing.");
    if (!token) throw Error("Token undefined.");
    return verifyJwt(token);
  } catch (error) {
    console.error(error);
    return {};
  }
};

const verifyJwt = (token) => {
  return new Promise((resolve) => {
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
