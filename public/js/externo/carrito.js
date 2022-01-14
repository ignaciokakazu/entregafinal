const urlOrigen = 'http://localhost:8080/' 
//const urlOrigen = 'http://entrega-final-kakazu.herokuapp.com/' 
// 'http://tercera-pre.herokuapp.com/api/carrito/agregar/';

const agregarCarrito = (id) => {
  const url = urlOrigen + 'api/carrito/agregar/';
  postDataParams(url, id);
  const contador = document.getElementById(`contador-${id}`);
  const stock = document.getElementById(`stock-${id}`);

  if (contador.value == parseInt(stock.textContent)) {
    alert('No hay más stock');
  } else {
    contador.value++;
    const cartCantidad = document.getElementById('cartCantidad');
    cartCantidad.textContent = parseInt(cartCantidad.textContent) + 1;
    fetchCarrito();
  }
};

const borrarCarrito = async (id_producto) => {
  const url = urlOrigen + 'api/carrito/borrar/';
  await deleteDataParams(url, id_producto);
  const contador = document.getElementById(`contador-${id_producto}`);

  if (contador.value == 0) {
    alert('No puede eliminar más');
  } else {
    contador.value--;
    const cartCantidad = document.getElementById('cartCantidad');
    cartCantidad.textContent = parseInt(cartCantidad.textContent) - 1;
  }
};

async function postDataParams(url, data) {
  const response = await fetch(url + data, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
  });
}

const fetchCarrito = () => {
  const url = urlOrigen + 'api/carrito/listar';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showCarrito(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const showCarrito = (objeto) => {
  const cartItems = document.getElementById('cartItems');
  let carrito = '';
  if (objeto.length) {
    objeto.forEach((producto) => {
      carrito += `
            <div style="border:'1px solid white'" id='carrito-${producto.id}'>
            <p>ID: ${producto.id}</p>
            <p>Timestamp: ${producto.timestamp}</p>
            <p>Id producto: ${producto.producto[0].id}</p>
            <button onclick="borrarPorId('${producto.id}');">Borrar</button>
            </div>`;
    });

    cartItems.innerHTML = carrito;
  } else {
    cartItems.innerHTML = '<p>No hay productos en el carrito</p>';
  }
};

async function deleteDataParams(url, data) {
  const response = await fetch(url + data, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
  });
}

function deleteAll() {
  fetch(urlOrigen + 'api/carrito/borrar/todo', {
    method: 'DELETE',
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((data) => alert(data.msg))
    .catch((error) => {
      console.log(error);
    });

  closeNav();

  const cartItems = document.getElementById('cartItems');
  const div = cartItems.querySelectorAll('div');

  for (let i = 0; i < div.length; i++) {
    div[i].remove();
  }
}

const borrarPorId = async (id) => {
  const url = urlOrigen + 'api/carrito/borrar/';
  await deleteDataParams(url, id);
  const carritoId = document.getElementById(`carrito-${id}`);
  carritoId.remove();
};
