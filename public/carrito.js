let contenedorPrincipalCarrito = document.querySelector(
  ".carrito__contenedorPrincipal"
);
let contenedorListaProductos = document.querySelector(".carrito__lista");
let contenedorCarritoTotal = document.querySelector(".carrito__total");
let miStorage = window.localStorage;
let listaProductos = miStorage.getItem("listaCarrito")
  ? miStorage.getItem("listaCarrito").split(",")
  : [];
let totalPagar = 0;

if (listaProductos.length) {
  cargarProductosCarrito();
  totalCarrito();
  actualizarContadorCarrito();
} else {
  console.info("carrito vacio");
  carritoVacio();
}

function cargarProductosCarrito() {
  listaProductos.forEach((producto) => {
    contenedorListaProductos.innerHTML += `${producto}`;
    console.info(producto);
  });
  let btnComprar = (document.querySelector(
    ".carrito__btnComprar"
  ).style.display = "block");
  let btnVaciar = document.querySelector(".carrito__btnVaciar");
  btnVaciar.style.display = "block";
  btnVaciar.addEventListener("click", () => {
    miStorage.clear();
    location.reload();
  });
}

function totalCarrito() {
  itemsCarrito = document.querySelectorAll(".carrito__producto");
  console.info(itemsCarrito);
  itemsCarrito.forEach((item) => {
    precioItem = item.attributes[1].nodeValue;
    totalPagar += parseFloat(precioItem);
  });
  contenedorCarritoTotal.innerHTML = `
  <strong>TOTAL</strong>
  <span>$${totalPagar}</span>
  `;
}

function actualizarContadorCarrito() {
  let cantidadItems = listaProductos.length;
  console.info(cantidadItems);
  document.querySelector(".carrito__contador").innerHTML = `${
    cantidadItems ? cantidadItems : ""
  }`;
}

function carritoVacio() {
  document.querySelector(".carritoVacio").style.display = "flex";
}
