// packages
const express = require("express")
const multer = require('multer');
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path');
const fs = require('fs');

// routes
// const MainRoutes = require("./routes/MainRoutes")
// const PostRoutes = require("./routes/PostRoutes")
const StatusRoutes = require("./routes/Status")
const NewsRoutes = require("./routes/News")
const ContactRoutes = require("./routes/Contact")
const AdminRoutes = require("./routes/Admin")

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

// app.use(MainRoutes)
// app.use(PostRoutes)
app.use(StatusRoutes)
app.use(NewsRoutes)
app.use(ContactRoutes)
app.use(AdminRoutes)

// image upload
const folderPath = './uploads';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/v1/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send('File uploaded successfully.');
});

app.delete("/api/v1/uploads/delete/:name", (req, res) => {
	const {name} = req.params

	fs.readdir('./uploads', (err, files) => {
	  if (err) {
	    console.error('Error reading directory:', err);
	    res.send(err)
	    return;
	  }

	  files.forEach(file => {
	  	if (file.toLowerCase() == name.toLowerCase()) {
	  		fs.unlink(`./uploads/${name}`, (err) => {
	  			if (err) {
            console.error('Error deleting file:', err);
            res.send(err)
            return;
        	}
        	console.log('File deleted successfully');
        	res.send({
        		ok: true,
        		data: "done"
        	})
	  		})
	  	}
	  });
	});
})

// app.get("/api/v1/upload/:name", (req, res) => {
// 	const {name} = req.params

// 	const filesArray = [];
// 	const directoryPath = './uploads';

// 	fs.readdir(directoryPath, (err, files) => {
// 	  if (err) {
// 	    console.error('Error reading directory:', err);
// 	    return;
// 	  }

// 	  files.forEach(file => {
// 	  	console.log(file)
// 	    const filePath = path.join(directoryPath, file);
// 	    filesArray.push(filePath);
// 	  });

// 	  res.send(filesArray)
// 	});
// })

// start project
const dev = async () => {
	try {
		const PORT = process.env.PORT || 4100
		const MONGO_URI = 'mongodb://127.0.0.1/interstudent'

		app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))

		mongoose.connect(MONGO_URI)
		console.log("MongoDB Connected")
	} catch (err) {
		console.log(err)
	}
}

dev()