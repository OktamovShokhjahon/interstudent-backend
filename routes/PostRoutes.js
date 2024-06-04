// packages
const { Router } = require("express")

// models
const News = require("../models/News")
const Status = require("../models/Status")
const Messages = require("../models/Message")

const router = Router()

// news
router.post("/news", (req, res) => {
	const { titleUz, titleEn, titleRu, descrUz, descrEn, descrRu, image } = req.body

	const newNews = new News({
		titleUz,
		titleEn,
		titleRu,
		descrUz,
		descrEn,
		descrRu,
		image
	})

	newNews.save()

	res.send({
		"ok": true,
		"data": "Done"
	})
})

router.post("/delete-news", async (req, res) => {
	try {
		const { id } = req.query

		await News.findByIdAndDelete(id)

		res.send({
			"ok": true,
			"data": "Done"
		})
	} catch (err) {
		res.send(err)
	}
})

router.post("/edit-news", async (req, res) => {
	const { id } = req.query
	const lastNews = await News.findById(id)
	const { titleUz, titleRu, titleEn, descrUz, descrRu, descrEn } = req.body
	const newNews = {
		titleUz: titleUz ? titleUz : lastNews.titleUz,
		titleEn: titleRu ? titleRu : lastNews.titleRu,
		titleRu: titleEn ? titleEn : lastNews.titleEn,
		descrUz: descrUz ? descrUz : lastNews.descrUz,
		descrRu: descrRu ? descrRu : lastNews.descrRu,
		descrEn: descrEn ? descrEn : lastNews.descrEn,
	}
	await News.findByIdAndUpdate(id, newNews, { new: true })
	res.send({
		ok: true,
		data: "done"
	})
})

// application
router.post("/contact", async (req, res) => {
	const { firstName, phone, message } = req.body

	const newNews = new Messages({
		firstName,
		phone,
		message
	})

	newNews.save()

	res.send({
		"ok": true,
		"data": "Done"
	})
})

router.post("/delete-contact", async (req, res) => {
	const { id } = req.query
	await Messages.findByIdAndDelete(id)
	res.send("Done")
})

module.exports = router