import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import finnhub from 'finnhub';

const app = express();

dotenv.config(); // allows us to use environment variables

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // allows react to send requests to express

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.REACT_APP_FINNHUB_KEY
const finnhubClient = new finnhub.DefaultApi();

app.get('/', (req, res) => {
    res.send('working server')
});

// client requests quote with ticker
app.get('/quote', (req, res) => {
    finnhubClient.quote(req.query.ticker, (error, data, response) => {
        if(error) {
            res.send(error)
        }
        res.send(data)
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});