const password = document.querySelector("#password");
const background = document.querySelector("#background");

password.addEventListener("input", (e) => {
  const input = e.target.value;
  console.log(input.length);
  background.style.filter = `blur(${20 - input.length}px)`;
});
