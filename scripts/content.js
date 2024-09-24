window.addEventListener("load", function () {
  // window.onload = function() {


  console.log('Web Controls Initiated');

  document.querySelectorAll('video').forEach(video => {
    // Disable autoplay
    video.autoplay = false;
    // If the video is playing, pause it
    video.pause();
    // Remove autoplay attribute if it exists
    video.removeAttribute('autoplay');
  });
  

  let isFilterApplied = false
  const inputFields = document.querySelectorAll("input[type='text']");
  const otherInputs = document.querySelectorAll("textarea");

// apply filter func
  let applyFilter = () => {
    // console.log("Invert mode ON");
    document.body.style.filter = "invert(1)"; 
    document.querySelectorAll('img, video').forEach((element) => {
      element.style.filter = "invert(1)";  
    });
  }
// removing filter
  let removeFilter = () => {
    console.log("Invert mode OFF");
    document.body.style.filter = "invert(0)"; 
    document.querySelectorAll('img, video').forEach((element) => {
      element.style.filter = "invert(0)";  
    });
  }

  // textareas check
//   let isFocused = false;
//   function checkTextareaFocus() {
//     // let isFocused = false;
//     const textareas = document.querySelectorAll('textarea');

//   textareas.forEach((textarea) => {
//       if (document.activeElement === textarea) {
//           isFocused = true;
//       }
//   });

//   return isFocused;
// }

// const textareas = document.querySelectorAll('textarea');
// textareas.forEach((textarea) => {
//   textarea.addEventListener('focus', () => {
//     isFocused = true;
    // console.log('A textarea is focused.');
//   });

//   textarea.addEventListener('blur', () => {
//     isFocused = false;
    // console.log('A textarea lost focus.');
//   });
// });

  // is any inputs focused or not
  let isAnyInputFocused = false;
  // let isTFocused = false;
  function checkFocus() {
    isAnyInputFocused = Array.from(inputFields).some(input => input === document.activeElement);
  }

  // function checkTFocus() {
  //   isTFocused = Array.from(otherInputs).some(textarea => textarea === document.activeElement);
  // }

  // otherInputs.forEach(otherInput => {
  //   otherInput.addEventListener("focusin", checkTFocus);
  //   otherInput.addEventListener("focusout", checkTFocus);
  // });

  // if(otherInputs){
  //   isTFocused = true;
  // }

  inputFields.forEach(inputField => {
    inputField.addEventListener("focus", checkFocus);
    inputField.addEventListener("blur", checkFocus);
  });


  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "invert") {
        if (request.status) {
            applyFilter();
        } else {
            removeFilter();
        }
    }
  });


  document.addEventListener('keydown', (event) => {
    if((event.ctrlKey && event.shiftKey && event.key.toLowerCase() == 'x') && !isAnyInputFocused){
      // console.log('KeyPressed');
      if(isFilterApplied == true){        
        removeFilter();        
        isFilterApplied = false;
      } else {
        applyFilter();
        isFilterApplied = true;
      }
    }
});






// ============================Testing=============================

let classToAdd = "injected-class-of-web-extension"
let classToParent = "class-added-to-parent-div-by-web-controls";
let msgSpan = "null";
// let classCounter = 0;
// let currClass = "null";
let clearSTInd;

function showMsg(){
  if(clearSTInd){
    clearTimeout(clearSTInd);
  }
  msgSpan.style.opacity = '100%';
  clearSTInd = setTimeout(() => {
    msgSpan.style.opacity = '0%';      
  }, 1000);
}

console.log("came here 0");


document.addEventListener('mousedown', function(event) {
  const clickedElement = event.target;
  const tagName = clickedElement.tagName.toLowerCase();
  console.log("TagClicked " + tagName);
  console.log("came here 1");

const videos = document.querySelectorAll('video');

videos.forEach(video => {
  console.log("came here 2");

    video.addEventListener('play', () => {
  console.log("came here 3");

   
        video.classList.add(classToAdd);
      

        const currVidTag = document.getElementsByClassName(classToAdd)[0];
        // console.log(currVidTag.classList);
        const parentTag = currVidTag.parentElement;
        parentTag.classList.add(classToParent);
        parentTag.innerHTML+= '<div id="main-div" class="vid-overlay"><span id="msg-span" class="msg-span-inner">Initiating Web Controls🚀</span></div>';
        msgSpan = document.getElementById("msg-span"); 
        showMsg();    
        
       
        if(currVidTag){
          msgSpan.textContent = "Web Controls are Up, you go Soldier🚀";
          showMsg();
          // firstTimeOn = false;
        } else {
          msgSpan.textContent = "Oops!, something went wrong";
          showMsg();
        }
     


    });

    // video.addEventListener('pause', () => {
    //     // console.log('Video is paused:', video);
    //     // Custom logic when the video is paused
    // });
});


});

let isInvert = false;
let videoSpeedToChange;

function updateFilters() {
  if (isInvert){
    videoSpeedToChange.style.filter = `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%) invert(100%)`;
  } else {
    videoSpeedToChange.style.filter = `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%)`;
  }
}

function removeFilters() { 
  videoSpeedToChange.style.filter = `saturate(100%) contrast(100%) brightness(100%)`;
  
}


let currSpeed = 1;
let saturation = 100;
let contrast = 100;
let brightness = 100;
// let firstTimeOn = true;

document.addEventListener('keydown', (event) => {
  // msgSpan = document.getElementById("msg-span");
  videoSpeedToChange = document.getElementsByClassName(classToAdd)[0];
  if(videoSpeedToChange){
    

    if((event.key.toLowerCase() == 'a') && !isAnyInputFocused){
      // console.log('a pressed');
      if(currSpeed > .25){
        videoSpeedToChange.playbackRate = (currSpeed - .25);
        currSpeed-=.25
        // console.log('CurrSpeed : ' + currSpeed);
        msgSpan.textContent = "Speed : " + (currSpeed).toFixed(2) + "x";
  showMsg(); 

    }
  }
  if((event.key.toLowerCase() == 's') && !isAnyInputFocused){
    // console.log('s pressed');
    // let videoSpeedToChange = document.getElementsByClassName(classToAdd)[0];
    if(currSpeed < 5){
      videoSpeedToChange.playbackRate = (currSpeed + .25);
      currSpeed+=.25
      // console.log('CurrSpeed : ' + currSpeed);
      msgSpan.textContent = "Speed : " + (currSpeed).toFixed(2) + "x";
  showMsg(); 

    }
  }
  if((event.key.toLowerCase() == 'd') && !isAnyInputFocused){
    // console.log('d pressed');
    // let videoSpeedToChange = document.getElementsByClassName(classToAdd)[0];
    if(currSpeed < 5){
      videoSpeedToChange.playbackRate = 1;
      currSpeed = 1;
      // console.log('CurrSpeed : ' + currSpeed); 
      msgSpan.textContent = "Speed : " + (currSpeed).toFixed(2) + "x";
  showMsg();      
    }
  }

  // =====================Fitlers========================

  if (event.key == "q" && !isAnyInputFocused && (saturation > 0)) {
    saturation -= 10;
    updateFilters(); 

    // addPadding();
    msgSpan.textContent = 'Saturation : ' + (saturation/100).toFixed(2);
    showMsg();          
  }

  if (event.key == "w" && !isAnyInputFocused && (saturation < 200)) {
    // event.preventDefault();
    saturation = parseInt(saturation) + 10;
    updateFilters();  
    // addPadding();
    msgSpan.textContent = 'Saturation : ' + (saturation/100).toFixed(2);
    showMsg();          
  }

  if (event.key == "e" && !isAnyInputFocused && (contrast > 50)) {
    contrast -= 5;
    updateFilters(); 
    
    // addPadding();      
    msgSpan.textContent = 'Contrast : ' + (contrast/100).toFixed(2);
    showMsg(); 
  }


  if (event.key == "r" && !isAnyInputFocused && (contrast < 150)) {
    contrast = parseInt(contrast) + 5;
    updateFilters(); 
    // addPadding();      
    msgSpan.textContent = 'Contrast : ' + (contrast/100).toFixed(2);
    showMsg(); 
  }

  if (event.key == "[" && !isAnyInputFocused && (brightness > 40)) {
    brightness -= 5;
    // console.log("working here brihgt : " + brightness);
    updateFilters(); 
    // addPadding();      
    msgSpan.textContent = 'Brightness : ' + (brightness/100).toFixed(2);
    showMsg(); 
  }

  if (event.key == "]" && !isAnyInputFocused && (brightness < 150)) {
    // event.preventDefault();
    brightness = parseInt(brightness) + 5;
    updateFilters();  
    // addPadding();
    msgSpan.textContent = 'Brightness : ' + (brightness/100).toFixed(2);
    showMsg();          
  }

  if (event.key == "x" && !isAnyInputFocused) {
    // event.preventDefault();
    if (!isInvert) {
      isInvert = true;
     } else{
      isInvert = false;
     } 
    updateFilters();  
    // addPadding();
    msgSpan.textContent = 'Invert : ' + isInvert;
    showMsg();          
  }


  if (event.key == "v" && !isAnyInputFocused) {
    // event.preventDefault();
    removeFilters();  
    isInvert = false;
    saturation = 100;
    brightness = 100;
    contrast = 100;
    // addPadding();
    msgSpan.textContent = 'Filters Cleared';
    showMsg();          
  }
  }
});


// };
});
