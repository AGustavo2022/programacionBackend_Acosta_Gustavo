const socket = io();

const formAgregarProductos = document.getElementById('formAgregarProductos')
formAgregarProductos.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

    // armo la persona extrayendo los datos de los campos del formulario

    const productos = {
        title: formAgregarProductos[0].value, // document.getElementById('txtNombre').value
        price: formAgregarProductos[1].value, // document.getElementById('txtApellido').value
        img: formAgregarProductos[2].value,
    }

    // envio la persona al servidor via socket
    socket.emit('update', productos);

    // limpio el contenido de los campos del formulario
    formAgregarProductos.reset()
})

// agrego manejador de eventos de tipo 'personas'
socket.on('productos', manejarEventoPersonas);

async function manejarEventoPersonas(productos) {
    // console.log(personas)

    // busco la plantilla del servidor
    const recursoRemoto = await fetch('plantillas/historial.hbs')

    //extraigo el texto de la respuesta del servidor
    const textoPlantilla = await recursoRemoto.text()

    //armo el template con handlebars
    const functionTemplate = Handlebars.compile(textoPlantilla)

    // relleno la plantilla con las personas recibidas
    const html = functionTemplate({ productos })

    // reemplazo el contenido del navegador con los nuevos datos
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

    // console.table(mensajesParaMostrar)
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