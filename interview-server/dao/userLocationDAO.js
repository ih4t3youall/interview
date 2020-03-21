const {UserLocation} = require('../db/sequelize');

module.exports.updateUserLocation = async function updateUserLocation(user_location, options){
    const updated = await UserLocation.update(user_location, options);
    if (updated[0] === 1) return true; // Return if updated. Else, the entry doesn't exist, so we create it

    await UserLocation.create(user_location);
    return true;
};
