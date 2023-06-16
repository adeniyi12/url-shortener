# URL SHORTENER BACKEND APP

A backend project developed for to shorten url link generated

### Project Metadata

Stack = Node.js

Database = Mongo DB

Endpoint Test Environment = Postman

Framework = Express.js

Port = 4000

### How to run the app

-Clone the repo

-Open cloned folder and run `npm install`

- Create a new database in MongoDB called `todos`

  -All other details for the db can be found in the .env file

  -Run `npm run dev` to start the application.

  -Use a postman tool to interact with the endpoints. Visit any of the endpoints below with the correct request method

## Endpoints Available

### Users

User Signup - route POST /api/users/signup

User login - route POST /api/users/login

### URL Shortener

Shorten Url - route POST /api/url/shorten

Fetch All Url Created By User - route GET /api/url/all

Edit Url Created By User - route PUT /api/url/edit/:id

Search For Url Created By User - route GET /api/url/search

Url Redirect - route GET /api/url/:shortenedUrl

### Developed by Timmy Adet
