const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Problem = require('../models/Problem');
const authMiddleWre = require('../middleware/auth');

router.get('/topics', authMiddleWre, async(req, res) => {
    try {
        const stats = await Problem.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(req.user.userId)}},
            {
                $group: {
                    _id: '$topic',
                    totalSolved: {$sum: 1},
                    successCount: {
                        $sum: {$cond: ['$success', 1, 0]}
                    },
                    avgTime: {$avg: '$timeTaken'}
                }
            },
            {
                $project: {
                    topic: '$_id',
                    totalSolved: 1,
                    successCount: 1,
                    avgTime: {$round: ['$avgTime',2]},
                    failureCount: {
                        $subtract: ['$totalSolved', '$successCount']
                    }
                }
            }
        ]);
        res.json({stats});
    }
    catch(error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
});

router.get('/weak-topics', authMiddleWre, async(req, res) => {
    try {
        const stats = await Problem.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(req.user.userId)}},
            {
                $group: {
                    _id: '$topic',
                    totalSolved: {$sum: 1},
                    successCount: {
                        $sum: {$cond: ['$success', 1, 0]}
                    },
                    avgTime: {$avg: '$timeTaken'}
                }
            },
            {
                $project: {
                    topic: '$_id',
                    totalSolved: 1,
                    successCount: 1,
                    avgTime: {$round: ['$avgTime', 2]},
                    failureRate: {
                        $multiply: [
                            {
                                $divide: [
                                    {$subtract: ['$totalSolved', '$successCount']},
                                    '$totalSolved'
                                ]
                            },
                            100
                        ]
                    }
                }
            },
            {
                $match: {
                    $or: [
                        {failureRate: {$gte: 40}},
                        {avgTime: {$gte: 60}}
                    ]
                }
            }
        ]);

        res.json({
            weakTopics: stats,
            message: stats.length == 0 ? "No weak topics found" : `You have ${stats.length} weak topic(s)`
        });
    }
    catch(error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
});

module.exports = router;