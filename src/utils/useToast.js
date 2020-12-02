export const setToast = (html, success = false) => {
  const instance = document.getElementById('toast')
  instance.classList.add('show')
  success ? instance.style.backgroundColor = '#089008' : instance.style.backgroundColor = '#d83f3f' 
  instance.innerHTML = html
  setTimeout(function(){
    instance.classList.remove("show");
  },3000);
  
}