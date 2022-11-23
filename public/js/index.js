const socket = io();

const formAgregarProductos = document.getElementById('formAgregarProductos')
formAgregarProductos.addEventListener('submit', e => {
    e.preventDefault()


    const productos = {
        title: formAgregarProductos[0].value, 
        price: formAgregarProductos[1].value, 
        img: formAgregarProductos[2].value,
    }

    socket.emit('update', productos);

    formAgregarProductos.reset()
})

socket.on('productos', manejarEventoPersonas);

async function manejarEventoPersonas(productos) {

    const recursoRemoto = await fetch('plantillas/historial.hbs')

    const textoPlantilla = await recursoRemoto.text()

    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ productos })

    document.getElementById('productos').innerHTML = html
}

//chats

function mostrarMensajes(mensajes) {
    const mensajesParaMostrar = mensajes.map(({ email ,fecha, texto }) => {
        return `<li> <span style="color:blue;"><strong>${email}</strong></span> - <span style="color:#804000">${fecha}</span> : <span style="color:#008000; font-style: italic">${texto}</span> </li>`
    })

    const mensajesHtml = `
    <ul>
        ${mensajesParaMostrar.join('\n')}
    </ul>`

    const listaMensajes = document.getElementById('listaMensajes')
    listaMensajes.innerHTML = mensajesHtml

}

socket.on('mensajesActualizados', mensajes => {
    mostrarMensajes(mensajes)
})

const botonEnviar = document.getElementById('botonEnviar')
botonEnviar.addEventListener('click', e => {
    const inputAutor = document.getElementById('inputCorreo')
    const inputMensaje = document.getElementById('inputMensaje')
    if (inputAutor.value && inputMensaje.value) {
        const mensaje = {
            email: inputCorreo.value,
            texto: inputMensaje.value
        }
        socket.emit('nuevoMensaje', mensaje)
    } else {
        alert('ingrese algun mensaje')
    }
})