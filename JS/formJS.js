"use strict";
console.clear();

// Input fields
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let mobile = document.querySelector("#mobile");
let about = document.querySelector("#about");
let currentAddress = document.querySelector("#currentAddress");
let permanentAddressCheck = document.querySelector("#permanentAddressCheck");
let permanentAddress = document.querySelector("#permanentAddress");
let linkedLink = document.querySelector("#linkedLink");
let skillInfoDiv = document.querySelector("#skillInfoDiv");
let moreSkillButton = document.querySelector("#moreSkillButton");
let createCVButton = document.querySelector("#createCVButtonDiv button");
let ssc = document.querySelector("#ssc") ;
let hsc = document.querySelector("#hsc") ;
let bsc = document.querySelector("#bsc") ;

// Preview fields (Right Side)
let name2 = document.querySelector("#name2");
let email2 = document.querySelector("#email2");
let mobile2 = document.querySelector("#mobile2");
let about2 = document.querySelector("#about2");
let currentAddress2 = document.querySelector("#currentAddress2");
let permanentAddress2 = document.querySelector("#permanentAddress2");
let linkedLink2 = document.querySelector("#linkedLink2");
let skillInfoDiv2 = document.querySelector("#skillInfoDiv2");
let ssc2 = document.querySelector("#ssc2") ;
let hsc2 = document.querySelector("#hsc2") ;
let bsc2 = document.querySelector("#bsc2") ;

// --------------- Name, Email, Mobile, About Section ---------------
name.addEventListener("input", function () {
    name2.textContent = name.value || "---";
});

email.addEventListener("input", function () {
    email2.textContent = email.value || "---";
});

mobile.addEventListener("input", function () {
    mobile2.textContent = mobile.value || "---";
});

about.addEventListener("input", function () {
    about2.textContent = about.value || "---";
});

linkedLink.addEventListener("input", function () {
    linkedLink2.textContent = linkedLink.value || "null";
});

currentAddress.addEventListener("input", function () {
    permanentAddress2.textContent = currentAddress.value;
});

permanentAddressCheck.addEventListener("click", function (event) {
    if (event.target.checked) {
        permanentAddress.value = currentAddress.value;
        permanentAddress.readOnly = true;
    } else {
        permanentAddress.value = "";
        permanentAddress.readOnly = false;
    }
});

// --------------- Skill Section ---------------

function updateSkillDisplay() {
    let skills = document.querySelectorAll(".skill"); // Get all skill inputs
    skillInfoDiv2.innerHTML = "<h4># Skills :</h4>"; // Reset content

    let table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    let tbody = document.createElement("tbody");

    let row;
    skills.forEach((skill, index) => {
        if (index % 2 === 0) {
            row = document.createElement("tr"); // Create a new row every 2 skills
            tbody.appendChild(row);
        }

        if (skill.value.trim() !== "") {
            let td = document.createElement("td");
            td.textContent = skill.value;
            td.style.border = "1px solid black";
            td.style.padding = "5px";
            td.style.textAlign = "center";
            td.style.width = "50%";

            row.appendChild(td);
        }
    });

    table.appendChild(tbody);
    skillInfoDiv2.appendChild(table);
}

// Attach event listener to skill input fields
document.addEventListener("input", function (e) {
    if (e.target.classList.contains("skill")) {
        updateSkillDisplay();
    }
});

// New skill input field addition
let skillCount = 3; // Initial number of skills
moreSkillButton.addEventListener("click", function (e) {
    e.preventDefault();
    skillCount++;

    let div = document.createElement("div");
    div.classList.add("form-group");
    div.innerHTML = `<input type="text" placeholder="skill - ${skillCount}" name="skill" class="skill form-control">`;

    skillInfoDiv.appendChild(div);

    // Update event listener for new inputs
    let newSkillInput = div.querySelector(".skill");
    newSkillInput.addEventListener("input", updateSkillDisplay);
});

function updateHobbyDisplay() {
    let hobbies = document.querySelectorAll(".hobby");
    hobbyInfoDiv2.innerHTML = "<h4># Hobbies : </h4>"; 
    
    hobbies.forEach(hobby => {
        if (hobby.value.trim() !== "") {
            let p = document.createElement("p");
            p.textContent = hobby.value;
            hobbyInfoDiv2.appendChild(p);
        }
    });
}

document.addEventListener("input", function (e) {
    if (e.target.classList.contains("hobby")) {
        updateHobbyDisplay();
    }
});

ssc.addEventListener("input" , function(event){

    event.preventDefault() ;

    ssc2.textContent = ssc.value ;

})

hsc.addEventListener("input" , function(event){

    event.preventDefault() ;

    hsc2.textContent = hsc.value ;

})

bsc.addEventListener("input" , function(event){

    event.preventDefault() ;

    bsc2.textContent = bsc.value ;

})


//pass the value in server 

createCVButton.addEventListener("click", function (e) {

    e.preventDefault() ;

    let skill = document.querySelectorAll(".skill");

    let allTheSkills = []; 
    for (let item of skill) {
        if (item.value.trim() !== "") { 
            allTheSkills.push(item.value);
        }
    }

    let hobby = document.querySelectorAll(".hobby") ;

    let allTheHobbies = [] ;
    for (let item of hobby) {
        if (item.value.trim() !== "") { 
            allTheHobbies.push(item.value);
        }
    }

    let allInformation = {
        name: name.value,
        email: email.value,
        mobile: mobile.value,
        about: about.value,
        currentAddress: currentAddress.value,
        permanentAddress: permanentAddress.value,
        ssc : ssc.value ,
        hsc : hsc.value ,
        bsc : bsc.value ,
        skills: allTheSkills ,
        hobby : allTheHobbies
    };

    // console.log(allInformation); 

    fetch("http://localhost:3000/build" , {
        method : "POST" ,
        headers : {
            'Content-Type': 'application/json' 
        } ,
        body : JSON.stringify(allInformation) 
    })
    .then(function(r1){
        if(r1.ok)
        {
            return r1.json() ;
        }
        else
        {
            return new error("There is an error to send data"); 
            
        }
    })
    .then(function(r2){
        console.log("successfully send data on the server") ;
        // console.log(r2) ;

    })
    .catch(function(err){
        console.log(err) ;
    });

});




