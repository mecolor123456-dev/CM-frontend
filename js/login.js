async function login() {
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  try {
    const user = await loginUsuario(usuario, contrasena);
    if(user.error) {
      alert(user.error);
    } else {
      localStorage.setItem("usuario", JSON.stringify(user));
      alert(`Bienvenido, ${user.nombre}`);
      window.location.href = "index.html";
    }
  } catch(err) {
    alert("Error de conexión con el servidor");
  }
}

document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  login();
});
