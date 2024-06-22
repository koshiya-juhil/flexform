const { isValidObjectId } = require('mongoose');
const Form = require('../models/Form');

async function createForm(req, res){
    try {
        const data = req.body;
        const createdBy = req.user.id;

        const newForm = new Form({...data, createdBy});
        let response = await newForm.save();


        res.status(200).send(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", notify : true });
    }
}

async function updateForm(req, res){
    try {
        const data = req.body;
        const formId = data._id;

        const updatedForm = await Form.findByIdAndUpdate(
            formId,
            data,
            { new: true, runValidators: true }
        )

        if(!updatedForm){
            return res.status(404).json({ error: "Form not found", notify: true });
        }


        res.status(200).send(updatedForm);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", notify : true });
    }
}

async function getFormsByUser(req, res) {
    try {
        const user = req.user;
        const forms = await Form.find({ createdBy: user.id })
        console.log("forms", forms.length);
        
        res.status(200).send(forms);

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal Server Error", notify: true });
    }
}

async function getFormById(req, res){
    try {    
        const formId = req.params.formId;

        if(!isValidObjectId(formId)){
            return res.status(400).json({ error: "Invalid formId", notify: true });
        }

        const response = await Form.findById(formId);

        
        if(!response){
            return res.status(404).json({ error: "Form not found", notify: true });
        }

        res.status(200).send(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", notify : true });
    }
}

async function getFormsByTitle(req, res){
    try {
        
        const searchQuery = req.params.query;
        const forms = await Form.find({ title: { $regex: searchQuery, $options: 'i' } });

        res.status(200).send(forms);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", notify : true });
    }
}

module.exports = { createForm, getFormsByUser, updateForm, getFormById, getFormsByTitle };