const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = require('chai');

describe("index.js", () => {
   describe("responds to /",() => {
      it("should return status call 200 for GET call", (done) => {
         chai.request(app)
            .get('/')
            .end((err, res) => {
               if (err) done(err);
               expect(res).to.have.status(200);
               done();
            });
      });
      it("should return status call 404 for other GET calls", (done) => {
         chai.request(app)
            .get('/abc')
            .end((err, res) => {
               if (err) done(err);
               expect(res).to.have.status(404);
               done();
            })
      });
   });
   describe("route /api/orders", () => {
      it("should return status call 200 for GET orders", (done) => {
         chai.request(app)
             .get('/api/orders')
             .end((err, res) => {
               if(err) done(err);
               expect(res).to.have.status(200);
               expect(res.body).to.not.be.empty;
               done();
             })
      });
      it("should return status call 200 for POST order",(done) => {
         chai.request(app)
            .post('/api/orders')
            .send({
               "components": ["I","A","D","F","K"]
            })
            .end((err,res) => {
               if(err) done(err);
               expect(res).to.have.status(200);
               expect(res.body).to.not.be.equal("Invalid order id !!");
               done();
            })
      });
      it("should return call 400 for POST order of invalid req body data",(done) => {
         chai.request(app)
            .post('/api/orders')
            .send({
               "components": ["I","A","D","F","A"]
            })
            .end((err,res) => {
               if(err) done(err);
               expect(res).to.have.status(400);
               //console.log(res)
               expect(res.text).to.be.equal("Invalid Data");
               done();
            })
      });
      it("should return call 400 for POST order of empty req.body",(done) =>  {
         chai.request(app)
            .post('/api/orders')
            .send({})
            .end((err,res) => {
               if(err) done(err);
               expect(res).to.have.status(400);
               expect(res.text).to.be.equal("Please provide inputs");
               done();
            })
      })
   });
   describe("route /api/orders/:id",() => {
      it("should return call 200 for GET order of valid order id",(done) => {
         chai.request(app)
            .get('/api/orders/1')
            .end((err,res) => {
               if(err)  done(err);
               expect(res).to.have.status(200);
               expect(res.body).to.not.be.equal('Invalid order id !!');
               done();
            })
      });
      it("should return call 400 for GEt order of invalid order id",(done) => {
         chai.request(app)
            .get('/api/orders/4')
            .end((err,res) => {
               if(err) done(err);
               expect(res).to.have.status(404);
               //console.log(res);
               expect(res.text).to.equal('Invalid order id !!');
               done();
            })
      })
   });
});