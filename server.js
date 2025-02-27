import express from 'express';
import natural from 'natural';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize NLP tools
const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();

// Initialize intent patterns
const intents = {
    greeting: {
        patterns: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
        responses: ['Hello! How can I help you?', 'Hi there! What can I do for you?']
    },
    goodbye: {
        patterns: ['bye', 'goodbye', 'see you', 'see you later', 'good night'],
        responses: ['Goodbye!', 'Have a great day!', 'See you later!']
    },
    // Add more intents as needed
};

// Function to load and process company data
function loadCompanyData() {
    try {
        const data = JSON.parse(fs.readFileSync('company_qa.json', 'utf8'));
        // Train the classifier with company Q&A pairs
        data.forEach(qa => {
            classifier.addDocument(qa.question, qa.category);
            intents[qa.category] = {
                patterns: [qa.question],
                responses: [qa.answer]
            };
        });
        classifier.train();
        return true;
    } catch (error) {
        console.error('Error loading company data:', error);
        return false;
    }
}

// Function to find the best matching response
function findBestResponse(message) {
    // Tokenize and normalize input
    const tokens = tokenizer.tokenize(message.toLowerCase());
    
    // Try to classify the message
    const category = classifier.classify(message);
    if (intents[category]) {
        const responses = intents[category].responses;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Fallback to token matching if classification fails
    let bestMatch = {
        intent: null,
        score: 0
    };

    // Compare tokens with each intent's patterns
    Object.entries(intents).forEach(([intent, data]) => {
        data.patterns.forEach(pattern => {
            const patternTokens = tokenizer.tokenize(pattern.toLowerCase());
            let matchScore = 0;
            
            tokens.forEach(token => {
                if (patternTokens.includes(token)) {
                    matchScore++;
                }
            });

            const score = matchScore / Math.max(tokens.length, patternTokens.length);
            if (score > bestMatch.score) {
                bestMatch = { intent, score };
            }
        });
    });

    if (bestMatch.score > 0.3) { // Threshold for matching
        const responses = intents[bestMatch.intent].responses;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    return "I'm not sure how to respond to that. Could you please rephrase your question?";
}

// Load company data
loadCompanyData();

// Chat endpoint
app.post('/api/chat', (req, res) => {
    try {
        const { message } = req.body;
        const response = findBestResponse(message);
        res.json({ response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});