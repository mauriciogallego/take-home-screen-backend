export default () => ({
  defaultInventoryId: process.env.INVENTORY_ID,
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiration: process.env.JWT_EXPIRATION || '10y',
  },
  port: process.env.PORT || 3000,
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    org: process.env.OPENAI_ORG,
  },
  mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
  },
  sendGrid: {
    key: process.env.TAKEHOME_SENDGRID_KEY,
    confirmationTemplateId: process.env.MAIL_TEMPLATE_CONFIRMATION_ID,
  },
});
