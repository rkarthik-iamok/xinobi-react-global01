const CLIENT_ID = process.env.CLIENT_ID || "{clientId}";

let config = {
  oidc: {
    redirectUri: "http://localhost:8000/login/callback",
    clientId: process.env.CLIENT_ID,
    issuer: process.env.ISSUER,
    scopes: ["openid", "email", "profile", "offline_access"],
    pkce: true,
  },
};

export default config;
