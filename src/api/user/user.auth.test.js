//
// ─── AUTH TEST ──────────────────────────────────────────────────────────────────
//

// IMPORTS
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const User = require('./user.model');
const server = require('../../index.js');
chai.use(require('chai-http'));


const dummyUser = {
  email: 'tom',
  password: '1234',
};

describe('Authentication Tests:', () => {
  // SIGN-UP
  it('Should Create a new user and return a cookie', (done) => {
    User.find({}).then((users) => {
      chai.request(server).post('https://southpark-api.herokuapp.com/api/auth/sign-up').send({
        email: 'tom',
        password: '1234',
      }).end(async (error, res) => {
        if (error) done(error);
        const newUsers = await User.find({});
        expect(res).to.have.status(200);
        expect(res).to.have.cookie('UnToken');
        expect(newUsers.length).to.eql(users.length + 1);
        return done();
      });
    });
  });

  // SIGNIN
  it('Should return the user object and return a cookie', (done) => {
    chai.request(server).post('https://southpark-api.herokuapp.com/api/auth/login').send(dummyUser).end((error, res) => {
      if (error) done(error);
      expect(res).to.have.status(200);
      done();
    });
  });

  // LOGOUT
  it('Should remove the cookie from the user', (done) => {
    chai.request(server).post('https://southpark-api.herokuapp.com/api/auth/login').send(dummyUser).end((error, res) => {
      if (error) done(error);
      expect(res).to.have.cookie('UnToken');

      chai.request(server).get('https://southpark-api.herokuapp.com/api/auth/logout').end((err, resp) => {
        if (err) done(err);
        expect(resp).to.not.have.cookie('UnToken');

        done();
      });
    });
  });
});
