const params = new URLSearchParams(window.location.search);

// Referencias de JQuery
const divUsuarios = $('#divUsuarios');
const formEnviar = $('#formEnviar');
const txtMensaje = $('#txtMensaje');
const divChatbox = $('#divChatbox');

// Renderizar usuarios
function renderizarUsuarios(usuarios) {
    console.log(usuarios);

    let html = '';

    html += `<li>
        <a href="javascript:void(0)" class="active">
            Chat de <span> ${params.get('sala')}</span>
        </a>
    </li>`;

    for (let i = 0; i < usuarios.length; i++) {
        html += `<li>
            <a data-id="${usuarios[i].id}" href="javascript:void(0)">
                <img
                    src="assets/images/users/1.jpg"
                    alt="user-img"
                    class="img-circle"
                />
                <span>${usuarios[i].nombre}
                    <small class="text-success">online</small>
                </span>
            </a>
        </li>`;
    }

    divUsuarios.html(html);
}

// Renderizar Mensajes
function renderizarMensajes(mensaje, yo = false) {
    let html = '';

    const liEstilo = yo ? 'reverse' : '';
    const divChatEstilo = yo ? 'inverse' : 'info';
    const imagenYo = yo ? '<div class="chat-img"> <img src="assets/images/users/1.jpg" alt="user"/></div>' : '';
    const imagen = yo ? '' : '<div class="chat-img"> <img src="assets/images/users/1.jpg" alt="user"/></div>';

    html += `<li class="animated fadeIn ${liEstilo}">
        ${mensaje.nombre === 'Servidor' ? '' : imagen}
        <div class="chat-content">
            <h5>${mensaje.nombre}</h5>
            <div class="box bg-light-${mensaje.nombre === 'Servidor' ? 'primary' : divChatEstilo}">
                ${mensaje.mensaje}
            </div>
        </div>
        ${mensaje.nombre === 'Servidor' ? '' : imagenYo}
        <div class="chat-time">${mensaje.fecha}</div>
    </li>`;

    divChatbox.append(html);
}

// Listeners
divUsuarios.on('click', 'a', function () {
    const id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', (e) => {
    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    // Enviar mensaje
    socket.emit('crearMensaje', {
        nombre: '',
        mensaje: txtMensaje.val()
    }, (mensaje) => {
        renderizarMensajes(mensaje, true);
        txtMensaje.val('').focus();
        scrollBottom();
    });

    // console.log(txtMensaje.val());
});
