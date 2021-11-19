import express from 'express'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import _ from 'lodash';
import path, { dirname } from 'path';
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const app = express();

let homeContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nulla urna, finibus sed turpis ut, convallis sagittis lacus. Cras bibendum scelerisque nulla, non accumsan leo. Nulla erat arcu, feugiat sit amet interdum vel, auctor in mauris. Sed eu viverra massa, id dictum magna. Nullam cursus nibh vel pretium ullamcorper. Nunc porttitor quam posuere, interdum nisi id, scelerisque turpis. Nam nec venenatis odio";
let aboutContent = "Vivamus sollicitudin venenatis bibendum. Ut finibus lacus enim, ac vulputate nibh feugiat vitae. Sed quis dictum risus, eu sagittis neque. Quisque tempus aliquam libero vel eleifend. Cras et quam ut magna condimentum finibus vitae in tortor. Donec elit purus, accumsan a pulvinar sit amet, cursus at urna. Etiam sit amet tellus elementum, sodales libero vitae, condimentum nulla. Proin quis lorem eget turpis hendrerit molestie.";
let contactContent = "Proin venenatis metus eu ullamcorper venenatis. Pellentesque sollicitudin metus congue, posuere risus in, molestie metus. Phasellus congue risus libero. Praesent nec dolor bibendum, mattis libero et, venenatis urna. Vestibulum vel leo mauris. Donec lorem lorem, varius vitae nunc non, pharetra tincidunt leo. In id mi auctor, egestas magna a, dictum ex. Donec aliquet blandit lacus, sed auctor massa malesuada non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor id ipsum in efficitur. Phasellus pharetra ornare bibendum. Curabitur condimentum eleifend lacus, sit amet rhoncus erat imperdiet id. Etiam blandit quam ac pulvinar fringilla.";
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
    res.render('home', {
        startingContent: homeContent,
        posts: posts
    });
})
app.get('/add', (req, res) => {
    res.render('add');
})
app.get('/about', (req, res) => {
    res.render('about', { startingContent: aboutContent });
})
app.get('/contact', (req, res) => {
    res.render('contact', { author: author });
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
