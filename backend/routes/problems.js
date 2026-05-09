const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const authMiddleWre = require('../middleware/auth');

router.post('/add', authMiddleWre, async (req,res) => {
    try {
        const {
            title,
            platform,
            topic,
            difficulty,
            timeTaken,
            success,
            problemLink,
            notes
        } = req.body;

        let verification_status = 'manual';
        if(platform == 'codeforces') {
            verification_status = 'verified';
        }
        else if(platform == 'leetcode') {
            verification_status = 'semi_verified';
        }

        let nextRevision = new Date();
        if(success) {
            nextRevision.setDate(nextRevision.getDate() + 7);
        }
        else {
            nextRevision.setDate(nextRevision.getDate() + 2);
        }

        const problem = new Problem({
            userId: req.user.userId,
            title,
            platform,
            topic,
            difficulty,
            timeTaken,
            success,
            verification_status,
            problemLink,
            notes,
            nextRevision
        });

        await problem.save();

        res.status(201).json({
            message : "Problem added successfully",
            problem
        });
    }
    catch(error) {
        res.status(500).json({message : "Server error", error : error.message});
    }
});

router.get('/all', authMiddleWre, async(req, res) => {
    try {
        const problems = await Problem.find({userId: req.user.userId}).sort({createdAt: -1});

        res.json({
            total: problems.length,
            problems
        });
    }
    catch(error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
});

module.exports = router;