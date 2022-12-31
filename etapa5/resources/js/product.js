function produs_load_handler()
{
    var cutlery = document.getElementsByClassName("prod-val-cutlery")[0];
    var my_date = document.getElementsByClassName("prod-val-date")[0];

    var days=["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"];
    var months=["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];

    var date = new Date(my_date.innerHTML);
    var new_date = days[date.getDay() - 1] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    my_date.innerHTML = new_date;
    if(cutlery.innerHTML == "true"){
        cutlery.innerHTML = "da";
    }
    else{
        cutlery.innerHTML = "nu";
    }
    if(document.getElementsByClassName("prod-val-ingredients")[0].innerHTML == ""){
        document.getElementsByClassName("prod-ingredients")[0].style.display = "none";
    }
}
window.onload = produs_load_handler;