# nodejs-chat

### Architecture overview

This projects is composed of 3 sub parts.

#### Service

Responsible for hosting both a http server and a web socket server.

- The http will serve users with authentication/login and handle chat posts.
- The web socket will broadcast messages to other users.

All the posts sent on the chat are saved, unless they are commands, which are sent to the bot and are not persisted.

#### Bot

Receives commands and answer the command with a chat sentence, that is sent back to the Service to be broadcast to other users.
The only available command for this release is "stock".

#### Client

Browser app. Contains only two pages: /login and /chat.
When the users opens the chat windows, they get the last 50 messages of the history of the chat rendered.

### How to run the application

You will need to build and start the 3 apps individually.

1. First, run `docker-compose up` in order to start RabbitMQ and Postgresql instances.
2. Go to chat-bot, run `yarn` then run `yarn start`
3. Go to chat-service, run `yarn` then run `yarn start`
4. Go to chat-client, run `yarn` then run `yarn start`

That's it! :)

### Creating users

You need to be an admin to add users.
Considering you already put up the chat-service:

1. Using postman or curl, send a post request to `localhost:8080/auth/login` sending the admins credentials as body.

body (JSON):
```
{
	"userName": "admin",
	"password": "admin"
}
```

2. Now you should be logged in to the service! Copy the JWT token that comes as response from the previous request, you'll use it on the next step.
3. Send another post request to `localhost:8080/user` sending the credentials you want to create, also send the jwt as a auth header.

header:
`auth: <YOUR JWT>`

body (JSON):

```
{
	"userName": "foo",
	"password": "bar",
  	"role": "USER"
}
```

4. The user has been created!

### How to use the app

1. Once you started everything, go to `localhost:3000`
2. You should see a login page
3. Enter the credentials and submit
4. You should see the chat pages. All messages there will be broadcasted to you and other logged in folks.
5. We display the last 50 messages as history once you log in.
6. You can send commands to our bot by using `/stock=<stock title>`


