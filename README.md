# WEB APP API

## Description

This repository contains a Node.js API code for the challenge project. It's written on top of [Nest](https://github.com/nestjs/nest) framework.

## Node Version

Node v18.x is required.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## CRUD generation

```bash
# generate a new resource
$ nest g resource <resource-name>
```

## Database migrations

https://www.prisma.io/docs/concepts/components/prisma-migrate

```bash
# Generate and apply a new migration
$ npx prisma migrate dev --name init

# To only generate without applying a new migration, add the --create-only flag
$ npx prisma migrate dev --name init --create-only

#add a new model to the database
$ npx prisma migrate dev --name ${table name}

# Apply the migration
$ npx prisma migrate dev

# Reset the development database and execute seeders
$ npx prisma migrate reset

# Regenerate the client
$ npx prisma generate

# Seed the development database
$ npx prisma db seed
```

## API Query Parameters

- Find one:
  - `include`: prisma include
  - `select`: prisma select
- List:
  - `include`: prisma include
  - `select`: prisma select
  - `orderBy`: prisma orderBy
  - `where`: prisma where
  - `skip`: number of items to skip
  - `take`: number of items to take
  - `includeCount`: include count in the response

## Swagger support

To inspect api endpoints documentation use http://localhost:3000/docs
It's restricted to DEVELOPMENT mode.

## OpenAi

in order to configure the project, we will need to enter OpenAi.
click on this link and generate a new private key.
[user API keys](https://platform.openai.com/settings/profile?tab=api-keys)

this will give you a key.

you'll also need an organization ID to complete all the configuration.

[Organization ID](https://platform.openai.com/settings/organization/general)

## SendGrid

the same thing happens here, we will need to create a new private key to use SendGrid.
click on this link and generate a new private key.
[Send Grid Keys](https://platform.openai.com/settings/organization/general)

## IMAP

To catch all the new RFQs, we have to set up an email listener using IMAP.
It requires an email with its password, host, and port.
