import { Router } from "express";
import EventModel from "../models/Event";

const router = Router();

// Get all events
router.get("/api/events", async (req, res) => {
  try {
    const events = await EventModel.find({});
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Error fetching events" });
  }
});

// Search events
router.get("/api/events/search/:searchTerm", async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const events = await EventModel.find({
      name: { $regex: new RegExp(searchTerm, "i") },
    });
    res.json(events);
  } catch (err) {
    console.error("Error searching events:", err);
    res.status(500).json({ error: "Error searching events" });
  }
});

// Get events by tag
router.get("/api/events/tag/:tagName", async (req, res) => {
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
router.get("/api/events/:eventId", async (req, res) => {
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
router.post("/api/events", async (req, res) => {
  try {
    const newEvent = new EventModel(req.body);
    await newEvent.save();
    res.json(newEvent);
  } catch (err) {
    const error = err as Error;
    console.error("Error adding event:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Update event
router.put("/api/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const updatedEvent = await EventModel.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });
    res.json(updatedEvent);
  } catch (err) {
    const error = err as Error;
    console.error("Error updating event:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Delete event
router.delete("/api/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    await EventModel.findByIdAndDelete(eventId);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    const error = err as Error;
    console.error("Error deleting event:", error.message);
    res.status(400).json({ error: error.message });
  }
});
