const express = require('express');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

const Item = require('../models/items');
 
const router = new express.Router()

router.post('/items', async (req, res) => {
    try {
        const newItem = new Item(
            req.body
            // owner: req.user._id
        )

        console.log(newItem)

        await newItem.save()
        res.status(201).json(newItem)

    } catch (error) {
        res.status(400).send( error)
    }
})
 
router.get('/items', async (req, res) => {
    try {
        const items =await Item.find({})

        res.status(201).send(items);
    } catch (error) {
        res.status(401).send({ message: error })
    }
})
router.get('/items/:id', async (req, res) => {
    try {
        const item =await Item.findById( req.params.id )

        console.log(item)
        if (!item) {
            res.status(201).send({ error: 'item not found' })
        }
        res.status(201).send(item);
    } catch (error) {
        res.status(401).send({ message: error })
    }
})

router.patch('/items/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'description', 'category', 'price']

    const isValidOperation = updates.every((update) => allowUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates' })
    }

    try {
        const item = Item.findOne({ _id: req.params.id })
        if (!item) {
            res.status(401).send({})
        }
        updates.forEach(update => item[update] = req.body[update]);
        await item.save()
        res.status(200).send(item)
    } catch (error) {

    }
})

router.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findOneAndDelete({ _id: req.params.id })
        if (!deletedItem) { 
            res.status(404).send({ error: "Item not found" })
        }
        res.send(deletedItem)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router