// Seleccionando elementos del DOM
let loadingSection = document.querySelector(".loading");
let homeSection = document.querySelector(".home");
let headerSection = document.querySelector("header");
let footer = document.querySelector("footer");
let splashImagenProducto = document.querySelector(".splash__imgProducto");
let splashTituloProducto = document.querySelector(".splash__tituloProducto");
let splashDescripcionProducto = document.querySelector(
  ".splash__descripcionProducto"
);
let splashPrecioProducto = document.querySelector(".splash__precioProducto");
let cardContenedor = document.querySelector(".categorias__cardContenedor");
let productosElectronica;

const miStorage = window.localStorage;
let listaProductosCarrito = miStorage.getItem("listaCarrito")
  ? [...miStorage.getItem("listaCarrito").split(",")]
  : [];
let contadorCarrito = listaProductosCarrito.length
  ? listaProductosCarrito.length
  : 0;
let cantidadItemsCarrito = (document.querySelector(
  ".carrito__contador"
).innerHTML = `${contadorCarrito ? contadorCarrito : " "}`);

console.info(listaProductosCarrito);

//Ejecución del fetch y funciones
fetch("https://fakestoreapi.com/products/category/electronics")
  .then((res) => res.json())
  .then((json) => {
    esconderLoading();
    productosElectronica = json;
    console.info(productosElectronica);
    cargarHomeSplash(json);
    cargarHomeCategorias(json);
  });

//Declaracion de funciones
//Esconde el preloader
function esconderLoading() {
  loadingSection.style.display = "none";
  homeSection.style.display = "block";
  headerSection.style.display = "flex";
  footer.style.display = "flex";
}

//Inserta html en el contenedor '.splash' del Section home
function cargarHomeSplash(productosJson) {
  let indiceRandom = Math.floor(Math.random() * (6 - 1) + 1);
  console.info("indice random: " + indiceRandom);
  let productoDestacado = productosJson[indiceRandom];
  let btnComprarDestacado = document.querySelector(".splash__btnProducto");
  //console.info(productoDestacado);
  splashImagenProducto.innerHTML = `<img class="splash__imgProducto" src="${productoDestacado.image}" alt="" >`;
  splashTituloProducto.innerHTML = productoDestacado.title;
  splashDescripcionProducto.innerHTML = productoDestacado.description;
  splashPrecioProducto.innerHTML = `$${productoDestacado.price}`;
  btnComprarDestacado.setAttribute("data-indice-producto", `${indiceRandom}`);
  btnComprarDestacado.addEventListener("click", agregarCarritoCompra);
}

//Inserta html en el contenedor '.categorias' del Section home
function cargarHomeCategorias(productosJson) {
  productosJson.forEach((producto, indice) => {
    //console.log(`${producto} indice: ${indice}`);
    cardContenedor.innerHTML += `
    <div class="col-md-4 col-lg-3">
      <div class="categorias__cardProducto">
        <div class="categorias__imgContenedor">
          <img src="${producto.image}" alt="">
          <div class="categorias__contenedorBtnDetalles">
            <button
            type="button" class="btn btn-info categorias__btnDetalles" data-bs-toggle="modal" data-bs-target="#modalDetallesProductos"
            id="btnDetallesProductos" onclick="cargarModalDetalles(event)" data-indice-producto="${indice}""
            >
              DETALLES
            </button>
          </div>
        </div>
        <h3 class="categorias__tituloProducto">${producto.title}</h3>
        <span><b>$${producto.price}</b></span>
        <button class="btn btn-primary productosContenedor__btnComprar"
        onclick="agregarCarritoCompra(event)" data-indice-producto="${indice}"
        >
          COMPRAR
        </button>
      </div>
    </div>
    `;
  });
}

//Función que escucha el listener del botón DETALLES.
function cargarModalDetalles(e) {
  let indiceProductoDetalles = e.target.getAttribute("data-indice-producto"); //Obtengo el índice del producto clickeado a través de su atributo data
  let modalBody = document.querySelector(".modalProducto__contenedorCard");
  //Cargo los datos del producto en el modal usando la variable productosElectronica que referencia al json del fetch.
  modalBody.innerHTML = `
  <img src="${productosElectronica[indiceProductoDetalles].image}" class="modalProducto__imgCard" alt="">
  <h3>${productosElectronica[indiceProductoDetalles].title}</h3>
  <p>${productosElectronica[indiceProductoDetalles].description}</p>
  <div class="modalProducto__contenedorPrecioBtn">
    <span>$${productosElectronica[indiceProductoDetalles].price}</span>
    <button class="btn btn-primary modalProducto__btnComprar" onclick="agregarCarritoCompra(event)" data-indice-producto=${indiceProductoDetalles}>
      COMPRAR
    </button>
  </div>
  `;
}

function agregarCarritoCompra(e) {
  let productoSeleccionado = e.target.getAttribute("data-indice-producto");
  let productoAgregado = productosElectronica[productoSeleccionado];
  console.info("Producto agregado al carrito: ");
  console.info(productoAgregado);
  productoRenderizado = `
  <li class="list-group-item carrito__producto" data-precio="${productoAgregado.price}">
    <img src="${productoAgregado.image}" class="carrito__imgProducto" alt="imagen del producto">
    <h3 class="carrito__tituloProducto">${productoAgregado.title}</h3>
    <span>$${productoAgregado.price}</span>
  </li>
  `;
  listaProductosCarrito.push(productoRenderizado);
  contadorCarrito++;
  document.querySelector(".carrito__contador").innerHTML = contadorCarrito;
  miStorage.setItem("listaCarrito", listaProductosCarrito);
  let listaProductos = miStorage.getItem("listaCarrito").split(",");
  console.info(listaProductos);
}
