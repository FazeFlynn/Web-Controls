// alert("Hello you clicked on this Extension");

let invert = document.getElementById("check-inp");

let invertweb = ()=> {    
    if(invert.checked){
        console.log("checked");
        // send message to background.js or content.js that it is checked
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "invert", status: true });
        });
    } else {
        console.log("unchecked");
        // send message to background.js or content.js that it is unchecked
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "invert", status: false });
        });
    }
}

// document.addEventListener('keydown', (event)=> {
//     if(event.key == 'x'){
//         if(invert.checked == true){
//             invert.checked = false;
//         } else {
//             invert.checked = true;
//         }
//         invertweb();
//     }

// });


invert.addEventListener('click', invertweb);