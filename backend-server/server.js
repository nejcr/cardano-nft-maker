import express from 'express';
import { apiErrorHandler, mintRequestValidationSchema } from './apiValidation.js';
import { service } from './service.js';
import cors from 'cors';

const PORT = process.env.DOCKER_MODE === 'dev' ? 8043 : 8042;

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.get('/status', async (req, res) => {
    const response = await service.getStatus();
    res.send(response);
});

app.get('/mint/:id', async (req, res) => {
    const response = await service.getMint(req?.params?.id);
    res.send(response);
});

app.get('/mints', async (req, res) => {
    const response = await service.getMints();
    res.send(response);
});

app.post('/mint', mintRequestValidationSchema, apiErrorHandler, async (req, res) => {
    const mintResponse = await service.createMint(req.body);
    return res.send(mintResponse);
});

app.use((err, req, res, next) => {
    console.log('wtf', err);
    if (err instanceof SyntaxError && 'body' in err) {
        console.error(err);
        return res.status(400).send({ status: 400, message: err.message }); // Bad request
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Server  listening at http://localhost:${PORT}`);
});
