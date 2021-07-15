import React, { useContext, useState, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {

    // Extraer el state del proyecto activo
    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext
    // Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext)
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea,
        obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                titulo: ''
            })
        }
    }, [tareaseleccionada])

    // State del Formulario
    const [tarea, guardarTarea] = useState({
        titulo: ''
    })
    // Extraer el nombre de la tarea
    const { titulo } = tarea

    // Si no hay proyecto seleccionado
    if (!proyecto) return null

    // Array destructiring para extraer el proyecto actual
    const [proyectoActual] = proyecto

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        // validar
        if (titulo.trim() === '') {
            validarTarea()
            return
        }

        // Reviar si Edicion o si es Nueva tarea
        if (tareaseleccionada === null) {
            // agregar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id
            tarea.estado = false
            agregarTarea(tarea)
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea)

            //Elimina tareaseleccionada del state
            limpiarTarea()
        }

        // Obtener y Filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id)
        // reiniciar el form
        guardarTarea({
            titulo: ''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        name="titulo"
                        value={titulo}
                        className="input-text"
                        placeholder="Nueva Tarea ..."
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-block btn-submit btn-primario"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    )
}

export default FormTarea