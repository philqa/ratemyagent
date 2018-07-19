let chai = require('chai'),
    should = chai.should(),
    ex = chai.expect;
let request = require('request').defaults({jar: true});

import 'mocha';

let API_BASE_URL = 'https://api.ratemyagent.com.au';
let LOGIN_URL = API_BASE_URL + '/Account/Login';
let AGENT_SHORTLIST_URL = API_BASE_URL + '/Users/Me/Shortlist/Agents';
let LOGIN_DETAILS = {
    'email': 'phillipmarkhicks@gmail.com',
    'password': 't0ps3cr3t!'
};

describe('GET /Users/Me/Shortlist/Agents', () => {

    it('should return shortlisted agents for authenticated user', (done) => {
        // set request options
        let options = {
            method: 'POST',
            url: LOGIN_URL,
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(LOGIN_DETAILS)
        };

        // firstly authenticate via /Account/Login
        request(options, (err, res, body) => {
            if (err) throw new Error(err);
            const payload = JSON.parse(body);
            // confirm successful auth
            ex(res.statusCode).to.equal(200);
            ex(payload.Data.IsAuthenticated).to.equal(true);
            // next make shortlist agent request
            request(AGENT_SHORTLIST_URL, (err, res, body) => {
                if (err) throw new Error(err);
                ex(res.statusCode).to.equal(200);
                const payload = JSON.parse(body);
                ex(payload.Total).to.equal(0);
                done();
            });
        });
    });

    it('should return an error if a valid auth cookie does not exist', (done) => {
        // clear cookies and send an unauthenticated agents request
        request.defaults({jar: false})(AGENT_SHORTLIST_URL, (err, res, body) => {
            if (err) throw new Error(err);
            const payload = JSON.parse(body);
            ex(payload.IsSuccessful).to.equal(false);
            ex(payload.Status).to.equal('Invalid');
            ex(payload.Message).to.equal('Please login or provide agents you wish to see via shortlist.');
            done();
        });
    });

});
