const timer = document.querySelector('#time span');

setInterval(() => {
  timer.innerText = new Date().toLocaleString();
}, 1001);

const ibutton = document.getElementById('ibutton');
ibutton.addEventListener('click', function() {
  alert('Button is clicked!')
})