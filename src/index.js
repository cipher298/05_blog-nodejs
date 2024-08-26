const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const router = require('./routes/index');
const app = express();
const port = 3000;
const db = require('./config/db');
const methodOverride = require('method-override');

// Middleware
app.use(express.urlencoded());
app.use(express.json());

// Connect to DB
db.connect();

// Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Template Engine
app.engine(
  'hbs',
  engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// HTTP request logger middleware
// app.use(morgan("combined"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Router init
router(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
