const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: trusted
    },
    platform: {
        type: String,
        enum: ['codeforces', 'leetcode', 'gfg'],
        required: true
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'tough'],
        required: true
    },
    timeTaken: {
        type: Number,
        default: 0
    },
    success: {
        type: Boolean,
        default: false
    },
    verification_status: {
        type: String,
        enum: ['verified', 'semi_verified', 'manual'],
        default: 'manual'
    },
    problemLink: {
        type: String,
        default: ' '
    },
    notes: {
        type: String,
        default: ' '
    },
    nextRevision: {
        type: Date,
        default: null
    }
}, {timestamps: true});

module.exports = mongoose.model('Problem', problemSchema);