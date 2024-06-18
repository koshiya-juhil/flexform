const { isValidObjectId } = require('mongoose');
const Response = require('../models/Response');

async function addResponse(req, res){
    try {
        
        const { formId, responses, submittedBy } = req.body;

        console.log("formId", formId);
        console.log("responses", responses);
        console.log("submittedBy", submittedBy);

        if(!isValidObjectId(formId)){
            return res.status(400).json({ error: "Invalid formId", notify: true });
        }

        const newResponse = new Response({
            formId,
            responses,
            submittedBy
        });

        const response = await newResponse.save();

        console.log("response ", response);

        res.status(200).json({response, notify: true, message: "Response submitted successfully."});

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal server error", notify: true });
    }
}

async function responsesByFormId(req, res){
    // validation pending if user is admin or form owner only then send responses
    try {
        const formId = req.params.formId;

        if(!isValidObjectId(formId)){
            return res.status(400).json({ error: "Invalid formId", notify: true });
        }

        const responses = await Response.find({ formId: formId }).exec();

        res.status(200).json(responses);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", notify : true });
    }
}

module.exports = { addResponse, responsesByFormId };