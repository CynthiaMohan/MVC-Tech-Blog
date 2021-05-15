const router = require('express').Router();
const { User } = require('../../models/User');

// GET /api/users
router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(dbUserData);
    }
    catch (error) {
        if (error) {
            res.status(500).json(error);
        }
    }
});

// GET /api/users/1
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const getUserById = await User.findOne({
            attributes: { exclude: ['password'] },
            where: { id }
        });
        if (!getUserById) {
            res.status(404).json({ message: "No user Found" });
        }
        res.json(getUserById);
    } catch (error) {
        if (error) {
            res.status(500).json(error);
        }
    }
});

// POST /api/users
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newPost = await User.Create({ username, email, password });
        res.json(newPost);
    } catch (error) {
        if (error) {
            res.status(500).json(error);
        }
    }
});

// PUT /api/users/1
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updateUserData = await User.update(
            req.body, {
            individualHooks: true,
            where: { id }
        });
        if (!updateUserData) {
            res.status(404).json({ message: "User Not Found" });
        }
        res.json(updateUserData);
    } catch (error) {
        if (error) {
            res.status(500).json(error);
        }
    }
});

// DELETE /api/users/1
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUserData = await User.findOne({ where: { id } });
    if (!deletedUserData) {
        res.json({ message: "No User Found" })
    }
    else {
        const deleteData = await User.destroy({ where: { id } });
        res.json(deleteData);
    }
});

module.exports = router;