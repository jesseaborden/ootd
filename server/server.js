const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const database = require('./database').database;
const rootRouter = require('./routers');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.use('/api', rootRouter);

app.listen(PORT, () => console.log("Server running on port", PORT));