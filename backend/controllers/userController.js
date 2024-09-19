const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register a user
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name, email, password,
            avatar: {
                public_id: "this is sample id",
                url: "profilePicURL"
            }
        });

        sendToken(user, 201, res);

    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: "duplicate email entered"
            })
        }
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

//register as seller
exports.registerSeller = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        user.role = "seller";
       await user.save();
       res.status(201).json({
        success: true,
        message:"registered as a seller"
    })

    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: "duplicate email entered"
            })
        }
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

//login user
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //checking if user has given email and password both
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "please enter email and password both"
            })
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid email or password"
            })
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "invalid email or password"
            })
        }

        sendToken(user, 200, res);

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

//Logout user
exports.logout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        res.status(200).json({
            success: true,
            message: "Logged out"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Forget password
exports.forgetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found !!!"
            })
        }
        //Get Reset Password Token
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n 
        if you have not requested then please ignore it`;

        try {
            await sendEmail({
                email: user.email,
                subject: `Ecommerce password Recovery`,
                message
            })
            res.status(200).json({
                success: true,
                message: `email sent to ${user.email} successfully`
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return next(
                res.status(500).json({
                    success: false,
                    message: error.message
                })
            )
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Reset password
exports.resetPassword = async (req, res, next) => {
    try {
        // creating token hash
        const resetPasswordToken = crypto.createHash("sha256")
            .update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        console.log(user);
        if (!user) {
            return next(
                res.status(400).json({
                    success: false,
                    message: "reset password token is invalid or has been expired"
                })
            )
        }
        if (!(req.body.password === req.body.confirmPassword)) {
            return next(
                res.status(400).json({
                    success: false,
                    message: "password and confirm password did not matched"
                })
            )
        }
        user.password = req.body.password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordExpire = undefined;

        user.save();

        sendToken(user, 200, res);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

//get user details
exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
}

//update password
exports.updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("+password");
        if (!(req.body.oldPassword === req.body.confirmOldPassword)) {
            return res.status(400).json({
                success: false,
                message: "old password and confirm old password not matched"
            })
        }
        console.log(user);
        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "invalid password"
            })
        }
        user.password = req.body.newPassword;
        await user.save();
        sendToken(user, 200, res);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//profile update
exports.updateProfile = async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email
        }

        //we will add cloudinary later


        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            message: "profile updated successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//get all users ---admin
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

//get single user details ---admin
exports.getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(200).json({
                success: false,
                message: `user does not exist with id:${req.params.id}`
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//update user Role ---admin
exports.updateUserRole = async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }

        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        if (!user) {
            return next(
                res.status(400).json({
                    success: false,
                    message: `user does not exist with id:${req.params.id}`
                })
            )
        }

        res.status(200).json({
            success: true,
            message: `successfully user updated`
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//delete user ---admin
exports.deleteUser = async (req, res, next) => {
    try {
        //we will remove cloudinary later
        const user = await User.findByIdAndRemove(req.params.id)
        if (!user) {
            return next(
                res.status(400).json({
                    success: false,
                    message: `user does not exist with id:${req.params.id}`
                })
            )
        }
        res.status(200).json({
            success: true,
            message: "user deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}