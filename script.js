const CLOUD_NAME = "dinlnhblj";
const UPLOAD_PRESET = "nuestra galeria";

// LOGIN SIMPLE
function login() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  if (user === "vickyangel" && pass === "vickyangel") {
    document.querySelector(".login").classList.add("hidden");
    document.querySelector(".app").classList.remove("hidden");
  } else {
    alert("Datos incorrectos");
  }
}

// SUBIR IMAGEN
async function upload() {
  let file = document.getElementById("file").files[0];

  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  let res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData
  });

  let data = await res.json();

  mostrarImagen(data.secure_url);
  guardarLocal(data.secure_url);
}

// MOSTRAR
function mostrarImagen(url) {
  let img = document.createElement("img");
  img.src = url;
  document.getElementById("gallery").appendChild(img);
}

// GUARDAR EN LOCAL (para que no desaparezca)
function guardarLocal(url) {
  let imgs = JSON.parse(localStorage.getItem("imgs")) || [];
  imgs.push(url);
  localStorage.setItem("imgs", JSON.stringify(imgs));
}

// CARGAR AL INICIO
window.onload = () => {
  let imgs = JSON.parse(localStorage.getItem("imgs")) || [];
  imgs.forEach(url => mostrarImagen(url));
};

// CAMBIAR FONDO
function cambiarFondo() {
  let file = document.getElementById("bgFile").files[0];
  let reader = new FileReader();

  reader.onload = function(e) {
    document.body.style.background = `url(${e.target.result}) no-repeat center/cover`;
    localStorage.setItem("bg", e.target.result);
  }

  reader.readAsDataURL(file);
}

// CARGAR FONDO
window.onload = () => {
  let bg = localStorage.getItem("bg");
  if (bg) {
    document.body.style.background = `url(${bg}) no-repeat center/cover`;
  }

  let imgs = JSON.parse(localStorage.getItem("imgs")) || [];
  imgs.forEach(url => mostrarImagen(url));
};
