// efekat treperenja naslova
// -----------------------------------------------
var currentUser;
setInterval(() => {
	let e = document.querySelector("header h1");
	e.classList.toggle("blink");
}, 1000);
// -----------------------------------------------
//Reload the page on logo
document.querySelector("header h1").addEventListener("click", () => {
	location.reload();
});
// -----------------------------------------------
