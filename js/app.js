const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
  const response = await fetch("data.json")
  const data = await response.json()

  data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="price">${product.precio} $</p>
    `;
  
    shopContent.append(content);
  
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";
  
    content.append(comprar);
  
    comprar.addEventListener("click", () => {
      const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
  
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        console.log(carrito);
        console.log(carrito.length);
        carritoCounter();
        saveLocal();
      }
    });
  });
}

getProducts()



//set item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//get item


// API CriptoYa

const criptoYa = "https://criptoya.com/api/dolar"
const divDolar = document.getElementById("divDolar")

setInterval(() => {
    fetch(criptoYa)
    .then (response => response.json())
    .then (({oficial, blue, solidario, ccb, ccl, mep, qatar})=>{
        divDolar.innerHTML= `
        <h2>Cotización del dólar en Argentina:</h2>
        <p>Dolar oficial: ${oficial}</p>
        <p>Dolar blue: ${blue}</p>
        <p>Dolar solidario: ${solidario}</p>
        <p>Dolar bitcoin: ${ccb}</p>
        <p>Dolar ccl: ${ccl}</p>
        <p>Dolar mep: ${mep}</p>
        <p>Dolar qatar: ${qatar}</p>`
    })
    .catch(error => console.error(error))
}, 3000);