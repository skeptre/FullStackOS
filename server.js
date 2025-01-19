require('dotenv').config();
const express = require('express');
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require("./app/routes/user.server.routes");
const eventRoutes = require("./app/routes/event.server.routes");
const questionRoutes = require("./app/routes/question.server.routes");
const searchRoutes = require("./app/routes/search.server.routes");
const attendanceRoutes = require("./app/routes/attendance.server.routes");


const app = express();
app.use(cors());

// Server port
const HTTP_PORT = 3333;

// Start server
app.listen(HTTP_PORT, () => {
    console.log('Server running on port: ' + HTTP_PORT);
});

// Logging
app.use(morgan('tiny'));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root endpoint
app.get('/', (req, res, next) => {
    res.json({'status': 'Alive'});
});

// Other API endpoints: Links go here...
// You can uncomment the below four lines as you implement the functionality - we'll discuss this structure in week three.
app.use('/', userRoutes);
app.use('/events', eventRoutes);
app.use('/questions', questionRoutes);
app.use('/search', searchRoutes);
app.use('/attendance', attendanceRoutes);


// Default response for any other request
app.use((req, res) => {
    res.sendStatus(404);
});