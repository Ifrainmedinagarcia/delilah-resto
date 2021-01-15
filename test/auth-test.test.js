const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const app = require('../app').app

describe('Suite of test auth', () =>{

    it('should return 401 when no jwt available', (done)=>{
        //Cuando la llamada no tiene correctamente la llave
        chai.request(app)
        .get('/order')
        .end((err, res)=>{
            chai.assert.equal(res.statusCode, 401)
            done()
        })
    })
    it('should return 200 when jwt is valid', (done)=>{
        //Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .post('/login')
            .end((err, res)=>{
                chai.request(app)
                    .get('/order')
                    .set('Authoritazion', `JWT ${res.body.token}`)
                    .end((err, res)=>{
                        chai.assert.equal(res.statusCode, 200)
                        done()
                    })
            })
    })
    it('should return 200 when jwt is valid', ()=>{
        //Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .post('/auth')
            .end((err, res)=>{
                chai.assert.equal(res.text, 'soy registro')
            })
    })
})