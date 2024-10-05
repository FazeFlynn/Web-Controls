window.addEventListener("load", function () {
  // window.onload = function() {


  console.log('Web Controls Initiated');

  // document.querySelectorAll('video').forEach(video => {
  //   // Disable autoplay
  //   video.autoplay = false;
  //   // If the video is playing, pause it
  //   video.pause();
  //   // Remove autoplay attribute if it exists
  //   video.removeAttribute('autoplay');
  // });
  

  let isFilterApplied = false
  const inputFields = document.querySelectorAll("input[type='text']");
  const otherInputs = document.querySelectorAll("textarea");

  const htmlTag = document.documentElement;

  // apply filter func
  let applyFilter = () => {

// Change the background color
// htmlTag.style.backgroundColor = 'lightblue';
    console.log("Invert mode ON");
    // htmlTag.style.filter = "invert(1)"; 
    
    document.body.style.filter = "invert(1)"; 
    document.querySelectorAll('img, video, svg, picture, canvas, object').forEach((element) => {
      // document.querySelectorAll('flt-glass-pane').forEach((element) => {
      element.style.filter = "invert(1)";  
      console.log("placeholder 1");
    });
  }
  // removing filter
  let removeFilter = () => {
    console.log("Invert mode OFF");
    document.body.style.filter = "invert(0)"; 

    document.querySelectorAll('img, video, svg, picture, canvas, object').forEach((element) => {
      element.style.filter = "invert(0)";  
      console.log("placeholder 2");

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
      event.stopImmediatePropagation();
      // event.preventDefault();

      // console.log('KeyPressed');
      if(isFilterApplied == true){        
        removeFilter();        
        isFilterApplied = false;
      } else {
        applyFilter();
        isFilterApplied = true;
      }
    }


    // if((event.ctrlKey && event.shiftKey && event.key.toLowerCase() == 'x') && !isAnyInputFocused){
    //   console.log('xxxxxxxxxxxxxxxxxxxxxxx pressed');
    //   if(isFilterApplied == true){        
    //     removeFilter();        
    //     isFilterApplied = false;
    //   } else {
    //     applyFilter();
    //     isFilterApplied = true;
    //   }
    // }

    if((event.ctrlKey && event.shiftKey && event.key.toLowerCase() == 'v') && !isAnyInputFocused){
      event.stopImmediatePropagation();
      // event.preventDefault();

      console.log('KeyPressed _ ctrl+shift+V');
      // let myEmbed = document.querySelector('embed');

      if(myEmbed){
      if(isEmbedLight == true){   
      console.log('KeyPressed _ ctrl+shift+V =added invert');

        // removeFilter(); 
    htmlTag.style.filter = "invert(1)"; 

        // myEmbed.style.filter = 'invert(100%)';
        isEmbedLight = false;
      } else {
        // applyFilter();
      console.log('KeyPressed _ ctrl+shift+V =removed invert');

        // myEmbed.style.filter = 'invert(100%)';
    htmlTag.style.filter = "invert(0)"; 

        isEmbedLight = true;
      }
      }
    }
  }, true);

  // ============================Testing=============================

  let classToAdd = "injected-class-of-web-extension"
  let classToParent = "class-added-to-parent-div-by-web-controls";
  let msgSpan = "null";
  let wCUIdValue = "uid-web-controls-ext-video-identifier-value";
  let wCUIdName = "data-uid-web-controls-ext-video-identifier-name";
  let Times = 1;
  
  // let classCounter = 0;
  // let currClass = "null";
  let clearSTInd;

  function showMsg(){
    console.log("showed msg one time");
    if(clearSTInd){
      clearTimeout(clearSTInd);
    }
    msgSpan.style.opacity = '100%';
    clearSTInd = setTimeout(() => {
      msgSpan.style.opacity = '0%';      
    }, 2000);
  }

  console.log("came here 0");

  // let injectingMsgBoxFirstTime = true;
  let videoSpeedToChange;
  let checkVideoClassToAdd;

  function checkForVideos(videoSpeedToChange) {
    // videoSpeedToChange.playbackRate = 0.25;

    console.log("set the speed to .25 + " + videoSpeedToChange);  
    checkVideoClassToAdd = document.getElementsByClassName(classToAdd)[0];
    if(checkVideoClassToAdd){
      checkVideoClassToAdd.classList.remove(classToAdd);
    }    
    videoSpeedToChange.classList.add(classToAdd);
    console.log("CLASSLIST OF VIDEOSPEEDTOCHANGE - " + videoSpeedToChange.classList);

        const currVidTag = document.getElementsByClassName(classToAdd)[0];
        console.log("Added class to video - " + currVidTag.classList);

        // console.log("Added class to video - " + videoSpe-edToChange.classList);
        // const parentTag = currVidTag.parentElement;
        // console.log("Parent tag - " + parentTag.classList);
        // const parentTag = videoSpeedToChange.parentElement;

        // let divForChecking = document.getElementById("msg-span-web-controls-ext");
        let divForChecking = document.getElementsByClassName("vid-overlay-web-controls-ext")[0];
        // if(!parentTag.classList.contains(classToParent)){
          if(!divForChecking){
          // parentTag.classList.add(classToParent);
          // parentTag.innerHTML+= '<div id="main-div-web-controls-ext" class="vid-overlay-web-controls-ext"><span id="msg-span-web-controls-ext" class="msg-span-inner-web-controls-ext">Initiating Web Controls🚀</span></div>';
          // msgSpan = document.getElementById("msg-span-web-controls-ext"); 
          // showMsg();   
          // console.log("ADDED PARENT ONLY TIME");

          let newDiv = document.createElement('div');
          newDiv.classList.add("vid-overlay-web-controls-ext");
          newDiv.innerHTML = '<span id="msg-span-web-controls-ext" class="msg-span-inner-web-controls-ext">Initiating Web Controls🚀</span>';
          currVidTag.insertAdjacentElement('afterend', newDiv);
          console.log('Injected newDiv');

          msgSpan = document.getElementById("msg-span-web-controls-ext"); 
          console.log("msgSpan = " + msgSpan);
          showMsg();  

          if(videoSpeedToChange){
            msgSpan.textContent = "Web Controls are Up 🚀";
            showMsg();
            // firstTimeOn = false;
          } else {
            msgSpan.textContent = "Oops!, something went wrong";
            showMsg();
          }
        }
 }

 function checkWCAttribute (videoSpeedToChange){
  if(!videoSpeedToChange.hasAttribute(wCUIdName)){ 

    const elementsWithDataUID = document.querySelectorAll(`[${wCUIdName}]`);
    if(elementsWithDataUID > 0){
      elementsWithDataUID.forEach(element => {
        element.removeAttribute(wCUIdName);
        console.log(`Removed data-uid from:`, element);
      }); 
    }

    checkForVideos(videoSpeedToChange); 
    videoSpeedToChange.setAttribute(wCUIdName,wCUIdValue);
  } 
 }


  document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const tagName = clickedElement.tagName.toLowerCase();
    if(tagName){
      console.log("TagClicked " + tagName);
    }
    console.log("came here 1");

    videoSpeedToChange = document.querySelector('video');
    if(videoSpeedToChange){
      console.log("Targeted tag - " + videoSpeedToChange.tagName);

    console.log("Iterating all videos");

    // if(!videoSpeedToChange.hasAttribute(wCUIdName)){    
      // console.log("attribute added");

    // videoSpeedToChange.setAttribute(wCUIdName,wCUIdValue);

    videoSpeedToChange.addEventListener('play', () => {
      console.log("Video is playing");
      console.log("Ran " + (Times+=1) + " Times");    
      checkWCAttribute(videoSpeedToChange);           
    });

    videoSpeedToChange.addEventListener('pause', () => {
      console.log('Video is paused');
      // Custom logic when the video is paused
      // checkForVideos(videoSpeedToChange);
      checkWCAttribute(videoSpeedToChange);
    });
  }


  // }

  });


  // ==============Original====================

  // const videos = document.querySelectorAll('video');
  // // const video = document.querySelector('video');

  // videos.forEach(video => {
  //   console.log("Iterating all videos");

  //     video.addEventListener('play', () => {
  //   console.log("found playing video");


  //         video.classList.add(classToAdd);
  //   // videoSpeedToChange = document.getElementsByClassName(classToAdd)[0];

  //         video.playbackRate = 0.25;
  //         console.log("set the speed to .25");


  //         const currVidTag = document.getElementsByClassName(classToAdd)[0];
  //         console.log("Added class to video - " + currVidTag.classList);
  //         const parentTag = currVidTag.parentElement;
  //         parentTag.classList.add(classToParent);
  //         parentTag.innerHTML+= '<div id="main-div" class="vid-overlay"><span id="msg-span" class="msg-span-inner">Initiating Web Controls🚀</span></div>';
  //         msgSpan = document.getElementById("msg-span"); 
  //         showMsg();    


  //         if(currVidTag){
  //           msgSpan.textContent = "Web Controls are Up, you go Soldier🚀";
  //           showMsg();
  //           // firstTimeOn = false;
  //         } else {
  //           msgSpan.textContent = "Oops!, something went wrong";
  //           showMsg();
  //         }



  //     });

  //     // video.addEventListener('pause', () => {
  //     //     // console.log('Video is paused:', video);
  //     //     // Custom logic when the video is paused
  //     // });
  // });

  // });


  let isInvert = false;
  // let videoSpeedToChange;

  function updateFilters() {
    if (isInvert){
      // videoSpeedToChange.style.filter = `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%) invert(100%)`;
      videoSpeedToChange.style.filter = 'saturate(100%) contrast(115%) brightness(115%) invert(100%)';
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
  let isEmbedLight = true;
  // let firstTimeOn = true;

  let satArr = [150,100];
  let conArr = [110,115];
  let brightArr = [100,50];
  let filterMsg = ["For Movies", "For Late Night Studies"]
  let filterCounter = 0;

  let currVol;

  console.log("Above event listener of keys");

  document.addEventListener('keydown', (event) => {
    console.log("Some key pressed");
    // msgSpan = document.getElementById("msg-span");
    // videoSpeedToChange = document.getElementsByClassName(classToAdd)[0];
    if(videoSpeedToChange){


      if((event.key.toLowerCase() == 'a') && !isAnyInputFocused){
        event.stopImmediatePropagation();
      // event.preventDefault();

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
      event.stopImmediatePropagation();
      // event.preventDefault();

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
      event.stopImmediatePropagation();
      // event.preventDefault();

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

    if((event.key.toLowerCase() == '/') && !isAnyInputFocused){
      event.stopImmediatePropagation();
      // event.preventDefault();

      currVol = videoSpeedToChange.volume;      
      if(currVol > 0.1){
        currVol -= 0.1;
        videoSpeedToChange.volume = currVol;
               
      }
      msgSpan.textContent = "Volume : " + (currVol*100).toFixed(0) + "%";
      showMsg();
    }

    if((event.key.toLowerCase() == '*') && !isAnyInputFocused){   
      event.stopImmediatePropagation();
      // event.preventDefault();

      videoSpeedToChange.volume;
      if(currVol < 0.9){
        currVol += 0.1;
        videoSpeedToChange.volume = currVol;              
      }
      msgSpan.textContent = "Volume : " + (currVol*100).toFixed(0) + "%";
      showMsg();
    }

    // =====================Fitlers========================

    if (event.key.toLowerCase() == "q" && !isAnyInputFocused && (saturation > 0)) {
      event.stopImmediatePropagation();
      // event.preventDefault();

      saturation -= 10;
      updateFilters(); 

      // addPadding();
      msgSpan.textContent = 'Saturation : ' + (saturation/100).toFixed(2);
      showMsg();          
    }

    if (event.key.toLowerCase() == "w" && !isAnyInputFocused && (saturation < 200)) {
      // event.preventDefault();
      event.stopImmediatePropagation();
      // event.preventDefault();

      saturation = parseInt(saturation) + 10;
      updateFilters();  
      // addPadding();
      msgSpan.textContent = 'Saturation : ' + (saturation/100).toFixed(2);
      showMsg();          
    }

    if (event.key.toLowerCase() == "e" && !isAnyInputFocused && (contrast > 50)) {
      event.stopImmediatePropagation();
      // event.preventDefault();

      contrast -= 5;
      updateFilters(); 

      // addPadding();      
      msgSpan.textContent = 'Contrast : ' + (contrast/100).toFixed(2);
      showMsg(); 
    }


    if (event.key.toLowerCase() == "r" && !isAnyInputFocused && (contrast < 150)) {
      event.stopImmediatePropagation();
      // event.preventDefault();

      contrast = parseInt(contrast) + 5;
      updateFilters(); 
      // addPadding();      
      msgSpan.textContent = 'Contrast : ' + (contrast/100).toFixed(2);
      showMsg(); 
    }

    if (event.key == "[" && !isAnyInputFocused && (brightness > 40)) {
      event.stopImmediatePropagation();
      // event.preventDefault();

      brightness -= 5;
      // console.log("working here brihgt : " + brightness);
      updateFilters(); 
      // addPadding();      
      msgSpan.textContent = 'Brightness : ' + (brightness/100).toFixed(2);
      showMsg(); 
    }

    if (event.key == "]" && !isAnyInputFocused && (brightness < 150)) {
      event.stopImmediatePropagation();
      // event.preventDefault();

      // event.preventDefault();
      brightness = parseInt(brightness) + 5;
      updateFilters();  
      // addPadding();
      msgSpan.textContent = 'Brightness : ' + (brightness/100).toFixed(2);
      showMsg();          
    }

    if (event.key.toLowerCase() == "x" && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      // event.preventDefault();

      // event.preventDefault();
      if (!isInvert) {
        isInvert = true;
       } else{
        isInvert = false;
       } 
      updateFilters();  
      // addPadding();
      filterCounter = 1;
      msgSpan.textContent = 'Invert : ' + isInvert;
      showMsg();          
    }

    if (event.key.toLowerCase() == "z" && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      // event.preventDefault();

      // contrast = parseInt(contrast) + 5;
      // updateFilters(); 
      // addPadding();  
      console.log("Z was Pressed");
      if(filterCounter > 1) {
        filterCounter = 0;
        console.log('came inside if if z')
      }

      saturation = satArr[filterCounter];
      contrast = conArr[filterCounter];
      brightness = brightArr[filterCounter];  
      // videoSpeedToChange.style.filter = 'saturate(100%) contrast(115%) brightness(50%)';  
      videoSpeedToChange.style.filter = `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%)`;
      isInvert = false;

      // msgSpan.textContent = 'Filter Preset 1 Added : ' + (contrast/100).toFixed(2);
      msgSpan.textContent = 'Filter Preset ' + (filterCounter+1) + ': ' + filterMsg[filterCounter];
      filterCounter+=1;
      showMsg(); 
      
      // }
    }


    if (event.key.toLowerCase() == "v" && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      // event.preventDefault();

      // event.preventDefault();
      removeFilters();  
      isInvert = false;
      saturation = 100;
      brightness = 100;
      contrast = 100;
      filterCounter = 0;
      // addPadding();
      msgSpan.textContent = 'Filters Cleared';
      showMsg();          
    }

    


    }
  }, true);
  // };
});
