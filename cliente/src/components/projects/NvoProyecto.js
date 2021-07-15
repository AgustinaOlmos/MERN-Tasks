import React, { Fragment, useState, useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NvoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext)
    const { formulario, errorformulario, mostrarForm, agregarProyecto, mostrarError } = proyectosContext

    const [proyecto, guardarProyecto] = useState({
        titulo: ''
    })
    const { titulo } = proyecto

    // Lee el contenido del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault()

        // Validar el proyecto
        if (titulo === '') {
            mostrarError()
            return
        }

        // si todo ok, agregar al state
        agregarProyecto(proyecto)

        // Reiniciar el form
        guardarProyecto({
            titulo: ''
        })

    }

    // Mostrar el Formulario
    const onClickForm = () => {
        mostrarForm()
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickForm}
                /* onclick={()=> mostrarForm()} */

            >Nuevo Proyecto</button>

            {formulario
                ? ( <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input
                            type="text"
                            name="titulo"
                            value={titulo}
                            className="input-text"
                            placeholder="Titulo del Proyecto"
                            onChange={onChangeProyecto}
                        />
                        <input
                            type="submit"
                            value="Agregar Proyecto"
                            className="btn btn-block btn-primario"
                        />
                    </form>
                ) : null}

            {errorformulario ? <p className="mensaje error">Titulo Obligatorio</p> : null}

        </Fragment>
    )
}

export default NvoProyecto