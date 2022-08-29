console.log("in login.js");

console.log(localStorage === window.localStorage);


if (window.localStorage.getItem("email") != null) {
    url = "https://saarthi.last-codebender.tech/getTypeFromEmail";
    email = window.localStorage.getItem("email");
    var govType;
    fetch(url).then(response => response.json()).then(data => { govType = data.text() })
    if (govType == "projectHead") {
        window.location.replace("dashboard.html");
    }
    else {
        window.location.replace("../proj_head.html");
    }
}


console.log("in login.js");

function loginUser() {
    console.log("in loginUser Func");
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log(email + " " + password);
    if (email == null || password == null) {
        console.log("fields are null");
        document.getElementById("emptyFields").style.display = "block";
    }
    else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("pwd", password);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const url = "https://saarthi.last-codebender.tech/login/";

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                if (result != "false") {
                    if (result == "projectHead") {
                        window.location.replace("dashboard.html");
                    }
                    else {
                        window.location.replace("proj_head.html");
                    }
                }
                else {
                    document.getElementById("passwordWrongAlert").style.display = "block";
                }
            })
            .catch(error => console.log('error', error));
    }
}


// function loginUser() {
//     window.location.replace("projectCards.html");
// }