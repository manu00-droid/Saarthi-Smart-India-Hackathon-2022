console.log("in signup.js");
if (localStorage.getItem("email") != null) {
    console.log("inside localStorage");
    url = "https://saarthi.last-codebender.tech/getTypeFromEmail";
    email = window.localStorage.getItem("email");
    var govType;
    fetch(url).then(response => response.json()).then(data => { govType = data.text() })
    if (govType == "projectHead") {
        window.location.replace("dashboard.html");
    }
    else {
        window.location.replace("www/Dynamic-Animated-Timeline-Slider/examples/construction_engineer.html");
    }
}

function signup() {

    var firstname = document.getElementById("fname").value;
    var lastname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pwd1").value;
    var confirmPassword = document.getElementById("pwd2").value;
    window.proj_head = document.getElementById("proj_head").checked;
    var onsite = document.getElementById("on-site").checked;

    console.log(firstname + " " + lastname + " " + email);
    console.log(password);
    console.log(confirmPassword);
    console.log(window.proj_head);
    console.log(onsite);
    // var bool = password.localeCompare(confirmPassword);
    // console.log(bool);

    if (password == confirmPassword) {
        console.log("zzzzzz")
        var formdata = new FormData();
        formdata.append("fna", firstname);
        formdata.append("lna", lastname);
        formdata.append("email", email);
        formdata.append("pwd", password);
        if (proj_head) {
            formdata.append("typeGovOfficial", "projectHead");
        }
        else {
            formdata.append("typeGovOfficial", "onsite");
        }

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://saarthi.last-codebender.tech/signup/", requestOptions)
            .then((response) => { return response.json() })
            .then((result) => {
                console.log(result)
                var new_string = result[1];
                console.log(new_string);
                if (new_string) {
                    console.log(result)
                    console.log("helloooooooooooooooo");
                    console.log(window.proj_head);
                    if (window.proj_head) {
                        console.log("inside if");
                        window.localStorage.setItem("access_token", email);
                        window.location.replace("dashboard.html");
                    }
                    else {
                        window.localStorage.setItem("access_token", email);
                        window.location.replace("www/Dynamic-Animated-Timeline-Slider/examples/construction_engineer.html")
                    }
                }
            })
            .catch(error => console.log('error', error));
    }
    else {
        document.getElementById("passNotSame").style.display = "block";
    }

}

// document.getElementById("signup").addEventListener('click', signup);


// function signup() {
//     var proj_head = document.getElementById("proj_head").checked;
//     var onsite = document.getElementById("on-site").checked;
//     if (proj_head) {
//         window.location.replace("dashboard.html");
//     }
//     else {
//         window.location.replace("engg.html");
//     }
// }