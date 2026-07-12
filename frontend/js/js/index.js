// ===============================
// FarmDirect Home Page
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    console.log("FarmDirect Home Page Loaded Successfully");

});

// ===============================
// Smooth Scrolling
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// ===============================
// Button Hover Animation
// ===============================

const buttons = document.querySelectorAll(".btn, .btn-outline");

buttons.forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transform="scale(1.05)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="scale(1)";

    });

});

// ===============================
// Header Shadow on Scroll
// ===============================

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        header.style.boxShadow="0 8px 25px rgba(0,0,0,.15)";

    }

    else{

        header.style.boxShadow="0 5px 20px rgba(0,0,0,.08)";

    }

});