import { createUser, deleteUser, updateUser } from './api/users';
import express from 'express';
import * as firebaseMiddleware from 'express-firebase-middleware';

const router = express.Router();

// Protect api routes
router.use('/api', firebaseMiddleware.auth);

// Define routes
router.all('/', (req, res) => {
    res.sendFile("/views/login.html", { root: __dirname});
});

router.get('/test', (req, res) => {
    res.send("You're at the test route. It doesn't require authentication.")
})

// User API
router.post('/api/createUser', createUser);
router.delete('/api/deleteUser', deleteUser);
router.put('/api/updateUser', updateUser);


router.get('/api/hello', (req, res) => {
    res.json({
        message: `You're logged in as $(res.locals.user.email) with Firebase`
    })
})

module.exports = router;
