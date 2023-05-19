const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// const CryptoJS = require('CryptoJS');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        // required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password musn\'t contain password')
            }
        }
    },
    phoneNo: {
        type: String,
        // required: true,
        minLength: 7
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    token : {
        type:String,
        required : true
    }
    // cart: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         required: true,
    //         ref: 'Cart'
    //     }
    // ],
    // orders: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Order'
    //     }
    // ]
}, {
    timestamps: true
})


// generate auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString(), isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET, { expiresIn: "3d" })

    // user.tokens = user.tokens.concat({ token })
        user.token = token

    await user.save()
    return token
}

//login in users
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to log in')
    }

    const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        8
      );
      const OriginalPassword = hashedPassword.toString(Cryt.enc.Utf8);
  
      OriginalPassword !== req.body.password &&
        res.status(401).json("Wrong credentials!");
    // const isMatch = await bcrypt.compare(password, user.password)
    // console.log(isMatch)
    // if (!isMatch) {
    //     throw new Error('Unable to login') 
    // }

    return user
}

// Hash plain password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User