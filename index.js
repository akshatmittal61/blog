import express from 'express'
import bodyParser from 'body-parser'
import ejs from 'ejs'
import { fileURLToPath } from 'url'
import { dirname } from 'path';
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const app = express();

let homeContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nulla urna, finibus sed turpis ut, convallis sagittis lacus. Cras bibendum scelerisque nulla, non accumsan leo. Nulla erat arcu, feugiat sit amet interdum vel, auctor in mauris. Sed eu viverra massa, id dictum magna. Nullam cursus nibh vel pretium ullamcorper. Nunc porttitor quam posuere, interdum nisi id, scelerisque turpis. Nam nec venenatis odio";
let aboutContent = "Vivamus sollicitudin venenatis bibendum. Ut finibus lacus enim, ac vulputate nibh feugiat vitae. Sed quis dictum risus, eu sagittis neque. Quisque tempus aliquam libero vel eleifend. Cras et quam ut magna condimentum finibus vitae in tortor. Donec elit purus, accumsan a pulvinar sit amet, cursus at urna. Etiam sit amet tellus elementum, sodales libero vitae, condimentum nulla. Proin quis lorem eget turpis hendrerit molestie.";
let contactContent = "Proin venenatis metus eu ullamcorper venenatis. Pellentesque sollicitudin metus congue, posuere risus in, molestie metus. Phasellus congue risus libero. Praesent nec dolor bibendum, mattis libero et, venenatis urna. Vestibulum vel leo mauris. Donec lorem lorem, varius vitae nunc non, pharetra tincidunt leo. In id mi auctor, egestas magna a, dictum ex. Donec aliquet blandit lacus, sed auctor massa malesuada non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porttitor id ipsum in efficitur. Phasellus pharetra ornare bibendum. Curabitur condimentum eleifend lacus, sit amet rhoncus erat imperdiet id. Etiam blandit quam ac pulvinar fringilla.";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    console.log("Home Page");
    res.render('home', { startingContent: homeContent });
})
app.get('/add', (req, res) => {
    console.log("Add New Post");
    res.render('add');
})
app.get('/about', (req, res) => {
    console.log("About Page");
    res.render('about', { startingContent: aboutContent });
})
app.get('/contact', (req, res) => {
    console.log("Contact Us");
    res.render('about', { startingContent: contactContent });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))