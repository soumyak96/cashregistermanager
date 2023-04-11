const billAmount = document.querySelector("#bill-amount");
const cashGiven = document.querySelector("#cash-given");
const checkButton = document.querySelector("#check-button");
const message = document.querySelector("#error-message");
const noOfNotes = document.querySelectorAll(".no-of-notes");
const loginButton = document.querySelector("#loginBtn");
const loginErrMessage = document.querySelector("#login-error-message");
const loginUserName = document.querySelector("#login-user-name");
const loginPassword = document.querySelector("#login-user-password");
const registerButton = document.querySelector("#registerBtn");
const registerErrMessage = document.querySelector("#register-error-message");
const registerUserName = document.querySelector("#register-user-name");
const registerPassword = document.querySelector("#register-user-password");

function onHomePageOpen() {
  var isLoggedIn = window.localStorage.getItem("isLoggedIn");
  if (isLoggedIn == null || isLoggedIn == 'false') {
      document.location = "login.html";
  }
}

function onLRPageOpen() {
  var isLoggedIn = window.localStorage.getItem("isLoggedIn");
  if (isLoggedIn != null && isLoggedIn == 'true') {
      document.location = "index.html";
  }
}

function doLogin() {
    $.ajax({
        url: "https://d6hv1f8eaf.execute-api.us-east-1.amazonaws.com/scp-project/auth",
        method: "POST",
        data: JSON.stringify({
            "operation": "authenticate",
            "payload": {
              "Key": {
                "username": loginUserName.value
              },
              "password": loginPassword.value
            }
          }),
        dataType: 'json',
        contentType: "application/json",
         success: function(result,status,jqXHR ){
          if (result.body) {
            window.localStorage.setItem("isLoggedIn",true);
            document.location = "index.html";
            check = false; 
          } else {
            alert("No account found! Please Register");
            document.location = "register.html";
          }
         },
         error(jqXHR, textStatus, errorThrown){
            alert("Something went Wrong. Please try again!");
         }
    });
}

function doRegister() {
    $.ajax({
        url: "https://d6hv1f8eaf.execute-api.us-east-1.amazonaws.com/scp-project/auth",
        method: "POST",
        data: JSON.stringify({
            "operation": "create_user",
            "payload": {
              "Item": {
                "username": registerUserName.value,
                "password": registerPassword.value
              }
            }
          }),
        dataType: 'json',
        contentType: "application/json",
         success: function(result,status,jqXHR ){
          if(result.body){
            alert("Welcome to Cash Register Manager");
            window.localStorage.setItem("isLoggedIn",true);
            document.location = "index.html"
          }else{
              alert("Something went Wrong. Please try again!");
          }
            
         },
         error(jqXHR, textStatus, errorThrown){
            alert("Something went Wrong. Please try again!");
         }
    });
}

function validateBillAndCashAmount() {
    hideMessage();
    $.ajax({
        url: "/api/v1/getNotes",
        method: "POST",
        data: JSON.stringify({
            "billAmount": billAmount.value,
            "cashGiven": cashGiven.value
        }),
        dataType: 'json',
        contentType: "application/json",
         success: function(result,status,jqXHR ){
            const responseNotes = result.notes;
            console.log(responseNotes);
            for (let i = 0; i < responseNotes.length; i++) {
                noOfNotes[i].innerText = responseNotes[i];
            }
         },
         error(jqXHR, textStatus, errorThrown){
            showMessage(JSON.parse(jqXHR.responseText).error);
         }
    }); 
};

function hideMessage() {
    message.style.display = "none";
}

function showMessage(msg) {
    message.style.display = "block";
    message.innerText = msg;
}

function onLogout() {
    window.localStorage.clear();
    document.location = "login.html"; 
}