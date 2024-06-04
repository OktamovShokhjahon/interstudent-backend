// packages
const { Router } = require("express")

// models
const News = require("../models/News")
const Status = require("../models/Status")
const Messages = require("../models/Message")

const router = Router()

// news
router.get("/news", async (req, res) => {
	const news = await News.find()

	res.send(news)
})

router.get("/news-by-id", async (req, res) => {
	const { id } = req.query
	const news = await News.findById(id)
	res.send(news)
})

// messages
router.get("/messages", async (req, res) => {
	const messages = await Messages.find()

	res.send(messages)
})

module.exports = router