
# Rakamin Test Coding

## CHAT API

## Environment Variables Soccer API

To run Soccer API, you will need to add the following environment variables to your .env file

`HOST`  `PORT` `PGUSER` `PGHOST`  `PGPASSWORD`  `PGDATABAS` `PGPORT`


## Features CHAT API

- Adding User
- List User
- Login User
- Send message
- Reply message
- List Message by ConversationId
- List Message by invloved


## Deployment CHAT API
To create migration
```bash
  cd chatapi/
  npm run migrate up
```

To deploy this project run in Production
```bash
  cd chatapi/
  npm run start-prod
```

To deploy this project run in Development

```bash
  cd chatapi/
  npm run start-dev
```

To run unit testing
```bash
  cd chatapi/
  npm run start-test
```

## Documentation
Documentation in Postman
```bash
  chatapi/postman/Rakamin ChatApi.postman_collection.json
```


## Tech Stack

**Server:** Node,Postgres, Hapi Framework


## Authors

- [@BayuAnggoroSakti](https://github.com/BayuAnggoroSakti)

