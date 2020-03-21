const request = require('request');
const logger = require('./logger')('alert_notification');

module.exports.notifyNearbyUsers = async function(latitude, longitude, alert) {
    let notified_count = await new Promise((resolve, reject) => {
        request.post('https://onesignal.com/api/v1/notifications', {
            json: {
                app_id: "cd5e9e93-94e7-4420-a52f-01eebc677202",
                headings: {"en": "Someone needs you!"},
                contents: {"en": "An alert has been created close to you!"},
                data: {"alert": {
                        "id": alert.id,
                        "owner" : alert.owner
                    }},
                filters: [{"field": "location",
                    lat: latitude,
                    long: longitude,
                    radius: "1000"
                }]
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ODY4MTA5ZTYtMWFmYy00N2ExLWFlNzgtMDc4MDIzMjdjOTQ1'
            },
        }, (error, res, body) => {
            if (error) {
                logger.error(error);
                reject(0)
            }
            else {
                resolve(body.recipients);
            }
        });
    });

    return notified_count;

};

//module.exports.notifyNearbyUsers(-34.683674, -58.339073);

