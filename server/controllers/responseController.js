const Response = require('../models/Response');
const ObjectId = require('mongoose').ObjectId;

async function addResponse(req, res){
    try {
        
        const { formId, responses, submittedBy } = req.body;

        console.log("formId", formId);
        console.log("responses", responses);
        console.log("submittedBy", submittedBy);

        if(!ObjectId.isValid(formId)){
            return res.status(400).json({ error: "Invalid formId", notify: true });
        }

        const newResponse = new Response({
            formId,
            responses,
            submittedBy
        });

        const response = await newResponse.save();

        console.log("response ", response);

        res.status(200).send(response);

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal server error", notify: true });
    }
}