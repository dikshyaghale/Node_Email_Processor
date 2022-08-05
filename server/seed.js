const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

async function test() {
    await mongoose.connect("mongodb://localhost:27017/bulk_email");

    const { model: User, data: userData } = require("./initialData/users");
    await User.deleteMany({});

    for (let user of userData) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        await new User({ ...user, password: hashedPassword }).save();
    }

    mongoose.disconnect();
    console.info("Done!");
}

test();
