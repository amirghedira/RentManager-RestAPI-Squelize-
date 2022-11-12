# Overview 
This is another versions of the previous rent manager API made with MySQL with native queries.
Note that all the functionalities are the same with the previous API and the goal here is to use `sequelize` to handle database queries.
You can find more information about the previous version of this API [here](https://www.amirghedira.com/project/RentManager-RestAPI(MySQL)/NodeJS%20-%20Express%20-%20MySQL/5ea8a607a8f9a400174139d5)

# Platform & Libraries 

``` json
"dependencies": {
        "bcrypt": "^4.0.1",
        "body-parser": "^1.19.0",
        "express": "^4.17.1",
        "jsonwebtoken": "^8.5.1",
        "multer": "^1.4.2",
        "mysql2": "^2.1.0",
        "sequelize": "^4.41.2"
    },
    "devDependencies": {
        "nodemon": "^2.0.3"
    }
```

I will begin with the basic packages:

## nodemon:
These packages allow you to restart the server whenever you save your code, but also you can create with it environment variables, you can add a file called nodemon.json, and you add your environment variables such as your database credential.
link: [https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)
## express: 
Which is the framework I used to develop this RestApi

link:[https://www.npmjs.com/package/express](https://www.npmjs.com/package/express)
## body-parser:
I added this package because I was working with a front end, this package allows you to parse incoming requests and parse the body. If you don't have a front end, and u will use postman, you can simply use this code in app.js file without the package itself.

``` javascript
app.use(express.json())
```
Link: [https://www.npmjs.com/package/body-parser](https://www.npmjs.com/package/body-parser)

## jsonwebtoken:
This package is responsible for manipulating tokens and check for user authentication. Also, you can store data in the token as a payload, and then get it back from the request.

Link: [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## multer:
This package is very useful to manipulate files such as saving them deleting them, you can also edit their names before saving them. it's really simple to use and to configure.

Link: [https://www.npmjs.com/package/multer](https://www.npmjs.com/package/multer)

## Sequelize/mysql2:
These are the basic packages to build a rest API with MySQL database. Actually, sequelize makes interactions with database a bit easier for someone who don't know MySQL language. It provides a built in functions that you use them to fetch , store and update data without writing MySQL queries. Also to make all this work `sequelize` and `mysql2` packages are needed to convert behind the scenes the functions provided by Sequelize into MySQL queries before hitting the database.

Link: [https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)

Link: [https://www.npmjs.com/package/sequelize](https://www.npmjs.com/package/sequelize) 

# What I learned ?
 Although, I have a good experience in writing MySQL queries, this library doesn't help me personally that much but Sequelize allows you to write much cleaner code and readable from a non-SQL programmer. Also, this huge library provides too many methods to cover all types of MySQL queries you have to know them and learn them and also practice them.
Finally, as mongoose that provides schemas and models to store data, `sequelize` have the same strategy by creating models and manipulating them with specific schemas in which you precise your database columns with their specific types.