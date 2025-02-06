const express = require('express');
const app = express();

app.use(express.json());

// In-memory storage for messages
let messages = [];

// POST endpoint to simulate sending a message
app.post('/messages', (req, res) => {
    const { sender, receiver, content } = req.body;

    // Basic validation
    if (!sender || !receiver || !content) {
        return res.status(400).json({ error: 'sender, receiver, and content are required.' });
    }

    const newMessage = {
        id: messages.length + 1,
        sender,
        receiver,
        content,
        timestamp: new Date()
    };

    messages.push(newMessage);
    res.status(201).json({ message: 'Message sent!', data: newMessage });
});

// GET endpoint to retrieve conversation between two users
app.get('/messages', (req, res) => {
    const { sender, receiver } = req.query;

    // If both sender and receiver are provided, filter the conversation
    if (sender && receiver) {
        const conversation = messages.filter(message =>
            (message.sender === sender && message.receiver === receiver) ||
            (message.sender === receiver && message.receiver === sender)
        );
        return res.status(200).json(conversation);
    }

    // If no filtering, return all messages
    res.status(200).json(messages);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
