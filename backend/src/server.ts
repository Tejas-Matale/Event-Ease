import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import EventModel from "./models/Event";
import bodyParser from 'body-parser';
import userModel, { IUser } from "./models/User";
import jwt from "jsonwebtoken"
import UserModel from "./models/User";

const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/event')
    .then(() => {
        console.log("MongoDB connection open");
    })
    .catch(err => {
        console.log("MongoDB connection error");
        console.error(err);
    });

// Get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await EventModel.find({});
        res.json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ error: "Error fetching events" });
    }
});

// Search events
app.get('/api/events/search/:searchTerm', async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm;
        const events = await EventModel.find({ name: { $regex: new RegExp(searchTerm, "i") } });
        res.json(events);
    } catch (err) {
        console.error("Error searching events:", err);
        res.status(500).json({ error: "Error searching events" });
    }
});

// Get events by tag
app.get('/api/events/tag/:tagName', async (req, res) => {
    try {
        const tagName = req.params.tagName;
        const events = await EventModel.find({ tags: tagName });
        res.json(events);
    } catch (err) {
        console.error("Error fetching events by tag:", err);
        res.status(500).json({ error: "Error fetching events by tag" });
    }
});

// Get event by ID
app.get("/api/events/:eventId", async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await EventModel.findById(eventId);
        res.json(event);
    } catch (err) {
        console.error("Error fetching event:", err);
        res.status(500).json({ error: "Error fetching event" });
    }
});

// Insert new event
app.post('/api/events', async (req, res) => {
    try {
        const newEvent = new EventModel(req.body);
        await newEvent.save();
        res.json(newEvent);
    } catch (err) {
        const error = err as Error;
        console.error('Error adding event:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// Update event
app.put('/api/events/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const updatedEvent = await EventModel.findByIdAndUpdate(eventId, req.body, { new: true });
        res.json(updatedEvent);
    } catch (err) {
        const error = err as Error;
        console.error('Error updating event:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// Delete event
app.delete('/api/events/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        await EventModel.findByIdAndDelete(eventId);
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        const error = err as Error;
        console.error('Error deleting event:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// User Login Route
app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user: IUser | null = await UserModel.findOne({ email, password });
      if (user) {
        res.send(generateTokenResponse(user));
      } else {
        res.status(400).send('User name or password is not valid');
      }
    } catch (err) {
      const error = err as Error;
      console.error('Error logging in:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Token Generation
  const generateTokenResponse = (user: IUser) => {
    const token = jwt.sign({
      email: user.email,
      isAdmin: user.isAdmin
    }, 'SomeRandomText', {
      expiresIn: '30d'
    });
  
    // Add token to the user object
    return {
      ...user.toObject(),
      token
    };
  };


const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
