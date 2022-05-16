const mongoose = require('mongoose')

const Project = new mongoose.Schema(
    {
        projectId: String,
        uuid: String,
        name: String,
        description: String,
        createdBy: String,
        admins: [
            {
                username: String,
                role: String,
            }
        ]

    }
)

Project.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('Project', Project)