window.addEventListener("load",  function(){
    document.getElementById("inp-price").onchange=function(){
        console.log(this.value);
        document.getElementById("infoRange").innerHTML=` (${this.value})`;
    }
    
    document.getElementById("filter").onclick=function(){
        //verificare nume
        valid=true;
        var inpName=document.getElementById("inp-name").value.toLowerCase().trim();
        valid = valid && inpName.match(new RegExp("^[a-zA-Z]*$"));
        if (!valid){
            alert("'Nume': inputuri gresite!");
            return;
        }
        var inpAbout = document.getElementById("inp-about").value;
        var text = inpAbout.replace(/\s+/g, " ");
        var words = text.split(" ");
        
        const Months = {Ianuarie:0, Februarie:1, Martie:2, Aprilie:3,
        Mai:4, Iunie:5, Iulie:6, August:7, Septembrie:8, Octombrie:9, Noiembrie:10, Decembrie:11};
        var inpNew = null;
        if(document.getElementById("i_ch").checked){
            inpNew = document.getElementById("i_ch").value;
            var split_date1 = inpNew.split(" ");
            var date1 = new Date();
            var day = split_date1[0];
            date1.setDate(day);
            var month = split_date1[1];
            date1.setMonth(Months[month]);
            var year = split_date1[2];
            date1.setFullYear(year);
            date1.setHours(0,0,0,0);
        }

        var inpIngredients = document.querySelector('input[name="gr_rad"]:checked').value;
        var inpPrice = parseInt(document.getElementById("inp-price").value);

        var selectedCalories=[];
        for (let option of document.getElementById('sel-calories').options){
            if (option.selected){
                selectedCalories.push(option.value);
            }
        }

        var calories_less=[];
        var calories_grater=[];
        for(let i=0; i<selectedCalories.length; i++){
            if(selectedCalories[i] != 'toate'){
                var cal = selectedCalories[i].split('-');
                calories_less.push(parseFloat(cal[0]));
                calories_grater.push(parseFloat(cal[1]));
            }
        }

        var inpState = document.getElementById("inp-state").value;
        var inpCutlery = document.getElementById("sel-cutlery").value;

        var products=document.getElementsByClassName("product");
        var counter = 0;
        console.log(products)
        for (let product of products){
            var cond1=false, cond2=false, cond3=false, cond4=false, cond5=false, cond6=false, cond7=false, cond8=false;
            product.style.display="none";

            let name= product.getElementsByClassName("val-name")[0].innerHTML.toLowerCase().trim();
            if(name.startsWith(inpName)){
                cond1=true;
            }

            let about= product.getElementsByClassName("val-about")[0].innerHTML;
            for(let i=0; i<words.length; i++){
                if(about.toLowerCase().includes(words[i])){
                    cond2 = true;
                }
            }

            let new_ch= product.getElementsByClassName("val-date")[0].innerHTML;
            let split_date2 = new_ch.split(" ");
            var date2 = new Date();
            var day = split_date2[1];
            date2.setDate(day);
            var month = split_date2[2];
            date2.setMonth(Months[month]);
            var year = split_date2[3];
            date2.setFullYear(year);
            date2.setHours(0,0,0,0);
            
            if(inpNew==null || date2 > date1){
                cond3=true;
            }

            let ingredients= product.getElementsByClassName("val-category")[0].innerHTML;
            if(inpIngredients=="toate" || inpIngredients==ingredients){
                cond4=true;
            }

            let price= parseInt(product.getElementsByClassName("val-price")[0].innerHTML);
            if(price >= inpPrice){
                cond5=true;
            }

            let calories= parseFloat(product.getElementsByClassName("val-calories")[0].innerHTML);
            for(let i=0; i<selectedCalories.length; i++){
                if(selectedCalories[i]=='toate' || (calories >= calories_less[i] && calories < calories_grater[i])){
                    cond6=true;
                }
            }

            let state= product.getElementsByClassName("val-state")[0].innerHTML;
            if(inpState=="" || inpState==state){
                cond7=true;
            }

            let cutlery= product.getElementsByClassName("val-cutlery")[0].innerHTML;
            if(inpCutlery=="oricare" || cutlery.toLowerCase() == inpCutlery){
                cond8=true;
            }

            if(cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8){
                product.style.display="block";
                counter++;
            }
        }
        if(counter == 0){
            document.getElementById("no-products").style.display="block";
        }
    }

    document.getElementById("reset").onclick=function(){
        //resteare produse
        var products=document.getElementsByClassName("product");
        for (let product of products){
            product.style.display="block";
        }
        document.getElementById("no-products").style.display="none";
        //resetare filtre
        document.getElementById("inp-name").value="";
        document.getElementById("inp-about").value="";
        document.getElementById("i_ch").checked = false;
        document.getElementById("i_rad0").checked=true;
        document.getElementById("infoRange").innerHTML=` (6)`;
        document.getElementById("inp-price").value="6";
        for (let option of document.getElementById('sel-calories').options){
            if (option.selected){
                option.selected=false;
            }
        }
        document.getElementById("sel-all-calories").selected=true;
        document.getElementById("inp-state").value="";
        document.getElementById("sel-all-cutlery").selected=true;
    }

    function sorteaza(semn){
        var products=document.getElementsByClassName("product");
        var v_products=Array.from(products);
        
        v_products.sort(function(a,b){
            var name_a=a.getElementsByClassName("val-name")[0].innerHTML;
            var name_b=b.getElementsByClassName("val-name")[0].innerHTML;
            if(name_a==name_b){
                var price_a=parseFloat(a.getElementsByClassName("val-price")[0].innerHTML);
                var price_b=parseFloat(b.getElementsByClassName("val-price")[0].innerHTML);
                return semn*(price_a - price_b);
            }
            return semn*name_a.localeCompare(name_b);
        })
        for (let prod of v_products){
            prod.parentNode.appendChild(prod);
        }
        if(document.getElementById("no-products").style.display=="block"){
            alert("Nu se poate efectua sortarea conform filtrarii curente.");
        }
    }

    document.getElementById("sortAsc").onclick=function(){
        sorteaza(1);
    }
    document.getElementById("sortDesc").onclick=function(){
        sorteaza(-1);
    }

    document.getElementById("calcSum").onclick=function(){
        var products=document.getElementsByClassName("product");
        let sum=0;
        for(let prod of products){
            if (prod.style.display!="none")
                sum+=parseFloat(prod.getElementsByClassName("val-price")[0].innerHTML)
        }
        if (!document.getElementById("result")){
            result=document.createElement("div");
            result.id="result";
            result.innerHTML="Suma preturilor produselor afisate: "+sum+" ron";
            result.style.color="var(--black)";
            result.style.width="350px";
            result.style.textAlign="center";
            result.style.border="1px solid var(--black)";
            result.style.borderRadius="5px";
            result.style.position="fixed";
            result.style.backgroundColor="white";
            var ps=document.getElementById("sum");
            ps.parentNode.insertBefore(result,ps.nextSibling);
            result.onclick= function(){
                this.remove();
            }
            setTimeout(function (){
                document.getElementById("result").remove();
            }, 2000);
        }
    }
    //todo: de schimbat months si days in enum aici si in product.js
    var products=document.getElementsByClassName("product");
    var v_products=Array.from(products);
    var days=["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"];
    var months=["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
    for(i=0; i<v_products.length; i++){
        var date = new Date(document.getElementsByClassName("val-date")[i].innerHTML);
        var new_date = days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        document.getElementsByClassName("val-date")[i].innerHTML = new_date;
        if(document.getElementsByClassName("val-cutlery")[i].innerHTML == "true"){
            document.getElementsByClassName("val-cutlery")[i].innerHTML = "da";
        }
        else{
            document.getElementsByClassName("val-cutlery")[i].innerHTML = "nu";
        }
        if(document.getElementsByClassName("val-ingredients")[i].innerHTML == ""){
            document.getElementsByClassName("ingredients")[i].style.display = "none";
        }
    }
});