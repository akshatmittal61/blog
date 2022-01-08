import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import _ from "lodash";
import path, { dirname } from "path";
import mongoose from "mongoose";
import { config } from "dotenv";
config();
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const app = express();
mongoose.connect(process.env.CONNECTION_STRING, (err) => {
	if (err) console.log(err);
	else console.log("Connected to Mongo Cluster");
});

const author = {
	name: "Akshat Mittal",
	image: "https://pbs.twimg.com/profile_images/1456999448710504454/b4rjNopn_400x400.jpg",
	github: ["https://github.com/akshatmittal61", "akshatmittal61"],
	linkedin: [
		"https://www.linkedin.com/in/akshat-mittal-851073202",
		"akshat-mittal-851073202",
	],
	twitter: ["https://twitter.com/akshatmittal61", "akshatmittal61"],
	ig: ["https://instagram.com/akshatmittal61", "akshatmittal61"],
	mail: ["mailto:akshatmittal2506@gmail.com", "akshatmittal2506@gmail.com"],
};

const blogSchema = new mongoose.Schema({
	title: String,
	content: String,
});
const Blog = new mongoose.model("Blog", blogSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	let itemsToSend = [];
	Blog.find({}, (err, data) => {
		if (err) console.log(err);
		else {
			data.forEach((item) => {
				itemsToSend = [...itemsToSend, item];
			});
			res.render("home", { posts: itemsToSend });
		}
	});
});
app.get("/add", (req, res) => {
	res.render("add");
});
app.get("/about", (req, res) => {
	res.render("about", { dir: req.get("host") });
});
app.get("/contact", (req, res) => {
	res.render("contact", { author: author });
});
app.get("/api/posts", (req, res) => {
	Blog.find({}, (err, data) => {
		if (err) console.log(err);
		else res.json(data);
	});
});
app.get("/api/posts/:id", (req, res) => {
	let id = req.params.id;
	Blog.findOne({ _id: id }, (err, data) => {
		if (err) console.log(err);
		else res.json(data);
	});
});
app.post("/add", (req, res) => {
	let post = new Blog({
		title: req.body.title,
		content: req.body.content,
	});
	post.save();
	res.redirect("/");
});
app.get("/post/:id", (req, res) => {
	let id = req.params.id;
	Blog.findOne({ _id: id }, (err, data) => {
		if (err) console.log(err);
		else res.render("post", { post: data });
	});
});
app.post("/post/:id/delete", (req, res) => {
	let id = req.params.id;
	let itemToDel = {};
	Blog.findOne({ _id: id }, (err, data) => {
		if (err) console.log(err);
		else itemToDel = { ...data };
	});
	Blog.findByIdAndDelete(id, (err, data) => {
		if (err) console.log(err);
		else
			console.log({
				status: 200,
				message: "Item deleted successfully",
				blog: data,
			});
	});
	res.redirect("/");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
