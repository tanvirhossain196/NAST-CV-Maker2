// initial code 
"use strict"
console.clear() ;

// main code 
let getStartedButton = document.getElementById("getStartedButton") ;

getStartedButton.addEventListener("click" , function(){
    window.location.href = `/get-started` ;
})


//------

const texts = ["Your first resume is 100% free, including all design features & unlimited downloads.Yes, really!"];
        let index = 0;
        let charIndex = 0;
        let currentText = "";
        let typingSpeed = 100; 

        function typeEffect() {
            if (charIndex < texts[index].length) {
                currentText += texts[index][charIndex];
                document.querySelector("#typing").textContent = currentText;
                charIndex++;
                setTimeout(typeEffect, typingSpeed);
            } else {
                setTimeout(eraseEffect, 1000); 
            }
        }

        function eraseEffect() {
            if (charIndex > 0) {
                currentText = currentText.slice(0, -1);
                document.querySelector(".typing").textContent = currentText;
                charIndex--;
                setTimeout(eraseEffect, 50);
            } else {
                index = (index + 1) % texts.length; 
                setTimeout(typeEffect, 500);
            }
        }

        typeEffect();