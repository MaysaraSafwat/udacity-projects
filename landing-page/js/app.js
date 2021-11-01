/* turn the node list of sections into an array */
const sections = Array.from(document.querySelectorAll("section"));

const navbarMenu = document.querySelector("#navbar__list");

/* function to loop over the sections and to create corresponding li tag*/
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


/*highlighting which section is being viewed*/
const highlight = (section)=>{
    const links = document.querySelectorAll("li");
    for (link of links){
        if(link.innerText == section.getAttribute("data-nav"))
        {
            link.classList.add("current-section")
        } else{
            link.classList.remove("current-section")
        }
    }
}


/*to add the active class if meets offset condition*/
function addClass (section){
    section.classList.add('your-active-class');
    highlight(section);
     
}
/* to remove active class*/
 function removeClass (section){
     section.classList.remove('your-active-class')
 }
/*to toggle the acttive class on scrolling */ 
 function toggleActiveClass (){
     sections.forEach(section => {
         const elemOffset =  Math.floor(section.getBoundingClientRect().top) 
         removeClass(section)
          if(elemOffset <150 && elemOffset >= -150) 
         {
             addClass(section)
         }
         
     })
 }


window.addEventListener("scroll",  toggleActiveClass);