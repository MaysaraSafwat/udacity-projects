/* turn the node list of sections into an array */
const sections = Array.from(document.querySelectorAll("section"));
const navbarMenu = document.querySelector("#navbar__list");

/* function to loop over the sections and to create coresponding li tags*/

function createNavItem(){
 for (i=0; i< sections.length; i++){
     const sectionName = sections[i].getAttribute("data-nav");
     const link = sections[i].getAttribute("id");
     const navItem = document.createElement("li");
     navItem.innerHTML=`<a class='menu__link' href='#${link}'> ${sectionName}</a>`;
     navbarMenu.appendChild(navItem);
 }
}
createNavItem();

/*to determine if section in viewport*/
function offset (section){
    return( Math.floor(section.getBoundingClientRect().top));
}
/*to add the active class if meets offset condition*/
function addClass (bool , section){
    if(bool){
        section.classList.add('your-active-class')
     }
}
/* to remove active class*/
 function removeClass (section){
     section.classList.remove('your-active-class')
 }
/*to toggle the acttive class on scrolling */ 
 function toggleActiveClass (){
     sections.forEach(section => {
         const elemOffset = offset(section);
         InviewPort = ()=> elemOffset <150 && elemOffset >= -150

         removeClass(section);
         addClass( InviewPort() , section);
     })
 }


window.addEventListener("scroll",  toggleActiveClass);