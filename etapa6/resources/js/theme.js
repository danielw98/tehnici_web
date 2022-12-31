window.addEventListener("DOMContentLoaded",  function(){
    currTheme=localStorage.getItem("theme");
    if(currTheme)
        document.body.classList.add(currTheme);
    document.getElementById("theme").onclick=function(){
        if (document.body.classList.contains("dark")){
            document.body.classList.remove("dark");
            localStorage.removeItem("theme");
        }
        else{
            document.body.classList.add("dark");
            localStorage.setItem("theme","dark");
            document.body.classList.add("dark");
        }
    }
});