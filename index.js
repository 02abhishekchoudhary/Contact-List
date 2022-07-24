const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//Middleware 1
// app.use(function(req, res, next){
//     req.myName = "Abhishek"
//     console.log('Middleware 1 called');
//     next();
// });

//Middleware 1
// app.use(function(req, res, next){
//     console.log('My name from MW2', req.myName);
//     console.log('Middleware 2 called');
//     next();
// });


var contactList = [
    {
        name: "Iron-Man",
        phone: "9999999999"
    },
    {
        name: "Thor",
        phone: "8888888888"
    },
    {
        name: "Hulk",
        phone: "7777777777"
    }
]


app.get('/', function(req, res){
    // console.log(__dirname);
    // res.send('<h1>Cool, it is running! or is it?</h1>');

Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contact from DB');
            return;
        }
        return res.render('home', {
            title: "My Contacts List",
            contact_List: contacts
        });
    });
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with EJS"
    });
});

app.post('/create-contact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating contact');
            return;
        }
        console.log('******', newContact);
        return res.redirect('back');
    });

    // return res.redirect('back');
    // return res.redirect('/');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // return res.redirect('/practice');
});

// app.get('/profile', function(req, res){
//     res.send('<h1>Abhishek Choudhary</h1>');
// });

app.get('/delete-contact', function(req, res){
    // console.log(req.query);
    //get the idd from query in the url
    let id = req.query.id;

    //find the contact in the DB using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

});

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }

    console.log('Yup! My Express server is running on port:', port);
});