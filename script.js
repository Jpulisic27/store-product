
var MenuItems = document.getElementById("MenuItems");

MenuItems.style.maxHeight = "0px";

function menutoggle(){
    if(MenuItems.style.maxHeight == "0px")
    {
        MenuItems.style.maxHeight = "200px";
    } else
    {
        MenuItems.style.maxHeight = "0px";
    }
}

/**************** js for product gallery ****************/

var productImg = document.getElementById("productImg");
var smallImg = document.getElementsByClassName("small-img");

smallImg[0].onclick = function ()
{
    productImg.src = smallImg[0].src;
}
smallImg[1].onclick = function ()
{
    productImg.src = smallImg[1].src;
}
smallImg[2].onclick = function ()
{
    productImg.src = smallImg[2].src;
}
smallImg[3].onclick = function ()
{
    productImg.src = smallImg[3].src;
}

/**************** js for toggle form ****************/
var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var Indicator = document.getElementById("Indicator");

function register(){
    RegForm.style.transform = "translateX(0px)";
    LoginForm.style.transform = "translateX(0px)";
    Indicator.style.transform = "translateX(100px)";
}

function login(){
    RegForm.style.transform = "translateX(300px)";
    LoginForm.style.transform = "translateX(300px)";
    Indicator.style.transform = "translateX(0px)";
}

/**************** js for register form ****************/
document.getElementById("RegForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
  
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred");
    });
  });
  

  /**************** js for login form ****************/
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
  
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
      } else {
        alert("Login failed");
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred");
    });
  });
  