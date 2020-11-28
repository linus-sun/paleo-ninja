const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const mysql = require('mysql')
const bodyParser = require('body-parser')

// set up body parsing
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// set up our database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'paleoninja',
    multipleStatements: true
})


// set up our templating engine
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(express.static(__dirname + '/public'));

// set up our session
app.use(session({
    secret: 'keyboard cat',
    cookie: {}
}))

/**
 * signup should create a new user with the given username and password, log the user in, and redirect the user to
 * the home page
 * (in a real application, we would not store a password in plain text, but it is okay to do so here)
 */
app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query({
                sql: 'INSERT INTO user (username, password) VALUES (?, ?); SELECT LAST_INSERT_ID();',
                values: [username, password],
            }, function (err, result) {
                if (err) {
                    console.error(err)
                    res.send('Could not create account')
                    return
                }
                // If we do not error, we have created the account, lets set our session user id and return to home
                req.session.uid = result[1][0]['LAST_INSERT_ID()']
                res.redirect('/')
            }
        )
    })
})

/**
 * login should log the user in to an account, if one exists, and redirect the user to the home page
 */
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query({
                sql: 'SELECT * FROM user WHERE user.username=? AND user.password=?',
                values: [username, password],
            }, function (err, result) {
                if (err || !result[0]) {
                    console.error(err)
                    res.send('Either user does not exist or username password combination is invalid')
                    return
                }
                // If we do not error, we have found the account, lets set our session user id and redirect to home
                req.session.uid = result[0]['id']
                res.redirect('/')
            }
        )
    })
})

/**
 * post should create a post with the given body if the user is logged in
 */
app.post('/submit', (req, res) => {
    const body = req.body.body
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        // GET DINOSAUR HERE
        connection.query({
                sql: 'INSERT INTO pro-dino (user_id, pro, dino, eating_habits) VALUES(?, ?, ?, ?)',
                values: [req.session.uid, pro, dino, eating_habits],
            }, function (err, result) {
                if (err) {
                    console.error(err)
                    res.send('An error has occurred')
                    return
                }
                // If we do not error, return to home
                res.redirect('/')
            }
        )
    })
})

/**
 * this is our index route, here we should return a list of our posts and comments
 */
app.get('/', (req, res) => {
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query({
                sql: `SELECT * FROM pro-dino ORDER BY RAND() LIMIT 1;`,
            }, function (err, result) {
                if (err) {
                    console.error(err)
                    res.send('An error has occurred')
                    return
                }
                
                user_id = result[0]['id']
                pro = result[0]['pro']
                dino = result[0]['dino']
                eating_habits = result[0]['eating_habits']

                connection.query({
                    sql: `SELECT * FROM user WHERE id = ?`,
                    values: [user_id]
                }, function (err, result) {
                    if (err) {
                        console.error(err)
                        res.send('An error has occurred')
                        return
                    }

                    username = result[0]['username']

                    // DISPLAY THINGS HERE
    
                    res.locals = {
                        data: posts
                    }
                    res.render('index')
                })
                
            })
    })
})

app.get('/submit', (req, res) => {
    res.render('submit')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
