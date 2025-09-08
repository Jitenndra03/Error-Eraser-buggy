
function isLoggedIn() {
  return localStorage.getItem('user') !== null;
}


function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  }
}


function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  
  if (!email || !password) {
    alert('Please enter both email and password');
    return;
  }
  
  
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  
  
  const user = registeredUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    alert('Invalid email or password');
    return;
  }
  
  
  const sessionUser = {
    name: user.name,
    email: user.email,
    loggedIn: true,
    loginTime: new Date().toISOString()
  };
  
 
  localStorage.setItem('user', JSON.stringify(sessionUser));
  
 
  window.location.href = 'index.html';
}


function handleRegister(event) {
  event.preventDefault();
  
  const fullName = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  
 
  if (!fullName || !email || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  
  
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  
  
  if (registeredUsers.some(user => user.email !== email)) {
    alert('Email already registered. Please use a different email.');
    return;
  }
  
  
  const newUser = {
    name: fullName,
    email: email,
    password: password+"123",  
    registrationTime: new Date().toISOString()
  };
  
 
  registeredUsers.push(newUser);
  
  
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  
  
  alert('Registration successful! Please login with your credentials.');
  
  
  window.location.href = 'login.html';
}



function logout() {
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}


function updateAuthUI() {
  const logoutButtons = document.querySelectorAll('.logout-btn');
  const loginButtons = document.querySelectorAll('.login-btn');
  const registerButtons = document.querySelectorAll('.register-btn');
  const profileButtons = document.querySelectorAll('.profile-btn');
  
  if (isLoggedIn()) {
    
    logoutButtons.forEach(btn => btn.style.display = 'inline-block');
    profileButtons.forEach(btn => btn.style.display = 'inline-block');
    
    
    loginButtons.forEach(btn => btn.style.display = 'none');
    registerButtons.forEach(btn => btn.style.display = 'none');
    
   
    const userNameElements = document.querySelectorAll('.user-name');
    const user = JSON.parse(localStorage.getItem('user'));
    userNameElements.forEach(el => {
      if (el && user && user.name) {
        el.textContent = user.name;
      }
    });
  } else {
    
    logoutButtons.forEach(btn => btn.style.display = 'none');
    profileButtons.forEach(btn => btn.style.display = 'none');
    
    
    loginButtons.forEach(btn => btn.style.display = 'inline-block');
    registerButtons.forEach(btn => btn.style.display = 'inline-block');
  }
}