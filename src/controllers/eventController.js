let Event = require('../models/Event');

let eventController = {
    createEvent: function (req, res) {

        let event = new Event({
            name: req.body.name,
            details: req.body.details,
            date: req.body.date,
            durationMins: req.body.durationMins,
            address: req.body.address,
            pictureURL: req.body.pictureURL,
            category: req.body.category,
            contacts: req.body.contacts,
            price: req.body.price,
            companyID: req.decoded.id



        });


        event.save(function (err, event) {
            if (err) {

                res.status(500).json({
                    success: false,
                    message: "Please make sure you have provided valid information"
                });
            } else {

                return res.json({
                    success: true,
                    message: "Event Successfully created"
                });

            }
        });


    },

    getAllEvents: function (req, res) {
        Event.find({}, function (err, events) {
            if (err){
                res.status(500).json({
                    message: "No events available"
                })
            }
            else
                res.json({
                    data: events
                });
        });
    },

//as a company i can see my events
    getCompanyEvents: function (req, res) {

        Event.find({
            companyID: req.decoded.id
        }, function (err, event) {

            if (err)
                res.json({
                    error: "no events to show ",
                    data: null
                });

            res.json({
                message: "Here are your events",
                data: event
            });


        });
    },
// as a company i can update my events
    updateEvents: function (req, res) {
        var query = {
            _id: req.body._id
        };

        var update = {
            $set: req.body
        };

        var options = {
            new: true
        };

        Event.findByIdAndUpdate(query, update, options, function (err, event) {
            if (err) {
                res.status(500).json({
                    error: "Internal server error",
                    data: null
                });
            } else {
                if (event) {
                    res.json({
                        error: null,
                        data: event
                    });
                } else {
                    res.status(404).json({
                        error: "Event not found",
                        data: null
                    });
                }
            }
        });
    },
    cancelEvent: function (req, res) {

        Event.remove({
            _id: req.body.id,
            companyID: req.decoded.id
        }, function (err, result) {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: 'can not cancel event'

                });
            } else {
                res.json({
                    success: true,
                    msg: 'event cancelled successfully'
                });
            }

        });
    }

};



module.exports = eventController;
