'use strict';

//const bc_client = require('../blockchain_sample_client');
//const bcrypt = require('bcryptjs');
var bcSdk = require('../src/blockchain/blockchain_sdk');
var user = 'risabh.s';
var affiliation = 'fundraiser';
//exports is used here so that registerUser can be exposed for router and blockchainSdk file
exports.examineClaim = (claim_no, assesseddamagevalue, assessedclaimvalue, examinerid) =>
    new Promise((resolve, reject) => {


        const claim_details = ({
            claim_no: claim_no,
            assesseddamagevalue: assesseddamagevalue,
            assessedclaimvalue: assessedclaimvalue,
            examinerid: examinerid
        });

        console.log("ENTERING THE examineClaim from examineClaim.js to blockchainSdk");

        bcSdk.examineClaim({
                user: user,
                claim_details: claim_details
            })



            .then(() => resolve({
                status: 201,
                message: 'claim value examined Sucessfully !'
            }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({
                        status: 409,
                        message: ' claims already examined !'
                    });

                } else {
                    console.log("error occurred" + err);

                    reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
                }
            });
    });