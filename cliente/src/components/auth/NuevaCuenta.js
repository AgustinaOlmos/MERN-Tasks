import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NuevaCuenta = () => {

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '', 
        confirmar: ''
    })
    const { nombre, email, password, confirmar} = usuario

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault()

        // Validar que no haya campor vacios

        // Password con un min de 6 caracteres

        // Revisar q los 2 pass sean iguales

        // Pasarlo al action
    }


    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                     <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Tu Nombre"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Tu Email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Tu Password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Repite tu Password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                   Iniciar Sesion
                </Link>
            </div>
        </div>
    )
}

export default NuevaCuenta
