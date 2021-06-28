const express = require('express')

const PORT = process.env.DOCKER_MODE === "dev" ? 8043 : 8042;

const app = express()


app.get('/', (req, res) => {
    res.send('42');
})

app.listen(PORT, () => {
    console.log(`Server  listening at http://localhost:${PORT}`)
})
