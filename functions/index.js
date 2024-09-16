const functions = require('firebase-functions');
const admin = require('firebase-admin');
const CryptoJS = require('crypto-js');

admin.initializeApp(functions.config().firebase);

exports.createCongregation = functions.https.onRequest((req, res) => {
    const congregationName = req.query.congregation;
    if (congregationName) {
        const user = {
            username: 'admin',
            password: CryptoJS.MD5('admin').toString(),
            name: 'Administrator',
            role: 'admin'
        };
        admin.database().ref(`${congregationName}/users`).push(user).then(snapshot => {
            res.status(200).send(`${congregationName} has been created!`);
        });
    } else {
        res.status(400).send(`No congregation provided!`);
    }
});

exports.fixTerritoryAssigining = functions.https.onRequest((req, res) => {
    admin.database().ref().once('value', snapshot => {console.log(snapshot.val())});
    res.status(200).send(`fixTerritoryAssigining works!`);
});