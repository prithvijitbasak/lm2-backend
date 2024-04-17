const Contact = require("../models/contactModel");

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({message: "Message send successfully"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Cannot send message"});
    }
};

module.exports = contactForm;