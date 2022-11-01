let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Business = require('../models/business');

module.exports.displayBusinessList = (req, res, next) => {
    Business.find((err, businessList) => {
        if (err) {
            return console.error(err);
        }
        else {

            res.render('business/list',
                {
                    title: 'Business List',
                    BusinessList: businessList,
                    displayName: req.user ? req.user.displayName : ''
                });
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('business/add', {
        title: 'Add Business',
        displayName: req.user ? req.user.displayName : ''
    })
}

module.exports.processAddPage = (req, res, next) => {
    let newBusiness = Business({
        "Contact_Name": req.body.Contact_Name,
        "Email": req.body.Email,
        "Contact_Number": req.body.Contact_Number
    });

    Business.create(newBusiness, (err, Business) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the business list
            res.redirect('/business-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Business.findById(id, (err, businessToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('business/edit',
                {
                    title: 'Edit Business',
                    business: businessToEdit,
                    displayName: req.user ? req.user.displayName : ''
                })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBusiness = Business({
        "_id": id,
        "Contact_Name": req.body.Contact_Name,
        "Email": req.body.Email,
        "Contact_Number": req.body.Contact_Number
    });

    Business.updateOne({ _id: id }, updatedBusiness, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the businesslist
            res.redirect('/business-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Business.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the business list
            res.redirect('/business-list');
        }
    });
}
