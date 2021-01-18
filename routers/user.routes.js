const express = require('express')
const router = express.Router()


router.route('/')
    .get((req, res) =>{
        res.json({
            error: null,
            data:{
                title: 'Mi ruta protegida',
                user: req.user
            }
        })
    })

module.exports = router

