const { verify } = require("./index");

const JWT =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhvZlc5MlEwVDJXWUZTSjlrWExZRSJ9.eyJodHRwczovL2dhdGhlci5nZy9yb2xlcyI6WyJBZG1pbiJdLCJodHRwczovL2dhdGhlci5nZy9yZWdpc3RlcmVkIjp0cnVlLCJpc3MiOiJodHRwczovL3VuaXRlZGluZ2FtaW5nLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MGI1MmFmNTQwMmViMDAwNjg0ZmE0MzciLCJhdWQiOlsiaHR0cHM6Ly9zcHcyZmVwcWE0LmV4ZWN1dGUtYXBpLmFmLXNvdXRoLTEuYW1hem9uYXdzLmNvbSIsImh0dHBzOi8vdW5pdGVkaW5nYW1pbmcudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYyNzUwMjIwMywiZXhwIjoxNjI3NTg4NjAzLCJhenAiOiJrNHB0TmNnVFF4Tkh0cjJ3dVFQMTFkRFhYcTB2WkNHSCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6W119.XmDiIPOLPCtbbprVAXqwEzErOKzJsRQmC7QdQclzB0t7CYc5X2K-E6PMnxmCndWn3KBDRZ-JGeNWORltgvbagu7QMsJl0bc5t7dokbqYBIjHqN5VVdl_nen16CBXhxVUsd6ZpNT6eydcbneNhu9wOcfdEZyGFM5uk-z38uQV8PZfgD_QTDZjJyOQhSYTXL2AGTbq4IBqgez6Cl36GswR2eOHysVv6Qpm8lfNDy5dM2uIZpAsnTd_IWov6sd4BJxOfXLykntjC3wVtWqE0-2pt6HsNX2NaLbdTb7E2L5cEyfyQ7UynbNfLBkQefpoCJtOwmMUbfHLBXK9nl_dx2-AOw";

describe("JWT Verification", () => {
  it("should invalidate a malformed JWT", async () => {
    const bad = await verify({ headers: { Authorization: `Bearer asdasda` } });
  });
  it("should validate a good JWT", async () => {
    const good = await verify({ headers: { Authorization: `Bearer ${JWT}` } });
    console.log(good);
  });
});
