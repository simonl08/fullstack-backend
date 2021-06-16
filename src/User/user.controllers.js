const { User } = require('./user.model');

exports.addUser = async (req, res) => {
    console.log(req.body);
    try {
        const user = new User(req.body)
        const savedUser = await user.save();
        res.status(201).send({ savedUser });
    } catch (error) {
        console.log(error);
    };
};

exports.login = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.status(200).send(user);
        console.log(user)
    } catch (error) {
        res.status(400).send({ message: "unable to log in"})
    };
};

exports.updateUser = async (req, res) => {
    try {
        const user = User.findOneAndUpdate(req.body.username, req.body.update, { new: true });// username and update is the key of the .body sent to the fetch request
        res.status(200).send(user) 
    } catch (error) {
        res.status(404).send({ message: "unable to update"})
    };
};

