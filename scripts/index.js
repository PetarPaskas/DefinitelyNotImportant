
/* <FORM> */
function getFormData(){
    return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        info: document.getElementById('info').value
    }
}

function getFormElements(){
    return {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        service: document.getElementById('service'),
        info: document.getElementById('info')
    }
}


function submitForm(e){
    e.preventDefault();

    const data = getFormData();
    console.log("Data",data);
    const errors = doValidation(data);

    if(Object.keys(errors).length > 0){
        hideErrors(data);
        displayErrors(errors);
        return;
    }
    else{
        hideErrors(data);
    }

    sendRequest(data);
}

function sendRequest(data){
    const uri = "";
    data.clientTime = new Date().toISOString();

    fetch(uri,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data)
    }).then(response=>{
        console.log(response.status, response);
    }).catch(err=>{
        alert("Server error");
    })
}

function hideErrors(data){
    for(prop in data){
        document.getElementById(`error-${prop}`).style.visibility = 'hidden';
    }
}

function displayErrors(errors){
    for(prop in errors){
        const errorPlaceholder = document.getElementById(`error-${prop}`)
        errorPlaceholder.style.visibility = 'visible';
        errorPlaceholder.innerText = errors[prop];
    }
}

function doValidation(data){
   const errors = {};

   if(!validateString(data.name))
   errors.name = 'Please input a valid name.';
    
   if(!validateString(data.service))
   errors.service = 'Please tell us which service you\'re interested in';

   if(!validateString(data.info))
   errors.info = 'Please tell us how we may be of service.';

   if(!validateEmail(data.email))
   errors.email = 'Please input a valid email.'

   return errors;
}

function validateString(input){
    if(input && input.length > 0)
    return true;
    return false;
}
function validateEmail(email) {
var re = /\S+@\S+\.\S+/;
return re.test(email);
}

/* <FORM/> */

function enableScroll(){
    const navigation = document.getElementById('navi-toggle');

    if(navigation.checked){
        document.querySelector(".overlaying-navigation__button").style.position = "fixed";
        document.querySelector(".menu__logo-img").style.position = "fixed";
    }
    else{
        document.querySelector(".overlaying-navigation__button").style.position = "absolute";
        document.querySelector(".menu__logo-img").style.position = "static";
    }
}

function cloneNodes(nodeIds){
    nodeIds.forEach(nodeId=>{
        let clientsSlide = document.getElementById(nodeId);
        let copy = clientsSlide.cloneNode(true);
        clientsSlide.parentNode.appendChild(copy);
    })
}

/*  TESTIMONIAL CARDS */

function enableTestimonials(e,testimonialsState){
    const button = e.target;
    const index = button.dataset.item;
    const prevCardIndex = testimonialsState.currentCardIndex;

    if(!index || parseInt(index) === testimonialsState.currentCardIndex)
    return;

    testimonialsState.nextCardSlot = parseInt(index);
    console.log(`Next:${testimonialsState.nextCardSlot} --- Current:${testimonialsState.currentCardIndex}`);
    
    if(testimonialsState.currentCardIndex > testimonialsState.nextCardSlot)
    nextCard(testimonialsState);
    else
    prevCard(testimonialsState);  

    deselectSelectButton(testimonialsState,testimonialsState.nextCardSlot)
}

function deselectSelectButton(testimonialsState,index){
    document.querySelectorAll('.button-slider__button').forEach((e,i)=>{
        e.classList.remove(testimonialsState.buttonSelectedClass);

        if(index === i)
        e.classList.add(testimonialsState.buttonSelectedClass)
    });
}

function showCard(testimonialsState,index) {
    testimonialsState.quotes.forEach((card, i) => {
    card.classList.remove('sliding');
    if (i === index) {
      card.classList.add('visible');
    } else {
      card.classList.remove('visible');
    }
  });
}

function nextCard(testimonialsState) {
  if (testimonialsState.isAnimating) return;
  testimonialsState.isAnimating = true;

  const nextIndex = (testimonialsState.currentCardIndex + 1) % testimonialsState.quotes.length;

  const currentCard = testimonialsState.quotes[testimonialsState.currentCardIndex];
  currentCard.classList.add('sliding');
  currentCard.style.transform = 'translateX(-110%)';

  setTimeout(() => {
    currentCard.style.transform = 'translateX(0)';
    testimonialsState.currentCardIndex = testimonialsState.nextCardSlot;
    showCard(testimonialsState,testimonialsState.currentCardIndex);
    testimonialsState.isAnimating = false;
  }, 600);
}

function prevCard(testimonialsState) {
  if (testimonialsState.isAnimating) return;
  testimonialsState.isAnimating = true;

  const currentCard = testimonialsState.quotes[testimonialsState.currentCardIndex];
  currentCard.classList.add('sliding');
  currentCard.style.transform = 'translateX(110%)';

  setTimeout(() => {
    currentCard.style.transform = 'translateX(0)';
    testimonialsState.currentCardIndex = testimonialsState.nextCardSlot;
    showCard(testimonialsState,testimonialsState.currentCardIndex);
    testimonialsState.isAnimating = false;
  }, 600);
}

/*  TESTIMONIAL CARDS */