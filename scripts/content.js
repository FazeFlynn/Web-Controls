window.addEventListener("load", function () {

  console.log('Web Controls are running');

  let isFilterApplied = false
  const inputFields = document.querySelectorAll("input[type='text']");

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

  // is any inputs focused or not
  let isAnyInputFocused = false;
  function checkFocus() {
    isAnyInputFocused = Array.from(inputFields).some(input => input === document.activeElement);
  }

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
    if(event.key == 'x' && !isAnyInputFocused){
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
