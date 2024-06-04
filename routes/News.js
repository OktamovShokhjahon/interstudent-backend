// packages
const { Router } = require("express")

// models
const News = require("../models/News")

const router = Router()

// news
router.get("/api/v1/news", async (req, res) => {
	const allNews = await News.find()

	res.send({
		"ok": true,
		"data": allNews
	})
})

router.get("/api/v1/news/:id", async (req, res) => {
	const {id} = req.params

	const news = await News.findById(id)

	res.send({
		ok: true,
		data: news
	})
})

router.post("/api/v1/news/create", async (req, res) => {
	const {
		title_uz,
		description_uz,
		title_en,
		description_en,
		title_ru,
		description_ru,
		date,
		image
	} = req.body

	const newNews = new News({
		title_uz,
		description_uz,
		title_en,
		description_en,
		title_ru,
		description_ru,
		date,
		image
	})

	const uploadNews = newNews.save()
	res.send({
		"ok": true,
		"data": {
			title_uz,
			description_uz,
			title_en,
			description_en,
			title_ru,
			description_ru,
			date,
			image
		}
	})
})

router.put("/api/v1/news/update/:id", async (req, res) => {
	const { id } = req.params
	const lastNews = await News.findById(id)
	const { 
		title_uz,
		title_en,
		title_ru,
		description_uz,
		description_en,
		description_ru,
		image,
		date 
	} = req.body
	const newNews = {
		title_uz: title_uz ? title_uz : lastNews.title_uz,
		description_uz: description_uz ? description_uz : lastNews.description_uz,
		title_en: title_en ? title_en : lastNews.title_en,
		title_ru: title_ru ? title_ru : lastNews.title_ru,
		description_en: description_en ? description_en : lastNews.description_en,
		description_ru: description_ru ? description_ru : lastNews.description_ru,
		image: image ? image : lastNews.image,
		date: date ? date : lastNews.date
	}
	await News.findByIdAndUpdate(id, newNews, { new: true })
	res.send({
		ok: true,
		data: "done"
	})
})

router.delete('/api/v1/news/delete/:id', async (req, res) => {
	const {id} = req.params

	await News.findByIdAndDelete(id)

	res.send({
		"ok": true,
		data: "done"
	})
})

module.exports = router