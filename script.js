
                            //login
                               
const btnLogin = document.getElementById("btn-login");

if (btnLogin) {
    btnLogin.addEventListener('click', () => {

        const usuario = document.getElementById('usuario').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();
        const validacion = document.getElementById('validacion');
        const error = document.getElementById('error');

        if(usuario === "" && contrasena === ""){
            validacion.textContent = "Debe llenar los campos ";
            validacion.style.display = 'block';
        }

        else if (usuario === "") {
            validacion.textContent = "El usuario es obligatorio ";
            validacion.style.display = 'block';
            error.style.display = 'none';
        }

        else if (contrasena === "") {
            validacion.textContent = "La contraseña es obligatoria ";
            validacion.style.display = 'block';
            error.style.display = 'none';
        }
        

        else if (usuario === "admin" && contrasena === "9876") {
            window.location.href = 'index.html';
        }

        else {
            error.style.display = 'block';
            validacion.style.display = 'none';
        }
          });
        }
            //cerrar

            const btncerrar = document.getElementById('cerrar');

                if(cerrar){
                    cerrar.addEventListener( 'click', () => {

                        window.location.href = 'login.html';

                    });

                }


                //likes index

           // busca todos los <i> con clase likes
const like = document.querySelectorAll('.likes')

like.forEach(Btnlike => {
    let spanCont = Btnlike.nextElementSibling; 
    let contar = parseInt(spanCont.textContent); 
    let liked = false

    Btnlike.addEventListener('click', () => {
        Btnlike.classList.toggle('fa-thumbs-down');
        Btnlike.classList.toggle('fa-thumbs-up');
        
        if(liked){
            contar++;
            liked = false;
        } else{
            contar--;
            liked = true
        }

        spanCont.textContent = contar;
         
    });
});

         

            






                          // Popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
popoverTriggerList.forEach(popover => {
    new bootstrap.Popover(popover);
});


                        // boton megusta publicaciones

         
const botones = document.querySelectorAll('.btn-like');

botones.forEach(boton => {

    const contadorSpan = boton.querySelector('.contador');

    let contar = 0;

    boton.addEventListener('click', () => {
    contar++;
    contadorSpan.textContent = contar;
    console.log("Total me gusta:", contar);
    });
});


                    //comentarios publicaciones


const botonesComentarios = document.querySelectorAll('.btn-comentario');

botonesComentarios.forEach(boton => {
  boton.addEventListener('click', () => {
    const card = boton.closest('.card-body');
    const input = card.querySelector('.input-comentario');
    const lista = card.querySelector('.lista-comentarios');
    const texto = input.value.trim();

    if (texto !== "") {
      // Contenedor del comentario
      const comentarioDiv = document.createElement('div');
      comentarioDiv.classList.add('alert', 'alert-secondary', 'mt-2', 'p-2');

      // Texto del comentario
      const comentarioTexto = document.createElement('span');
      comentarioTexto.textContent = texto;

      // Botón Me gusta
      const btnLike = document.createElement('button');
      btnLike.textContent = " Me gusta";
      btnLike.classList.add('btn', 'py-0', 'btn-outline-primary');
      let likes = 0;
      btnLike.addEventListener('click', () => {
        likes++;
        btnLike.textContent = ` Me gusta (${likes})`;
      });

      // Botón Editar
      const btnEditar = document.createElement('button');
      btnEditar.textContent = " Editar";
      btnEditar.classList.add('btn', 'py-0', 'btn-outline-secondary');
      btnEditar.addEventListener('click', () => {
        const inputEditar = document.createElement('input');
        inputEditar.value = comentarioTexto.textContent;
        inputEditar.classList.add('form-control', 'form-control-sm', 'mt-1');

        comentarioTexto.replaceWith(inputEditar);
        btnEditar.textContent = " Guardar";

        btnEditar.addEventListener('click', () => {
          comentarioTexto.textContent = inputEditar.value.trim();
          inputEditar.replaceWith(comentarioTexto);
          btnEditar.textContent = " Editar";
        }, { once: true });
      });

      // Botón Eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = " Eliminar";
      btnEliminar.classList.add('btn', 'py-0', 'btn-outline-danger');
      btnEliminar.addEventListener('click', () => {
        comentarioDiv.remove();
      });

      // Fila de botones debajo del texto
      const filaBotones = document.createElement('div');
      filaBotones.classList.add('d-flex', 'gap-1', 'mt-1');
      filaBotones.appendChild(btnLike);
      filaBotones.appendChild(btnEditar);
      filaBotones.appendChild(btnEliminar);

      // Armar el comentario
      comentarioDiv.appendChild(comentarioTexto);
      comentarioDiv.appendChild(filaBotones);

      lista.appendChild(comentarioDiv);
      input.value = "";
    }
  });
});


//fechas desplazamiento a los lados para (Publicaciones recientes)

const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const storiesScroll = document.getElementById('storiesScroll');

if (arrowLeft && arrowRight) {
    arrowRight.addEventListener('click', () => {
        storiesScroll.scrollBy({ left: 150, behavior: 'smooth' });
    });
    arrowLeft.addEventListener('click', () => {
        storiesScroll.scrollBy({ left: -150, behavior: 'smooth' });
    });
}



// Editar perfil
document.getElementById('btn-guardar-perfil').addEventListener('click', function() {
    let nombre = document.getElementById('input-nombre-perfil').value.trim();
    let ciudad = document.getElementById('input-ciudad-perfil').value.trim();
    let bio = document.getElementById('input-bio-perfil').value.trim();
    let foto = document.getElementById('input-foto-perfil').files[0];
    let msg = document.getElementById('msg-perfil');

    if (nombre === '' || ciudad === '' || bio === '') {
        msg.style.display = 'block';
        return;
    }

    msg.style.display = 'none';

    document.querySelector('section.text-center h2').textContent = nombre;
    document.querySelectorAll('section.text-center p')[0].textContent = ciudad;
    document.querySelectorAll('section.text-center p')[1].textContent = bio;

    if (foto) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.perfil-foto').src = e.target.result;
        };
        reader.readAsDataURL(foto);
    }

    let modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarPerfil'));
    modal.hide();
});


// subir foto para el evento
document.getElementById('btn-publicar-evento').addEventListener('click', function() {
    let nombre = document.getElementById('input-nombre-evento').value.trim();
    let ciudad = document.getElementById('input-ciudad-evento').value.trim();
    let fecha = document.getElementById('input-fecha-evento').value;
    let descripcion = document.getElementById('input-descripcion-evento').value.trim();
    let fotoInput = document.getElementById('input-foto-evento').files[0];
    let msg = document.getElementById('msg-evento');

    if (nombre === '' || ciudad === '' || fecha === '' || descripcion === '') {
        msg.style.display = 'block';
        return;
    }

    msg.style.display = 'none';

    let partesFecha = fecha.split('-');//método de los strings que divide un texto en partes y devuelve un array
    let fechaFormateada = partesFecha[2] + '/' + partesFecha[1] + '/' + partesFecha[0];

    if (fotoInput) {
        let reader = new FileReader(); //herramienta del navegador que permite leer archivos que el usuario sube desde su computador
        reader.onload = function(e) {  //es un evento que se dispara cuando algo termina de cargar. (cuando el FileReader termina de leer el archivo)
            agregarCard(e.target.result, nombre, ciudad, fechaFormateada, descripcion);
        };
        reader.readAsDataURL(fotoInput);
    } else {
        agregarCard('assets/perfil.jpg', nombre, ciudad, fechaFormateada, descripcion);
    }

    document.getElementById('input-nombre-evento').value = '';
    document.getElementById('input-ciudad-evento').value = '';
    document.getElementById('input-fecha-evento').value = '';
    document.getElementById('input-descripcion-evento').value = '';
    document.getElementById('input-foto-evento').value = '';

    let collapse = bootstrap.Collapse.getInstance(document.getElementById('formCrearEvento'));
    if (collapse) collapse.hide(); //hide() metodo de bootstrap para cerrar el modal de editar perfil (oculta un elemento)
});

function agregarCard(imgSrc, nombre, ciudad, fecha, descripcion) {
    let lista = document.getElementById('lista-eventos-perfil');
    let col = document.createElement('div');
    col.classList.add('col-md-6');

    col.innerHTML =
        '<div class="card">' +
            '<div class="row g-0">' +
                '<div class="col-md-4">' +
                    '<img src="' + imgSrc + '" class="img-fluid rounded-start" style="height:100%; object-fit:cover;" alt="' + nombre + '">' +
                '</div>' +
                '<div class="col-md-8">' +
                    '<div class="card-body">' +
                        '<h5 class="card-title">' + nombre + '</h5>' +
                        '<p class="card-text text-muted">' + ciudad + ' | ' + fecha + '</p>' +
                        '<p class="card-text">' + descripcion + '</p>' +
                        '<a href="publicaciones.html" class="btn btn-danger btn-sm">Ver más</a>' +
                        '<button class="btn-like ms-2 btn btn-sm float-end">' +
                            '<img src="assets/megusta.png" alt="Me gusta" width="23" height="23" class="me-1">' +
                            'Me gusta <span class="contador">0</span>' +
                        '</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

    lista.appendChild(col);
}


//.appendChild = agrega el elemento hijo "del 'div'" al final





   

    

   











        

