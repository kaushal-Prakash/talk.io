import Message from "../models/message.js";

const sendMessage = async (req, res) => {
  const { room, sender, text } = req.body;

  try {
    const message = new Message({ room, sender, text });
    await message.save();
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getMessages = async (req, res) => {
  const { room } = req.params;

  try {
    const messages = await Message.find({ room }).sort({ timestamp: 1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { sendMessage, getMessages };