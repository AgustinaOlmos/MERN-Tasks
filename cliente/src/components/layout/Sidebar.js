import React from 'react'
import NvoProyecto from '../projects/NvoProyecto'
import ListaProyectos from '../projects/ListaProyectos'

const Sidebar = () => {
    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>

            <NvoProyecto />

            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ListaProyectos />
            </div>
        </aside>
    )
}

export default Sidebar
