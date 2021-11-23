const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");
const { get } = require("lodash");

const isProd =
  process.env.ENV === "prod" || process.env.VERCEL_ENV === "production";

const jwksUri = isProd
  ? "https://gathergg.us.auth0.com/.well-known/jwks.json"
  : "https://unitedingaming.us.auth0.com/.well-known/jwks.json";

const client = jwksClient({ jwksUri });

const verify = (req) => {
  try {
    const authorization =
      get(req, "headers.authorization") || get(req, "headers.Authorization");

    if (!authorization) {
      return {};
    }

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") throw Error("Bearer prefix missing.");
    if (!token) throw Error("Token undefined.");
    return verifyJwt(token);
  } catch (error) {
    console.error(error.message);
    return {};
  }
};

const verifyJwt = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      (header, callback) => {
        client.getSigningKey(header.kid, (err, key) => {
          if (err) console.error(err);
          const signingKey = key.publicKey || key.rsaPublicKey;
          callback(null, signingKey);
        });
      },
      null,
      (err, resp) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(resp);
        }
      }
    );
  });
};

module.exports = { verify };
