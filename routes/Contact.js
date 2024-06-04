// packages
const { Router } = require("express")

// models
const Messages = require("../models/Message")

const router = Router()

// application
router.post("/api/v1/contact/create", async (req, res) => {
	const { firstname, phone, message, date } = req.body

	const newMessage = new Messages({
		firstname,
		phone,
		message,
		date
	})

	newMessage.save()

	res.send({
		"ok": true,
		"data": { firstname, phone, message, date }
	})
})

router.delete("/api/v1/contact/delete/:id", async (req, res) => {
	const { id } = req.params
	await Messages.findByIdAndDelete(id)
	res.send({
		"ok": true,
		"data": 'done'
	})
})

router.get("/api/v1/contact", async (req, res) => {
	const messages = await Messages.find()

	res.send({
		"ok": true,
		"data": messages
	})
})

module.exports = router
