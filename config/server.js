module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
 //  url: env("PUBLIC_URL", "http://3.19.83.70:1337"),
 url: env("PUBLIC_URL", "https://api.webbertech.com"),

});
