window.addEventListener("load",  function(){
    var days=["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"];
    var months=["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
    var products_fav=document.getElementsByClassName("product-fav");
    var v_products_fav=Array.from(products_fav);
    for(i=0; i<v_products_fav.length; i++){
        var date = new Date(document.getElementsByClassName("val-date-fav")[i].innerHTML);
        var new_date = days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        document.getElementsByClassName("val-date-fav")[i].innerHTML = new_date;
        if(document.getElementsByClassName("val-cutlery-fav")[i].innerHTML == "true"){
            document.getElementsByClassName("val-cutlery-fav")[i].innerHTML = "da";
        }
        else{
            document.getElementsByClassName("val-cutlery-fav")[i].innerHTML = "nu";
        }
        if(document.getElementsByClassName("val-ingredients-fav")[i].innerHTML == ""){
            document.getElementsByClassName("ingredients-fav")[i].style.display = "none";
        }
    }
});