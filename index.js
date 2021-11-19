import express from 'express'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import _ from 'lodash';
import path, { dirname } from 'path';
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const app = express();

let aboutContent = "Vivamus sollicitudin venenatis bibendum. Ut finibus lacus enim, ac vulputate nibh feugiat vitae. Sed quis dictum risus, eu sagittis neque. Quisque tempus aliquam libero vel eleifend. Cras et quam ut magna condimentum finibus vitae in tortor. Donec elit purus, accumsan a pulvinar sit amet, cursus at urna. Etiam sit amet tellus elementum, sodales libero vitae, condimentum nulla. Proin quis lorem eget turpis hendrerit molestie.";
let posts = [];
const author = {
    name: "Akshat Mittal",
    image: "https://pbs.twimg.com/profile_images/1456999448710504454/b4rjNopn_400x400.jpg",
    github: ["https://github.com/akshatmittal61", "akshatmittal61"],
    linkedin: ["https://www.linkedin.com/in/akshat-mittal-851073202", "akshat-mittal-851073202"],
    twitter: ["https://twitter.com/akshatmittal61", "akshatmittal61"],
    ig: ["https://instagram.com/akshatmittal61", "akshatmittal61"],
    mail: ["mailto:akshatmittal2506@gmail.com", "akshatmittal2506@gmail.com"]
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home', { posts: posts });
})
app.get('/add', (req, res) => {
    res.render('add');
})
app.get('/about', (req, res) => {
    res.render('about', { startingContent: aboutContent, dir: req.get('host') });
})
app.get('/contact', (req, res) => {
    res.render('contact', { author: author });
})
app.get('/api/posts', (req, res) => {
    res.json(posts);
})
app.get('/api/posts/:id', (req, res) => {
    let id = +req.params.id;
    if (id < posts.length) {
        let post = posts[id];
        res.json(post);
    }
    else res.json({
        status: 404,
        message: "Post Not Found"
    })
})
app.post('/add', (req, res) => {
    let post = {
        id: posts.length,
        title: req.body.title,
        content: req.body.content
    }
    posts = [...posts, post];
    res.redirect('/');
})
app.get('/post/:post', (req, res) => {
    let name = req.params.post;
    let condition = false;
    posts.map(post => {
        if (_.kebabCase(post.title) === _.kebabCase(name)) {
            condition = true;
            res.render('post', { post: post });
        }
    })
    if (!condition) res.json({
        status: 404,
        message: "Post Not Found"
    })
})
app.get('/posts/:id', (req, res) => {
    let id = +req.params.id;
    if (id < posts.length) {
        let post = posts[id];
        res.render('post', { post: post });
    }
    else res.json({
        status: 404,
        message: "Post Not Found"
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
