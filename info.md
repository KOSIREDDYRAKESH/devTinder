# Creating devTinder

- Create a repository
- Intialize the repository
- node-modules,package-lock.json,package.json
- Install express
- Create a server
- Listen to port 7777/....
- Writen a requesting handler for "/,/home,/custom,/..."
- Installed nodemon & update script inside package.json
- what is "-g" while installing npm packages
- what is dependencies?
- difference is "^ vs ~" in versions


# initialize git
- created a git repository on github
- ignore git modules
- push all code to remote origin
- played with route and route extensions
- found that order of the routes matters
- order of the route is very important
- installed postman and made new colletion in new workspace
- tested some api calls
- explored diff kind of routing like ?,+,(),*
- used regex in routes /a/,/.*fly$/
- reading the query params in route,and dynamic routes

# Route handlers
- next function
- next function errors
- next with res.send()
- middleware & need of middleware
- express js handling requests behind the scenes
- made dummy auth middleware


- created a free cluster on mongodb official website
- installed mongoose from npm
- connected the app to database with url
- connection established with database before establishing the server on port 7777
- created a userSchema & userModel
- created a POST api to post dummy user data to database
- validated through postman the POST api

# CRUD / REST api's

- added the express.json as middleware to app
- created a singup api dynamic to recieve data from end user
- created a feed api to get all users from database
- created a delete user api with id
- created a updated a user data api
- have to explore mongoose docs model api's(what r options in patch api)

# SCHEMA VALIDATIONS
- updated the schema 
- added reqiure,unique,minLength,maxLength,trim,default,timestamps
- created a custom validation of gender
- Improved the schema of database by validating the feilds
