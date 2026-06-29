import Attempt from '../models/Attempt.js';

// @desc    Get leaderboard
// @route   GET /api/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Attempt.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalScore: { $sum: "$score" },
                    attempts: { $sum: 1 },
                },
            },
            { $sort: { totalScore: -1 } },
            { $limit: 20 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $project: {
                    name: "$user.name",
                    totalScore: 1,
                    attempts: 1,
                },
            },
        ]);

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getLeaderboard };
