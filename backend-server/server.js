const {cli} = require("./config");

const express = require('express')


const PORT = process.env.DOCKER_MODE === "dev" ? 8043 : 8042;

const app = express()


app.get('/', (req, res) => {
    res.send(cli.queryTip());
})

app.listen(PORT, () => {
    console.log(`Server  listening at http://localhost:${PORT}`)
})
