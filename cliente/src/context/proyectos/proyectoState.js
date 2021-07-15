import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types'


const ProyectoState = props => {

    const proyectos = [
        { id: 1, titulo: 'Tienda Virtual' },
        { id: 2, titulo: 'Intranet' },
        { id: 3, titulo: 'Diseño Web' },
        { id: 4, titulo: 'MERN' }
    ]

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Funciones para el CRUD
    const mostrarForm = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }
    // Obtener los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }
    // Agregar nuevo proyecto
    const agregarProyecto = proyecto => {
        proyecto.id = uuidv4()
        // Insertar el proyecto en el state
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }
    // Validar el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }
    // Selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }
    // Eliminar un proyecto
    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mostrarForm,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState
