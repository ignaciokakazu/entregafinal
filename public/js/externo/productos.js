window.onload = async function () {
  showLoader('productos');
  await fetchProducts();
  hideLoader('productos');
  fetchCarrito();
};

// const urlOrigen = 'http://localhost:8080/';

function showProducts(productosObj) {
  const productos = document.getElementById('productos');

  let html = '';

  for (let i = 0; i < productosObj.length; i++) {
    html
		+= `<div class="col-md-3 col-xl-4 col-sm-12 mt-3">
            <article class="card text-center">
            <img class="w-100"
                src="${productosObj[i].fotos[0]}"
                class="card-img-top" style="height:200px" alt="...">
            <div class="card-body">
                <h5 class="card-title">${productosObj[i].nombre}</h5>
                <h6>$${productosObj[i].precio}</h6>
                <p class="card-text">${productosObj[i].descripcion}.</p>
                <p class="card-text">
					Stock <span id='stock-${productosObj[i].id}'>${productosObj[i].stock}</span>
				</p>
                <div class="row">
                	<div class="col-3">
	                <!--- 	<button class="btn btn-primary" 
	                 	onclick="borrarCarrito(${productosObj[i].id})">
	                 	-
	                 	</button> -->
	                 </div>
	                <div class="col-6">
	                	<input id="contador-${productosObj[i].id}" 
	                	class="form-control" value=0>
	                </div>
	                <div class="col-3">
	                	<button class="btn btn-primary" 
	                	onclick="agregarCarrito(${productosObj[i].id})">
	                	+
	                	</button>
	                </div>
	            </div>
            </div>
            </article>
        </div>`;
  }

  productos.innerHTML = html;
}

function fetchProducts(page = '') {
  const url = urlOrigen + 'api/productos/';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
		  alert(data.error);
      } else {
        showProducts(data);
      }
    })
    .catch((error) => {
    	console.log(error);
    });
}
