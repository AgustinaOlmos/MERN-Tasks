import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Tarea = ({ tarea }) => {
    // Extrae de un proyecto activo
    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext
    // Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext)
    const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext

    // Extraer el proyecto - destructuring
    const [proyectoActual] = proyecto

    // Funcion que se ejecuta cuando el usuario da click en "Elimnar" tarea
    const tareaEliminar = id => {
        eliminarTarea(id)
        obtenerTareas(proyectoActual.id)
    }

    // Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if (tarea.estado) tarea.estado = false
        else tarea.estado = true
        cambiarEstadoTarea(tarea)
    }

    // Funcion para editar la tarea seleccionada
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.titulo}</p>
            <div className="estado">
                {tarea.estado
                    ? (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                    : (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea.id)}
                >Eliminar</button>
            </div>
        </li>


    )
}

export default Tarea
