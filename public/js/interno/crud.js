const urlOrigen = 'http://localhost:8080/'

/* -----eliminar ------------------*/
const borrarProducto = async (id) => {
  const url = urlOrigen + 'api/productos/borrar/';
  deleteDataParams(url, id)
    .then((response) => response.json())
    .then((data) => {
      // si es ok, devuelve un mensaje. sino un error
      if (data.error) {
        alert(data.error);
      }

      if (data.msg) {
        const div = document.getElementById(`fila-${id}`);
        div.remove();
        alert(`Producto ${id} eliminado`);
      }
    })
    .catch((error) => alert(error));
};

async function deleteDataParams(url, data) {
  const response = await fetch(url + data, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
  });
  return response;
}

/* ----------- agregar ------------------ */
const agregarProducto = (e) => {
  e.preventDefault();

  const inputs = document.getElementsByTagName('input');
  console.log(inputs)
  const producto = {
    nombre: inputs[1].value,
    descripcion: inputs[2].value,
    codigo: inputs[3].value,
    foto: inputs[4].value,
    precio: inputs[5].value,
    stock: inputs[6].value,
  };
  console.log(producto)
  console.log(JSON.stringify(producto))
}
//   postDataParams(urlOrigen + 'api/images/upload', JSON.stringify(producto))
//     .then((response) => response.json())
//     .then((data) => {
//       // si es ok, devuelve un mensaje. sino un error
//       if (data.error) {
//         alert(data.error);
//       }
//       if (data.msg) {
//         alert(data.msg);
//         console.log(producto);
//         filaAppend(producto, data.id);
//         // actualizar la tabla

//         const inputs = document.getElementsByTagName('input');
//         for (let i = 0; i < inputs.length; i++) {
//           inputs[i].value = '';
//         }
//       }
//     })
//     .catch((error) => alert(error));
// };

// async function postDataParams(url, data) {
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: data,
//   });

//   return response;
// }

// const btnAgregar = document.getElementById('btnAgregar');
// btnAgregar.addEventListener('click', agregarProducto);

const filaAppend = (producto, id) => {
  const tablas = document.getElementsByClassName('table');
  console.log(tablas);

  const tr = document.createElement('tr');
  tr.id = `fila-${id}`;

  let td = document.createElement('td');
  td.innerHTML = id;
  tr.appendChild(td);

  td = document.createElement('td');
  td.innerHTML = producto.nombre;
  tr.appendChild(td);

  td = document.createElement('td');
  td.innerHTML = producto.descripcion;
  tr.appendChild(td);

  td = document.createElement('td');
  td.innerHTML = producto.codigo;
  tr.appendChild(td);

  td = document.createElement('td');
  td.innerHTML = `<img src='${producto.foto}' width='50px'>`;
  tr.appendChild(td);

  td = document.createElement('td');
  td.innerHTML = producto.precio;
  tr.appendChild(td);

  td = document.createElement('td');
  td.innerHTML = producto.stock;
  tr.appendChild(td);

  td = document.createElement('td');
  td.innerHTML = `<button onclick='seleccionEditar(${id});' class='btn btn-warning'>Editar</button>`;
  tr.appendChild(td);

  td = document.createElement('td');
  td.innerHTML = `<button onclick='borrarProducto(${id});' class='btn btn-danger'>Borrar</button>`;
  tr.appendChild(td);

  tablas[0].appendChild(tr);
};

/* Editar */

const seleccionEditar = (id) => {
  const fila = document.getElementById(`fila-${id}`);
  const celdas = fila.querySelectorAll('td');

  const inputs = document.getElementsByTagName('input');
  console.log(celdas);

  for (let i = 0; i < inputs.length; i++) {
    if (i == 4) {
      const imgSrc = celdas[i].querySelectorAll('img');
      inputs[i].value = imgSrc[0].src;
    } else {
      inputs[i].value = celdas[i].textContent;
    }
  }

  const btnAgregar = document.getElementById('btnAgregar');
  btnAgregar.style.display = 'none';

  const btnEditar = document.getElementById('btnEditar');
  btnEditar.style.display = 'block';
};

const confirmarEditar = (e) => {
  e.preventDefault();
  // hace el put
  const inputs = document.getElementsByTagName('input');

  const data = {
    nombre: inputs[1].value,
    descripcion: inputs[2].value,
    codigo: inputs[3].value,
    foto: inputs[4].value,
    precio: inputs[5].value,
    stock: inputs[6].value,
  };

  putDataParams(urlOrigen + `api/productos/actualizar/${inputs[0].value}`, data)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.msg);

      const inputs = document.getElementsByTagName('input');

      const fila = document.getElementById(`fila-${inputs[0].value}`);
      const celdas = fila.querySelectorAll('td');

      celdas[0].innerHTML = inputs[0].value;
      celdas[1].innerHTML = data.prod.nombre;
      celdas[2].innerHTML = data.prod.descripcion;
      celdas[3].innerHTML = data.prod.codigo;
      celdas[4].innerHTML = `<img src='${data.prod.foto}' width='50px'>`;
      celdas[5].innerHTML = data.prod.precio;
      celdas[6].innerHTML = data.prod.stock;

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }

      const btnAgregar = document.getElementById('btnAgregar');
      btnAgregar.style.display = 'block';
      const btnEditar = document.getElementById('btnEditar');
      btnEditar.style.display = 'none';
    })
    .catch((error) => alert(error));
};

const btnEditar = document.getElementById('btnEditar');
btnEditar.addEventListener('click', confirmarEditar);

async function putDataParams(url, data) {
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}
