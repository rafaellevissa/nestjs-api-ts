# Nest API ts

## 👨🏻‍🔧 Install

You can just install using either docker-compose or runing straight up on your machine.
First of all, you need to set up the .env file at the root folder of the project.

you can find the swagger documentation at `/api`

### Docker

```
docker-compose up -d --build
```

### Linux

Install the libs required using npm

```
npm i
```

Start the server

```
npm run start
```

Run the migrations

```
npm run migration:run
```

Now you're ready to go 🥳🎉!

## 👨‍🔬 Test

```
yarn test
```
