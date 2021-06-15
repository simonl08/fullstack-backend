const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('unable to log in')
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) {
        throw new Error('unable to log in');
    }

    return user;

}

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};