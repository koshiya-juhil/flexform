const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Forms",
        required: true
    },
    responses: [
        {
            fieldId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Forms.formfields",
                required: true,
            },
            response: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            }
        }
    ],
    submittedBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        email: {
            type: String,
        },
        name: {
            type: String
        }
    }
}, { timestamps: true });

const Response = mongoose.model('Responses', responseSchema);
module.exports = Response;