const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const indexRouter = require('./routes/index');

const hbs = exphbs.create({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    extname: '.hbs',
    defaultLayout: 'layout'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    });
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));