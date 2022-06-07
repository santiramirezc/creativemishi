const mongoose = require('mongoose')

const Contribution = new mongoose.Schema(
    {
        uuid: String,
        name: String,
        description: String,
        createdBy: String,
        //TODO: Implement date now
        date: Date,
        state: String,
        projectId: String,
        part: Number,
        version: Number,
        history: [{
            username: String,
            feedback: String,
            date: Date,
            state: String,
        }],
        files: {
            finalVersion: {
                location: String,
                label: String,
            },
            data: [{
                eTag: String,
                location: String,
                awskey: String,
                bucket: String,
                label: String, //File name
                sourceType: String, //Video or image
                source: String, //Upload or custom link ()
                finalVersion: Boolean,
            }],
            files: [String],
            drive_url: String,
        },
    }
)

Contribution.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('Contribution', Contribution)