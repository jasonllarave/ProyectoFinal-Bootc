

// ─Login
const btnLogin = document.getElementById('btn-login');
if (btnLogin) {
    btnLogin.addEventListener('click', () => {
        const usuario    = document.getElementById('usuario').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();
        const validacion = document.getElementById('validacion');
        const error      = document.getElementById('error');

        if (usuario === '' && contrasena === '') {
            validacion.textContent = 'Debe llenar los campos';
            validacion.style.display = 'block';
            error.style.display = 'none';
        } else if (usuario === '') {
            validacion.textContent = 'El usuario es obligatorio';
            validacion.style.display = 'block';
            error.style.display = 'none';
        } else if (contrasena === '') {
            validacion.textContent = 'La contraseña es obligatoria';
            validacion.style.display = 'block';
            error.style.display = 'none';
        } else if (usuario === 'admin' && contrasena === '9876') {
            window.location.href = 'index.html';
        } else {
            error.style.display = 'block';
            validacion.style.display = 'none';
        }
    });
}


// ─ Cerrar sesion
const btncerrar = document.getElementById('cerrar');
if (btncerrar) {
    btncerrar.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}


// ─Popovers
const popoverList = document.querySelectorAll('[data-bs-toggle="popover"]');
if (popoverList.length > 0) {
    popoverList.forEach(el => new bootstrap.Popover(el));
}


// ─Likes
const likes1 = document.querySelectorAll('.likes1');

if (likes1.length > 0) {

    likes1.forEach(btn => {

        const numSpan = btn.querySelector('.num-likes');

        let contador = parseInt(numSpan.textContent.trim());

        let activo = false;

        btn.addEventListener('click', () => {

            if (!activo) {

                // Dar like
                contador++;
                activo = true;

                btn.classList.add('activo');
                btn.classList.remove('fa-thumbs-down');
                btn.classList.add('fa-thumbs-up');

            } else {

                // Quitar like
                contador--;
                activo = false;

                btn.classList.remove('activo');
                btn.classList.remove('fa-thumbs-up');
                btn.classList.add('fa-thumbs-down');

            }

            numSpan.textContent = contador;

        });

    });

}


// ─Comentarios
const seccionesComentarios = document.querySelectorAll('.comentarios-seccion');
if (seccionesComentarios.length > 0) {
    seccionesComentarios.forEach(seccion => {
        const input      = seccion.querySelector('.campo-comentario');
        const btnComentar = seccion.querySelector('.btn-comentar');
        const lista      = seccion.querySelector('.lista-comentarios');

        const agregar = () => {
            const texto = input.value.trim();
            if (!texto) return;

            const item    = document.createElement('div');
            item.classList.add('comentario');

            const avatar  = document.createElement('img');
            avatar.src = 'assets/per.jpg';
            avatar.alt = 'camilo';
            avatar.classList.add('comentario-avatar');
            

            const burbuja = document.createElement('div');
            burbuja.classList.add('comentario-burbuja');
            burbuja.textContent = texto;

            item.appendChild(avatar);
            item.appendChild(burbuja);
            lista.appendChild(item);
            input.value = '';
            lista.scrollTop = lista.scrollHeight;
        };

        btnComentar.addEventListener('click', agregar);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') agregar(); });
    });
}


// ─Expandir imagen ver mas
const detalles = document.querySelectorAll('[id^="detalle-"]');
if (detalles.length > 0) {
    detalles.forEach(detalle => {
    const postCard = detalle.closest('.post-card');
    if (!postCard) return;
    const img = postCard.querySelector('.post-img');

    detalle.addEventListener('show.bs.collapse', () => {
        img.style.height = 'auto';        // ← se adapta al contenido
        img.style.maxHeight = '790px';    // ← máximo que puede crecer
        img.style.transition = 'max-height 0.4s ease';
    });

    detalle.addEventListener('hide.bs.collapse', () => {
        img.style.height = '200px';
        img.style.maxHeight = '200px';
        img.style.transition = 'max-height 0.4s ease';
    });
});
}


// ─Stories flechas
const storiesScroll = document.getElementById('storiesScroll');
const arrowLeft     = document.getElementById('arrowLeft');
const arrowRight    = document.getElementById('arrowRight');
if (arrowLeft && arrowRight && storiesScroll) {
    arrowLeft.addEventListener('click',  () => storiesScroll.scrollBy({ left: -220, behavior: 'smooth' }));
    arrowRight.addEventListener('click', () => storiesScroll.scrollBy({ left:  220, behavior: 'smooth' }));
}


// ─Editar perfil
const btnGuardarPerfil = document.getElementById('btn-guardar-perfil');
if (btnGuardarPerfil) {
    btnGuardarPerfil.addEventListener('click', function () {
        const nombre = document.getElementById('input-nombre-perfil').value.trim();
        const ciudad = document.getElementById('input-ciudad-perfil').value.trim();
        const bio    = document.getElementById('input-bio-perfil').value.trim();
        const foto   = document.getElementById('input-foto-perfil').files[0];
        const msg    = document.getElementById('msg-perfil');

        if (nombre === '' || ciudad === '' || bio === '') {
            msg.style.display = 'block';
            return;
        }

        msg.style.display = 'none';
        document.querySelector('section.text-center h2').textContent = nombre;
        document.querySelectorAll('section.text-center p')[0].textContent = ciudad;
        document.querySelectorAll('section.text-center p')[1].textContent = bio;

        if (foto) {
            const reader = new FileReader();
            reader.onload = e => { document.querySelector('.perfil-foto').src = e.target.result; };
            reader.readAsDataURL(foto);
        }

        bootstrap.Modal.getInstance(document.getElementById('modalEditarPerfil')).hide();
    });
}


// ─Publicar evento 
const btnPublicarEvento = document.getElementById('btn-publicar-evento');
if (btnPublicarEvento) {
    btnPublicarEvento.addEventListener('click', function () {
        const nombre      = document.getElementById('input-nombre-evento').value.trim();
        const ciudad      = document.getElementById('input-ciudad-evento').value.trim();
        const fecha       = document.getElementById('input-fecha-evento').value;
        const descripcion = document.getElementById('input-descripcion-evento').value.trim();
        const fotoInput   = document.getElementById('input-foto-evento').files[0];
        const msg         = document.getElementById('msg-evento');

        if (nombre === '' || ciudad === '' || fecha === '' || descripcion === '') {
            msg.style.display = 'block';
            return;
        }

        msg.style.display = 'none';

        const partes = fecha.split('-');
        const fechaFormateada = partes[2] + '/' + partes[1] + '/' + partes[0];

        if (fotoInput) {
            const reader = new FileReader();
            reader.onload = e => agregarCard(e.target.result, nombre, ciudad, fechaFormateada, descripcion);
            reader.readAsDataURL(fotoInput);
        } else {
            agregarCard('assets/per.jpg', nombre, ciudad, fechaFormateada, descripcion);
        }

        document.getElementById('input-nombre-evento').value     = '';
        document.getElementById('input-ciudad-evento').value     = '';
        document.getElementById('input-fecha-evento').value      = '';
        document.getElementById('input-descripcion-evento').value = '';
        document.getElementById('input-foto-evento').value       = '';

        const collapse = bootstrap.Collapse.getInstance(document.getElementById('formCrearEvento'));
        if (collapse) collapse.hide();
    });
}

function agregarCard(imgSrc, nombre, ciudad, fecha, descripcion) {
    const lista = document.getElementById('lista-eventos-perfil');
    const col   = document.createElement('div');
    col.classList.add('col-md-6');

    col.innerHTML =
        '<div class="card post-card">' +
            '<div class="post-header">' +
                '<img src="assets/per.jpg" class="Fperfil" alt="Camilo">' +
                '<div class="post-header-info">' +
                    '<p class="nombre">Camilo Llarave</p>' +
                    '<p class="tiempo">Ahora mismo</p>' +
                '</div>' +
            '</div>' +
            '<img src="' + imgSrc + '" class="post-img" alt="' + nombre + '">' +
            '<div class="post-texto">' + nombre + '</div>' +
            '<p class="px-3 text-muted" style="font-size:0.85rem;">' + ciudad + ' | ' + fecha + '</p>' +
            '<p class="px-3" style="font-size:0.85rem;">' + descripcion + '</p>' +
            '<hr class="separador">' +
            '<div class="post-acciones">' +
                '<button class="likes1-nuevo fa fa-thumbs-up">&nbsp;<span class="num-likes">0</span></button>' +
                '<button class="btn-ver-comentarios" data-bs-toggle="collapse" data-bs-target="#com-nuevo-' + Date.now() + '">' +
                    '<i class="fa fa-comment-o"></i> Comentarios' +
                '</button>' +
            '</div>' +
            '<div class="collapse" id="com-nuevo-' + Date.now() + '">' +
                '<div class="comentarios-seccion">' +
                    '<div class="lista-comentarios"></div>' +
                    '<div class="comentar-fila">' +
                        '<input type="text" class="campo-comentario" placeholder="Escribe un comentario...">' +
                        '<button class="btn-comentar">Comentar</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

    lista.appendChild(col);
     //likes del nuevo card
    col.querySelectorAll('.likes1-nuevo').forEach(btn => {
        const numSpan = btn.querySelector('.num-likes');
        let contador  = parseInt(numSpan.textContent.trim());
        let activo    = false;

        btn.addEventListener('click', () => {
            activo = !activo;
            activo ? contador++ : contador--;
            btn.classList.toggle('activo', activo);
            btn.classList.toggle('fa-thumbs-down', activo);
            btn.classList.toggle('fa-thumbs-up', !activo);
            numSpan.textContent = contador;
        });
    });

    //-comentarios del nuevo card
    col.querySelectorAll('.comentarios-seccion').forEach(seccion => {
        const input       = seccion.querySelector('.campo-comentario');
        const btnComentar = seccion.querySelector('.btn-comentar');
        const lista       = seccion.querySelector('.lista-comentarios');

        const agregar = () => {
            const texto = input.value.trim();
            if (!texto) return;

            const item    = document.createElement('div');
            item.classList.add('comentario');

            const avatar  = document.createElement('img');
            avatar.src = 'assets/per.jpg';
            avatar.alt = 'camilo';
            avatar.classList.add('comentario-avatar');
            

            const burbuja = document.createElement('div');
            burbuja.classList.add('comentario-burbuja');
            burbuja.textContent = texto;

            item.appendChild(avatar);
            item.appendChild(burbuja);
            lista.appendChild(item);
            input.value = '';
        };

        btnComentar.addEventListener('click', agregar);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') agregar(); });
    });
}
