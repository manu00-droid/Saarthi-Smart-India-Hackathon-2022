


window.addEventListener("load", () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  fetch("https://saarthi.last-codebender.tech/displayAll")
    .then(response => response.json())
    .then(result => {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        console.log(result[i]);

        var element = document.createElement("span");
        element.innerHTML = "PID: " + result[i]["p_id"];
        var element2 = document.createElement("span");
        element2.innerHTML = "PNAME: " + result[i]["p_name"]
        var element3 = document.createElement("a")

        element3.appendChild(element)
        element3.appendChild(element2)
        document.body.appendChild(element3)
        element3.setAttribute('href', "Dynamic-Animated-Timeline-Slider/examples/construction_engineer.html")
      }
    })
    .catch(error => console.log('error', error));
});
