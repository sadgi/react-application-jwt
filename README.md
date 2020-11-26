# Requirements
Install the following:
* [NodeJS](https://nodejs.org/en/download/)
* [nvm](https://github.com/nvm-sh/nvm): Node version manager.
* [yarn](https://classic.yarnpkg.com/en/docs/install/): A better npm.

# Directory Structure
* `client`: This directory hosts the client code. This is created via `npx create-react-app`.
* `server`: This is a basic express server. This also contains the sqlite and sqlite database.

# Setting Up
To run the application:
```shell script
nvm install # Reads the .nvmrc's specified node version, and install it.
nvm use # Use the installed node version in .nvmrc

To play with sqlite:
```shell script
cd server
node ./sqlite_sandbox.js
```

This just performs a basic `SELECT` statement which you will
use on your REST API you will have todo in on this tasks.

# Application
This is simple react and node js based application for authenticating user login using JWT token and then display the list of cuatomers coming from backend in tabular form. We can click on Order details to list the orders of customer chronologically by date and also to show orders and customer details correspondin to customer. Also, we cna change our selection based on customer selected.
The front end of the project is built using react.js and backend is express.js and database is sqlite.

### Assumptions
I have made assumption that user is simply entering the credentials for login there is minimal validation applied at login on Frontend. For now only these 2 users have access. 
* Username: **Test1** Password: test1@mytest.com
* Username: **Test2** Password: test2@mytest.com

### Future Improvements
The application look and feel can be changed instead of making multi paging application i can make it as single page as well as responsive and provide compatibility with different browsers  and put some validation checks on the input from the user.Moreover the application needs some registeration or signup component so that new user can have access to use this application.

Also we can unit testing in the code using JEST or react testing library.
