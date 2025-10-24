// login.js - demo simple (no JWT). Assumes backend /api/login returns user object.
document.getElementById('btn-login').onclick = async ()=>{
  const u = document.getElementById('u-username').value;
  const p = document.getElementById('u-password').value;
  const res = await apiPOST('/api/login', { username: u, password: p });
  if(res.ok){
    const user = await res.json();
    localStorage.setItem('pv_user', JSON.stringify(user));
    alert('Bienvenido ' + user.username);
    window.location.href = 'index.html';
  } else {
    alert('Credenciales inválidas');
  }
};
document.getElementById('btn-cancel').onclick = ()=> window.location.href='index.html';g