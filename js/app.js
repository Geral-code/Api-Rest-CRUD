import { obtenerClientes, eliminarCliente } from './api.js';

(()=> {
  const listado = document.querySelector('#listado-clientes');
  // cuando se carga el documento html
  document.addEventListener('DOMContentLoaded', mostrarClientes);

  //el llamado a la funcion eliminar
  listado.addEventListener('click', confirmarEliminar)


  async function mostrarClientes() {
    const clientes = await obtenerClientes();
    console.log(clientes);
    // {}
    clientes.forEach(cliente => {
      const {nombre, email, telefono, empresa, id } = cliente;
      const row = document.createElement('tr'); // <tr></tr>

      row.innerHTML += `
        <td>
          <p>${nombre}</p>
        </td>

        <td>
          <p>${email}</p>
        </td>
        <td>
          <p>${telefono}</p>
        </td>
        <td>
          <p>${empresa}</p>
        </td>
        <td>
          <a href="editar-cliente.html?id=${id}">Editar</a>
          <a href="#" data-cliente="${id}" class="eliminar">Eliminar</a>
        </td>
      `;
      
    listado.appendChild(row);

    })
  };

  function confirmarEliminar(event) {
     
    if(event.target.classList.contains('eliminar')) {
      //Capturamos el id del cliente
      
      const clienteId = parseInt (event.target.dataset.cliente);
      Swal.fire ({
        title: '¿Deseas eliminar este registro?',
        text: "No podras recuperar la informacion de este usuario!",
        icon : 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor:'#d33' ,
        confirmButtonText: 'Si, Eliminar'

      }) .then(respuesta => {
        if(respuesta.isConfirmed) {
         eliminarCliente(clienteId);
        }

    });


    
  }

  }
}
)();