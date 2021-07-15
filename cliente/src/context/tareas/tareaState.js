import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'

const TareaState = props => {

    const initialState = {
        tareas: [
            { id: 1, titulo: 'Elegir Plataforma', estado: true, proyectoId: 1 },
            { id: 2, titulo: 'Elegir Colores', estado: false, proyectoId: 2 },
            { id: 3, titulo: 'Elegir Plataformas de Pago', estado: false, proyectoId: 3 },
            { id: 4, titulo: 'Elegir Hoisting', estado: true, proyectoId: 4 },
            { id: 5, titulo: 'Elegir Plataforma', estado: true, proyectoId: 4 },
            { id: 6, titulo: 'Elegir Colores', estado: false, proyectoId: 3 },
            { id: 7, titulo: 'Elegir Plataformas de Pago', estado: false, proyectoId: 2 },
            { id: 8, titulo: 'Elegir Hoisting', estado: true, proyectoId: 1 }
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    }

    // crear Dispatch y State
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    //Funciones
    // Obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }
    // Agregar un tarea al proyecto seleccionado
    const agregarTarea = tarea => {
        tarea.id = uuidv4()
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }
    // Valida y/o muestra un error
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }
    // Eliminar tarea por Id
    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }
    // Cambia el estado de cada tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }
    // Extraa una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    // Edita una tarea
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }
    // Elimina la tareaseleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState
