export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiration: process.env.JWT_EXPIRATION || '10y',
  },
  port: process.env.PORT || 3000,
  openAIApiKey: process.env.OPENAI_API_KEY,
  mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
