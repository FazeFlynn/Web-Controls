window.addEventListener("load", function () {

  console.log('Web Controls are running');

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
    // console.log("Invert mode OFF");
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
//     console.log('A textarea is focused.');
//   });

//   textarea.addEventListener('blur', () => {
//     isFocused = false;
//     console.log('A textarea lost focus.');
//   });
// });

  // is any inputs focused or not
  let isAnyInputFocused = false;
  let isTFocused = false;
  function checkFocus() {
    isAnyInputFocused = Array.from(inputFields).some(input => input === document.activeElement);
  }

  function checkTFocus() {
    isTFocused = Array.from(otherInputs).some(input => input === document.activeElement);
  }

  otherInputs.forEach(textarea => {
    textarea.addEventListener("focus", checkTFocus);
    textarea.addEventListener("blur", checkTFocus);
  });

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


  document.addEventListener('keydown', (event)=> {
    if(event.key == 'x' && !isAnyInputFocused && isTFocused){
      if(isFilterApplied == true){
        removeFilter();        
        isFilterApplied = false;
      } else {
        applyFilter();
        isFilterApplied = true;
      }
    }

});



















//   // Your code here
//     imgTag = document.getElementsByTagName("img")[0];
// //   leftControls = document.getElementsByClassName("ytp-right-controls")[0];



//     let invertToggle = document.createElement("div");
//     invertToggle.className = "invert-tog";
//     invertToggle.innerHTML ='<label id="main-invert"><p class="invert-p">Invert</p><label id="track"><input type="checkbox" id="check-inp"/><span id="slider"></span></label></label>';

//     imgTag.innerHTML += "Hello this is injected by me";

//   // let myicon = "images/myicon"; // Make sure this path is correct
//   let filterButton = document.createElement("img");
//   filterButton.src = "images/play-icon.png";
//   filterButton.title = "Filter";
//   filterButton.textContent = "myButton";
//   filterButton.className = "ytp-mybutton";
//   leftControls.appendChild(filterButton);
});
