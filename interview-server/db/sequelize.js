const Sequelize = require('sequelize');
const AlertModel = require('../models/alert');
const UserModel = require('../models/user');
const UserLocationModel = require('../models/user_location');
const UserProfileModel = require('../models/user_profile');
const ProfilePhotoModel = require('../models/profile_photo');
const AlertPhotoModel = require('../models/alert_photo');
const ReceivedAlertModel = require('../models/received_alert');
const AlertCommentModel = require('../models/alert_comment');
const SightingModel = require('../models/sighting');
const SightingPhotoModel = require('../models/sighting_photo');
const logger = require('../util/logger')('sequelize');
const config = require('config');

module.exports.init = function(){
    const cfg = config.get('database');
    logger.info("Connecting to PostgreSQL");
    const sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg);

    sequelize
        .authenticate()
        .then(() => {
            logger.info('Connection has been established successfully');
        });

    const User = UserModel(sequelize, Sequelize);
    const Alert = AlertModel(sequelize, Sequelize);
    const UserLocation = UserLocationModel(sequelize, Sequelize);
    const UserProfile = UserProfileModel(sequelize, Sequelize);
    const ProfilePhoto = ProfilePhotoModel(sequelize, Sequelize);
    const AlertPhoto = AlertPhotoModel(sequelize, Sequelize);
    const ReceivedAlert = ReceivedAlertModel(sequelize, Sequelize);
    const AlertComment = AlertCommentModel(sequelize, Sequelize);
    const Sighting = SightingModel(sequelize, Sequelize);
    const SightingPhoto = SightingPhotoModel(sequelize, Sequelize);



    module.exports.User = User;
    module.exports.Alert = Alert;
    module.exports.UserLocation = UserLocation;
    module.exports.UserProfile = UserProfile;
    module.exports.ProfilePhoto = ProfilePhoto;
    module.exports.AlertPhoto = AlertPhoto;
    module.exports.ReceivedAlert = ReceivedAlert;
    module.exports.AlertComment = AlertComment;
    module.exports.Sighting = Sighting;
    module.exports.SightingPhoto = SightingPhoto;
    module.exports.sequelize = sequelize;
};

