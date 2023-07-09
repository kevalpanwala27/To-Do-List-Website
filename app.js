const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public")); // We are applying css styles.

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
    name: "Welcome to your todolist!"
});
const item2 = new Item ({
    name: "Hit the + button to add a new item."
});
const item3 = new Item ({
    name: "<-- Hit this to delete an item."
});

const items = [item1, item2, item3];
Item.insertMany(items, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully saved items to DB.");
    }
});

app.get("/", function (req, res) {
    // Rendering from mongoose.
    Item.find({}, function (err, foundItems) {

        if (foundItems.length === 0) {
            Item.insertMany(items, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved items to DB.");
                }
            });
            res.redirect("/");
        }

        res.render("list", {listTitle: "Today", newListItems: foundItems});
    });
});

app.post("/", function (req, res) {

    const itemName = req.body.newItem;
    const itemDate = req.body.newDate;
    const newItem = new Item({
        name: itemName,
        date: itemDate
        });
        newItem.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully saved item to DB.");
            }
        }
    );
    res.redirect("/");
});












app.get("/work", function (req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems})
});

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
});






