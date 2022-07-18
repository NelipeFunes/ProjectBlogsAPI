require('dotenv').config();
require('express-async-errors');
const app = require('./api');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRouter');
const loginRoute = require('./routes/loginRouter');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', loginRoute);

app.use('/user', userRouter);

app.use('/categories', categoryRouter);

app.use('/post', postRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
