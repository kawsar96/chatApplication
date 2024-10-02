// external imports
const express = require("express");

// internal imports
const {
  getInbox,
  searchUser,
  addConversation,
  getMessages,
  sendMessage,
} = require("../controller/inboxController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const { checkLogin } = require("../middlewares/common/checkLogin");
const attachmentUpload = require("../middlewares/inbox/attachmentUpload");

const router = express.Router();

// inbox page
router.get("/", decorateHTMLResponse("Inbox"), checkLogin, getInbox);

// search user
router.post("/search", checkLogin, searchUser);

// add conversation
router.post("/conversation", checkLogin, addConversation);

// get messages of a conversation
router.get("/messages/:conversation_id", checkLogin, getMessages);

// send message
router.post("/message", checkLogin, attachmentUpload, sendMessage);

module.exports = router;
