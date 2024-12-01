var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");

var allWeb = []
function nameValidation(){
    var regex = /^[a-zA-Z0-9]{3,}/;
    if(regex.test(nameInput.value)){
        document.getElementById("nameValid").classList.replace("d-block" , "d-none")     
        return true;
    }
        document.getElementById("nameValid").classList.replace("d-none" , "d-block")     
        return false;
    
}

function urlValidation(){
    var regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/
    if(regex.test(urlInput.value)){
        document.getElementById("urlValid").classList.replace("d-block" , "d-none")  
        return true;
    }
        document.getElementById("urlValid").classList.replace("d-none" , "d-block")     
        return false;
}
function getInfo() {
if (nameValidation() && urlValidation()) {
    var web = {
        name: nameInput.value,
        url: urlInput.value
    }
    if(!web.url.toLowerCase().includes("https://") || !web.url.toLowerCase().includes("http://"))  {
            web.url = "https://" + web.url;
    } 
    allWeb.push(web);
    localStorage.setItem("websites", JSON.stringify(allWeb));
    display();
    clr();
    
}
}

if (localStorage.getItem("websites") != null) {
    allWeb = JSON.parse(localStorage.getItem("websites"));
    display();
}

function display() {
    var contain = "";
    for (var i = 0; i < allWeb.length; i++) {
        contain += `   
            <tr class="text-center">
                <td>${i + 1}</td>
                <td>${allWeb[i].name}</td>
            <td><a target="_blank"  class="btn btn-success bg-success px-4" href="${allWeb[i].url}" ><span><i class="fa-solid fa-eye"></i></span>  Visit</a></td>

                <td><button onclick = "deleteItem(${i})" class="btn btn-danger text-white"><span><i class="fa-solid fa-trash-can"></i></span> Delete</button></td>
            </tr>`
    }
    document.getElementById("display").innerHTML = contain
}

function clr() {
    nameInput.value = "";
    urlInput.value = "";
}

function deleteItem(index) {

    allWeb.splice(index, 1);
    localStorage.setItem("websites", JSON.stringify(allWeb));
    display();
}
