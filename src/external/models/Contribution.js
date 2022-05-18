const mongoose = require('mongoose')

const Contribution = new mongoose.Schema(
    {
        uuid: String,
        name: String,
        description: String,
        createdBy: String,
        //TODO: Implement date now
        date: Date,
        approved: {
            approved_by: String,
            state: String,
        },
        projectId: String,
        part: Number,
        version: Number,
        feedback: [{
            username: String,
            text: String,
            date: Date,
            state: String,
        }],
        files: {
            folder: String,
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