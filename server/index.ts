import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';

const MAX_SAVED_JOKES = 10;

dotenv.config();
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;

const app = express();

mongoose.connect(`mongodb+srv://${dbName}:${dbPassword}@${dbUser}.qpfhrny.mongodb.net/chuck-norris`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const jokeSchema = new mongoose.Schema({
  icon_url: String,
  id: String,
  url: String,
  value: String,
});

const Joke = mongoose.model('Joke', jokeSchema);

app.get('/get-random-joke', async (req, res) => {
  try {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    const jokeData = response.data;

    res.json(jokeData);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Failed to get Chuck Norris joke: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
});

app.post('/save-joke', async (req, res) => {
  try {
    const jokeFromBody = req.body;
    if (!jokeFromBody || !jokeFromBody.icon_url || !jokeFromBody.id || !jokeFromBody.url || !jokeFromBody.value) {
      return res.status(400).json({ error: 'Invalid joke data in request body' });
    }

    const jokeCount = await Joke.countDocuments({});

    if (jokeCount >= MAX_SAVED_JOKES) {
      return res.status(400).json({ error: 'Maximum joke limit reached' });
    }

    const newJoke = new Joke({
      icon_url: jokeFromBody.icon_url,
      id: jokeFromBody.id,
      url: jokeFromBody.url,
      value: jokeFromBody.value,
    });

    await newJoke.save();

    res.json({ message: 'Joke saved successfully', joke: newJoke });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Failed to save Chuck Norris joke: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
});

app.get('/get-saved-jokes', async (req, res) => {
  try {
    const jokesFromDB = await Joke.find({});

    res.json(jokesFromDB);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Failed to get Chuck Norris jokes from DB: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
