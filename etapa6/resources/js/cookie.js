function setCookie(nume, val, timpExpirare){
    d=new Date();
    d.setTime(d.getTime()+timpExpirare);
    // pentru o saptamana 
    // d.setDate(d.getDate() + timpExpirare);
    path = '/';
    document.cookie=`${nume}=${val}; expires=${d.toUTCString()}; path=${path}`;
}

function getCookie(nume){
    vectorParametri=document.cookie.split(";")
    for(let param of vectorParametri){
        if (param.trim().startsWith(nume+"="))
            return param.split("=")[1]
    }
    return null;
}

function deleteCookie(nume){
    console.log(`${nume}; expires=${(new Date()).toUTCString()}`)
    document.cookie=`${nume}=0; expires=${(new Date()).toUTCString()}`;
}

function deleteAllCookies(){
    var cookies=document.cookie.split(";");
    for(let cookie of cookies){
        var cookieName = cookie.split("=")[1];
        document.cookie=`${cookieName}=0; expires=${(new Date()).toUTCString()}`;
    }
}

function setProductCookie(){
    if((window.location.href).includes("/product/")){
        var currProd = window.location.href;
        var prodId = currProd.split("product/")[1];
        var value = prodId+","+document.getElementsByClassName("prod-val-name")[0].innerHTML;
        var name = "last_product";
        setCookie(name, value, 60000);
    }
}

window.addEventListener("DOMContentLoaded", function(){
    console.log(document.cookie);
    if (!getCookie("acceptat_banner")){
        if(getCookie("last_product")){
            deleteCookie("last_product");
        }
        document.getElementById("banner").style.display="block";
    }
    else if(getCookie("acceptat_banner")){
        setProductCookie();
    }
    if(getCookie("last_product")){
        var a = document.getElementById("prev-prod");
        if(a){
            var value = getCookie("last_product").split(",");
            var prodId = value[0];
            var name = value[1];
            a.href = "/product/"+prodId;
            a.innerHTML = name;
        }
    }
    else if(!getCookie("last_product")){
        if(document.getElementById("p-prev-prod")){
            document.getElementById("p-prev-prod").style.display="none";
        }
    }
    this.document.getElementById("ok_cookies").onclick=function(){
        setCookie("acceptat_banner",true,60000);
        setProductCookie();
        document.getElementById("banner").style.display="none";
    }
})
