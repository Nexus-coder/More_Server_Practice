const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.send("Here is the request")
})

const comments = [

    {
        id: uuid(),
        username: 'Andrew',
        message: "Im very discontent with this"

    },
    {
        id: uuid(),
        username: 'Kimani',
        message: "Im very happy with this"

    },
    {
        id: uuid(),
        username: 'Andrew',
        message: "Im very discontent with this"

    }

];

app.get("/comments", (req, res) => {
    res.render('comments/index', { comments });
})

app.get("/comments/new", (req, res) => {
    res.render('comments/new');

})
app.get("/comments/:id/edit", (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const comment = comments.find(memo => memo.id === id);
    res.render('comments/edit', { comment })
})

app.post("/comments", (req, res) => {
    const { username, comment: message } = req.body;
    comments.push({ id: uuid(), username, message })
    res.redirect("/comments")
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newComment = req.body.comment;
    const foun dComment = comments.find(memo => memo.id === id);
    foundComment.message = newComment;
    res.redirect("/comments")
})



app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find(memo => memo.id === id);
    res.render('comments/show', { comment });
})

app.listen(3000, () => {
    console.log("Port open on 3000.")
})