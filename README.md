2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
ai-company-chatbot/
├── server.js           # Main server file
├── index.html         # Frontend chat interface
├── company_qa.json    # Q&A database
├── classifier.json    # Trained classifier data
├── training/
│   └── training_data.js  # Training script
├── package.json
└── README.md
```

## Technologies Used

- **Express.js**: Web server framework
- **Natural**: NLP library for text processing and classification
- **Node.js**: Runtime environment

## Configuration

The chatbot can be configured by modifying:

- `company_qa.json`: Add or modify Q&A pairs
- `training/training_data.js`: Adjust training parameters
- `server.js`: Modify response handling and matching logic

## Training the Chatbot

To train the chatbot with updated Q&A data:

```bash
node training/training_data.js
```

This will:
1. Load the Q&A pairs from company_qa.json
2. Train the classifier
3. Save the trained model to classifier.json

## API Endpoints

### POST /api/chat
Handles chat messages and returns responses.

Request body:
```json
{
    "message": "What AI solutions do you offer?"
}
```

Response:
```json
{
    "response": "Our AI solutions include: Natural Language Processing..."
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Dependencies

```json
{
  "dependencies": {
    "express": "^4.21.2",
    "natural": "^8.0.1",
    "nodemon": "^3.1.9"
  }
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
```

## Error Handling

The chatbot includes:
- Input validation
- Error logging
- Fallback responses for unknown queries
- Server error handling

## Performance

- Fast response times (<100ms)
- Efficient pattern matching
- Optimized training process
- Minimal resource usage

## Security

- Input sanitization
- Rate limiting (recommended for production)
- No sensitive data exposure
- Secure dependencies

## Future Improvements

- Add multi-language support
- Implement conversation context tracking
- Add machine learning for response improvement
- Integrate with external APIs
- Add user feedback mechanism

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@aicompany.com or open an issue in the repository.
