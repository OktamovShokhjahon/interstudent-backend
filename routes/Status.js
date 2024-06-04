// packages
const { Router } = require("express")

// models
const Status = require("../models/Status")

const router = Router()

// status
router.post("/api/v1/status/create", async (req, res) => {
	const { title, value } = req.body

	const newStatus = new Status({
		title,
		value
	})

	const uploadStatus = newStatus.save()
	res.send({
		"ok": true,
		"data": {
			title,
			value
		}
	})
})

router.put("/api/v1/status/update/:id", async (req, res) => {
	const { id } = req.params
	const lastStatus = await Status.findById(id)
	const { title, value } = req.body
	const newStatus = {
		value: value ? value : lastStatus.value,
		title: title ? title : lastStatus.title
	}
	await Status.findByIdAndUpdate(id, newStatus, { new: true })
	res.send({
		ok: true,
		data: "done"
	})
})

router.get("/api/v1/status", async (req, res) => {
	const allStatus = await Status.find()

	res.send({
		"ok": true,
		"data": allStatus
	})
})

module.exports = router