import { Request, Response } from 'express';
import Note from '../models/Note.ts';
import formatResponse from '../utils/formatResponse.ts';

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ tripId: req.params.tripId }).sort({ createdAt: -1 });
    res.status(200).json(formatResponse(true, 'Notes fetched', notes));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to fetch notes'));
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(formatResponse(true, 'Note created', note));
  } catch (error) {
    res.status(400).json(formatResponse(false, 'Failed to create note'));
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(formatResponse(true, 'Note updated', note));
  } catch (error) {
    res.status(400).json(formatResponse(false, 'Failed to update note'));
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json(formatResponse(true, 'Note deleted'));
  } catch (error) {
    res.status(500).json(formatResponse(false, 'Failed to delete note'));
  }
};
