// packages
const { Router } = require("express")

// models
const Admin = require("../models/Admin")

const router = Router()

// admin
router.get("/api/v1/admin/auth", async (req, res) => {
	const admins = await Admin.find()

	res.send({
		ok: true,
		data: admins
	})
})

router.post("/api/v1/admin/auth/create", async (req, res) => {
	const {login, password, active_time} = req.body

	const newAdmin = new Admin({
		login,
		password,
		active_time
	})

	await newAdmin.save()

	res.send({
		ok: true,
		data: {login, password, active_time}
	})
})

router.put("/api/v1/admin/auth/update/:id", async (req, res) => {
	const { id } = req.params

	const lastAdmin = await Admin.findById(id)

	const { login, password, active_time } = req.body

	const newStatus = {
		login: login ? login : lastAdmin.login,
		password: password ? password : lastAdmin.password,
		active_time: active_time ? active_time : lastAdmin.active_time
	}

	await Admin.findByIdAndUpdate(id, newStatus, { new: true })

	res.send({
		ok: true,
		data: { login, password, active_time }
	})
})

router.delete("/api/v1/admin/auth/delete/:id", async (req, res) => {
	const {id} = req.params

	await Admin.findByIdAndDelete(id)

	res.send({
		ok: true,
		data: "done"
	})
})

module.exports = router