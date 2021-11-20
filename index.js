import express from 'express'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import _ from 'lodash';
import path, { dirname } from 'path';
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const app = express();

let aboutContent = "Vivamus sollicitudin venenatis bibendum. Ut finibus lacus enim, ac vulputate nibh feugiat vitae. Sed quis dictum risus, eu sagittis neque. Quisque tempus aliquam libero vel eleifend. Cras et quam ut magna condimentum finibus vitae in tortor. Donec elit purus, accumsan a pulvinar sit amet, cursus at urna. Etiam sit amet tellus elementum, sodales libero vitae, condimentum nulla. Proin quis lorem eget turpis hendrerit molestie.";
let posts = [
    {
        id: 0,
        title: "Klaus",
        content: "You've heard of me., Fantastic!"
    },
    {
        id: 1,
        title: "Google I/O",
        content: " Google I/O is back May 18-20, online, and free for everyone. Join us live., I/O is live keynotes, hands-on learning with Google experts, and a first look at the latest developer products., Make sure to check back for more updates! https://g.co/io : Google I/O keynote"
    },
    {
        id: 2,
        title: "Rise of Flutter",
        content: " Is flutter going to kill Native Android?,It already is known fact, flutter can be used for cross platform app development,Meanwhile Google has came up with the solution of independence from JVMs. https://www.instagram.com/p/CUB3uVNFczN/ : The Flutter Way"
    },
    {
        id: 3,
        title: "Random lorem ipsum for long note test",
        content: " Lorem ipsum dolor sit amet consectetur adipisicing elit., Deserunt fugiat neque non esse minus quis ab recusandae, ratione culpa nemo veniam aperiam enim alias! Eligendi laboriosam nemo labore atque deserunt! Voluptas ipsam molestias autem modi obcaecati vel quaerat possimus ipsa ipsum eligendi! Numquam similique, dolorum hic, provident dolorem sit cum veniam pariatur iusto aspernatur sunt perferendis nisi, totam minus aperiam? Rem natus, explicabo aut nesciunt enim adipisci debitis unde., Quasi, reiciendis provident aut, ullam neque ea obcaecati, soluta corporis error iure placeat quos? Reprehenderit harum aspernatur ullam error similique impedit! Quod quisquam quidem explicabo, porro similique cupiditate vero amet tempora dolore., Labore voluptate quibusdam, commodi fugiat hic perferendis laboriosam, vero quis cum blanditiis ab dolor consectetur excepturi necessitatibus magnam deserunt! Distinctio iste delectus, repellat vel libero, ut sapiente pariatur tempora dolore modi sunt? Dolore asperiores quam soluta laudantium at, eligendi, quas repudiandae aliquam veritatis tempore nobis iste? Vel, odio distinctio., Nobis ipsam qui corrupti excepturi saepe maxime labore magnam sapiente nisi reprehenderit, similique architecto corporis laudantium ipsa expedita voluptate dolorem accusamus, quasi ut nemo neque error odio., Modi, voluptatum magnam? Repellendus earum nostrum voluptatibus optio explicabo molestias cupiditate repudiandae magnam iure tenetur asperiores sit cumque ad eum voluptates quo nemo quidem natus doloribus consequatur temporibus, tempore distinctio pariatur., Ipsam, corrupti., Voluptatibus voluptates quae architecto? Omnis consequatur laboriosam deleniti doloremque fugit eos, cum hic ipsam eveniet est dolore, et eaque ea debitis., Nisi asperiores ab nostrum voluptatum eveniet mollitia a ipsum! Nulla ad at praesentium quam amet quasi voluptates iste quia laborum, aliquid totam repellat exercitationem eligendi, neque incidunt numquam! Et nobis tempora architecto doloribus neque., Ipsum ab laboriosam illum expedita., Dicta reprehenderit, sed dolorum nisi illo, magnam suscipit nobis autem quia officia minima ratione quod quo modi recusandae? Iste nihil quam ut unde doloremque minima laboriosam est quis, enim quisquam? #"
    }
];
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
app.post('/posts/:id/delete', (req, res) => {
    let id = +req.params.id;
    let newArray = [];
    if (id < posts.length) {
        newArray = posts.filter(post => post.id !== id);
        newArray.map((post, index) => {
            post.id = index;
        })
        posts = [...newArray];
        res.redirect('/');
    }
    else res.json({
        status: 404,
        message: "Post Not Found"
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
