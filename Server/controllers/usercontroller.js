const User = require('../model/user.model');
let logger = require('../utils/logger');
const { getAccessToken, isAuthorized, getContact, getAccountInfo } = require('../auth/hubspotAuth');

exports.insertIntoUser = async (req, res, user_info) => {
    try { 
        const stripeEmail = global.stripeEmail;
        logger.info("-----global.stripeEmail1111-----"+stripeEmail);
        const userInfo = await User.findOne({ portalID: (req.body.portalID ||  user_info.portalID)});
        if (userInfo){
            const updateUser = await User.findOneAndUpdate(
                { portalID: userInfo.portalID },
                {
                    name: req.body.name || user_info.name || "",
                    companyName: req.body.companyName || user_info.companyName || "",
                    email: stripeEmail || req.body.email || user_info.email || "",
                    phoneNumber: req.body.phoneNumber || user_info.phoneNumber || "",
                    countryCode: req.body.countryCode || user_info.countryCode || "",
                    accountType: req.body.accountType || user_info.accountType || "",
                    timeZone: req.body.timeZone || user_info.timeZone || "",
                    companyCurrency: req.body.companyCurrency || user_info.companyCurrency || "",
                    uiDomain: req.body.uiDomain || user_info.uiDomain || "",
                    dataHostingLocation: req.body.dataHostingLocation || user_info.dataHostingLocation || "",
                    additionalCurrencies: req.body.additionalCurrencies || user_info.additionalCurrencies || "",
                },
                {
                    new: true, // Return the updated document
                    upsert: true, // Insert the document if it does not exist
                }
            );
            await update_Payment_Info(updateUser);
            return updateUser;
        }

        if (!userInfo) {
            //insert into user model
            const user = new User({
                name: req.body.name || user_info.name || "",
                companyName: req.body.companyName || user_info.companyName || "",
                email: stripeEmail || req.body.email || user_info.email || "",
                phoneNumber: req.body.phoneNumber || user_info.phoneNumber || "",
                countryCode: req.body.countryCode || user_info.countryCode || "",
                portalID: req.body.portalID || user_info.portalID || "",
                accountType: req.body.accountType || user_info.accountType || "",
                timeZone: req.body.timeZone || user_info.timeZone || "",
                companyCurrency: req.body.companyCurrency || user_info.companyCurrency || "",
                uiDomain: req.body.uiDomain || user_info.uiDomain || "",
                dataHostingLocation: req.body.dataHostingLocation || user_info.dataHostingLocation || "",
                additionalCurrencies: req.body.additionalCurrencies || user_info.additionalCurrencies || "",
            });
            await user.save();
            console.log("user data inserted to mongo", user);
            req.session.stripeEmail = null
            logger.info(`New Account signUp | email:${req.body.email}| HS portalid:${req.body.portalID}`);
            await update_Payment_Info(user);
            return user;
        }
        else{
            logger.info(user_info.portalID + ' already exist');
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