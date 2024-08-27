const User = require('../model/user.model');
let logger = require('../utils/logger');
const { getAccessToken, isAuthorized, getContact, getAccountInfo } = require('../auth/hubspotAuth');

exports.insertIntoUser = async (user_info) => {
    try { 
        const userInfo = await User.findOne({ portalID: user_info.hub_id});
        if (userInfo){
            logger.info("User Already Exist");
            return {portalID: userInfo.portalID};
        }

        if (!userInfo) {
            //insert into user model
            const user = new User({
                name: user_info.name || "",
                companyName: user_info.companyName || "",
                email:  user_info.user || "",
                phoneNumber: user_info.phoneNumber || "",
                countryCode: user_info.countryCode || "",
                portalID: user_info.hub_id || "",
                accountType: user_info.accountType || "",
                timeZone: user_info.timeZone || "",
                companyCurrency: user_info.companyCurrency || "",
                uiDomain:  user_info.hub_domain || "",
                dataHostingLocation: user_info.dataHostingLocation || "",
                additionalCurrencies: user_info.additionalCurrencies || "",
            });
            await user.save();
            logger.info("user data inserted to mongo", user);
            return user;
        }
        else{
            logger.info(user_info.hub_id + ' already exist');
            return "Cannot Insert data into User model";
        }
            //console.log(`user with ${accInfo.email} already exist`);
    } catch (error) {
        //console.log('Error inserting USER document:', error);
        return (error);
    }
}


exports.getUser = async (req,res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
}

exports.profile = async (req, res) => {
    try{
        const portalId = (req.params.portalID); // Get the user ID from the URL parameter
      
        const userInfo = await User.findOne({ portalID: portalId }); // Find the user by ID
        if (!userInfo) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        return res.send(userInfo);
    }catch (err) {
        res.send('Not Logged In'+ err);
    }
}

exports.getUserByID = async (req, res) => {
    const userId = req.params.id; // Get the user ID from the URL parameter
    console.log(req.params);
    const userInfo = await User.findOne({ _id: userId }); // Find the user by ID
    if (!userInfo) {
        return res.status(404).json({ error: 'User not found' });
    }
    return res.send(userInfo);
};


exports.updateUserInfoAfterPayment = async(portalID, chargeData) => {
    try {
        console.log("--------in updateUserInfoAfterPayment=====" + JSON.stringify(chargeData));
        let user = await User.findOne({ portalID });
        if (!user) {
            user = new User({
                portalID,
                name: chargeData.name,
                phoneNumber: chargeData.phoneNumber,
                companyName: chargeData.companyName,
                countryCode: chargeData.countryCode
            });
        } else {
            user.name = chargeData.name;
            user.phoneNumber = chargeData.phoneNumber;
            user.companyName = chargeData.companyName;
            user.countryCode = chargeData.countryCode;
        }
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user information:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
//user/update
exports.updateUser = async (req, res) => {
    console.log(req.body);
    try {
        const userInfoUpDate = await User.findOneAndUpdate(
            { portalID: req.body.portalID },
            {
                $set:
                {
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    companyName: req.body.companyName,
                    countryCode: req.body.countryCode,
                },
            },
            { new: true }
        );
        if (!userInfoUpDate) {
            return res.status(404).json({ error: 'User not found' });
        }
        //return res.redirect("http://localhost:3000")
        return res.status(200).json(userInfoUpDate);
    } catch (error) {
        return res.status(400).json(error);
    }
};