"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const MAX_SAVED_JOKES = 10;
dotenv_1.default.config();
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const app = (0, express_1.default)();
mongoose_1.default.connect(`mongodb+srv://${dbName}:${dbPassword}@${dbUser}.qpfhrny.mongodb.net/chuck-norris`);
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
const jokeSchema = new mongoose_1.default.Schema({
    icon_url: String,
    id: String,
    url: String,
    value: String,
});
const Joke = mongoose_1.default.model('Joke', jokeSchema);
app.get('/get-random-joke', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://api.chucknorris.io/jokes/random');
        const jokeData = response.data;
        res.json(jokeData);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: `Failed to get Chuck Norris joke: ${error.message}` });
        }
        else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
}));
app.post('/save-joke', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jokeFromBody = req.body;
        if (!jokeFromBody || !jokeFromBody.icon_url || !jokeFromBody.id || !jokeFromBody.url || !jokeFromBody.value) {
            return res.status(400).json({ error: 'Invalid joke data in request body' });
        }
        const jokeCount = yield Joke.countDocuments({});
        if (jokeCount >= MAX_SAVED_JOKES) {
            return res.status(400).json({ error: 'Maximum joke limit reached' });
        }
        const newJoke = new Joke({
            icon_url: jokeFromBody.icon_url,
            id: jokeFromBody.id,
            url: jokeFromBody.url,
            value: jokeFromBody.value,
        });
        yield newJoke.save();
        res.json({ message: 'Joke saved successfully', joke: newJoke });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: `Failed to save Chuck Norris joke: ${error.message}` });
        }
        else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
}));
app.get('/get-saved-jokes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jokesFromDB = yield Joke.find({});
        res.json(jokesFromDB);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: `Failed to get Chuck Norris jokes from DB: ${error.message}` });
        }
        else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
}));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
