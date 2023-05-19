const express = require('express')
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth')
const User = require('../models/user');
const router = new express.Router()

 

// router.post('/register', async (req, res) => {
//     const { name, email, phoneNo } = req.body
//     const user = new User({
//         name,
//         email,
//         phoneNo
//       })   
//       try{
//         console.log(name, email, phoneNo)
//         const savedUser = await user.save();
//         console.log('User saved to database:', savedUser);
//         res.status(201).send(savedUser);
//       }catch(error) {
//         console.error('Error saving user to database:', error);
//         res.status(500).send('Internal Server Error');
//       }
// })

// router.post('/login', async (req, res) => {
//     try {
//         console.log(req.body.email);
//       const user = await User.findOne({email : req.body.email})
//       console.log(user);
//       const token = await user.generateAuthToken()
//       console.log(token);
//       res.send({ user, token})
//     } catch (error) {
//       res.status(400).send({error})
//      }
//     })



//     //logout
// router.post('/logout', auth, async (req, res) => {
   
//     try {
//        req.user.tokens =  req.user.tokens.filter((token) => {
//             return token.token !== req.token 
//         })

//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send()
//     }
// })

//Logout All 
router.post('/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()        
    }
})

router.get('/users', async (req, res) => {
        
    try {
        const allUsers = await User.find({})
        console.log(allUsers)
             res.send(allUsers);
       
    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete('/user', async(req, res) => {
        const id = req.params.id
    try {
        const user = await User.findOne(user => user._id !== id)
        console.log(user)
             res.send('user not found');
       
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router
