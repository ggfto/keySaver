const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./app/views'));

app.get('/ping', (req, res) => {
    res.json({ message: "Pong!" })
});

require('./app/routes/key.routes')(app);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
});