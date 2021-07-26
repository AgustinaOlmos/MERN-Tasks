const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    //extraer el email y password
    const { email, password } = req.body
    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' })
        }

        // Si existe el email, revisar su password
        const passCorrecto = await bcryptjs.compare(password, usuario.password)
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Password Incorrecto' })
        }

        // Si todo es correcto, crear y firmar el JWT
        // crear
        const payload = {
            usuario: {
                id: usuario.id
            }
        }
        // firmar
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error

            // Msj de confirmacion
            res.json({ token })
        })

    } catch (error) {
        console.log(error)
    }
}

// Obtiene que usuario está autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id)
        res.json({ usuario })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error' })
    }
}