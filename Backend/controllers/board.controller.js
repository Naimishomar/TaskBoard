import Board from '../models/board.model.js';

export const getBoards = async (req, res) => {
  const boards = await Board.find({ userId: req.user.id });
  res.status(200).json({message:"Boards successfully fetched", boards, success: true});
};

export const createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required", success: false });
    }
    const existingBoard = await Board.findOne({ title, userId: req.user.id });
    if (existingBoard) {
      return res.status(409).json({ message: "Board already exists", success: false });
    }
    const board = await Board.create({ title, userId: req.user.id });
    res.status(201).json({ message: "Board created successfully", board, success: true });
  } catch (err) {
    console.error("Board creation error:", err);
    res.status(500).json({ message: "Server error", success: false });
  }
};


export const deleteBoard = async (req, res) => {
    try {      
        const {id} = req.params;
        if(!id){
            res.status(401).json({message: "ID is required", success: false});
        }
        const existingBoard = await Board.findOne({ _id: id, userId: req.user.id });
        if(!existingBoard){
            res.status(404).json({message: "Board not existed with this id", success: false});
        }
        await Board.findByIdAndDelete({ _id: id, userId: req.user.id });
        res.status(200).json({message:"Board deleted successfully", success: true});
    } catch (error) {
        console.error("Board creation error:", err);
        res.status(500).json({ message: "Server error", success: false });    
    }
};