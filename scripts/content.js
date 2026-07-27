window.addEventListener("load", function () {

  console.log('Web Controls Initiated');

  let isFilterApplied = false;
  const inputFields = document.querySelectorAll("input[type='text']");
  const otherInputs = document.querySelectorAll("textarea");

  const htmlTag = document.documentElement;

  // ==================== Page Invert ====================

  let applyFilter = () => {
    console.log("Invert mode ON");
    htmlTag.style.filter = "invert(1)";
  };

  let removeFilter = () => {
    htmlTag.style.filter = "invert(0)";
    console.log("Invert mode OFF");
  };

  // ==================== Focus tracking (inputs + textareas) ====================

  let isAnyInputFocused = false;

  function checkFocus() {
    isAnyInputFocused =
      Array.from(inputFields).some(input => input === document.activeElement) ||
      Array.from(otherInputs).some(textarea => textarea === document.activeElement);
  }

  inputFields.forEach(inputField => {
    inputField.addEventListener("focus", checkFocus);
    inputField.addEventListener("blur", checkFocus);
  });

  otherInputs.forEach(otherInput => {
    otherInput.addEventListener("focus", checkFocus);
    otherInput.addEventListener("blur", checkFocus);
  });

  // ==================== Extension messages ====================

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "invert") {
      if (request.status) {
        console.log("MSG CAME HERE");
        applyFilter();
      } else {
        removeFilter();
      }
    }
  });

  // ==================== Global hotkeys (invert / embed) ====================

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'x') && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      event.preventDefault();

      if (isFilterApplied) {
        removeFilter();
        isFilterApplied = false;
      } else {
        applyFilter();
        isFilterApplied = true;
      }
    }

    if ((event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'v') && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      event.preventDefault();

      console.log('KeyPressed _ ctrl+shift+V');
      const myEmbed = document.querySelector('embed');

      if (myEmbed) {
        if (isEmbedLight) {
          console.log('KeyPressed _ ctrl+shift+V = added invert');
          htmlTag.style.filter = "invert(1)";
          isEmbedLight = false;
        } else {
          console.log('KeyPressed _ ctrl+shift+V = removed invert');
          htmlTag.style.filter = "invert(0)";
          isEmbedLight = true;
        }
      }
    }
  }, true);

  // ==================== Video overlay / message box ====================

  let classToAdd = "injected-class-of-web-extension";
  let classToParent = "class-added-to-parent-div-by-web-controls";
  let msgSpan = null;
  let wCUIdValue = "uid-web-controls-ext-video-identifier-value";
  let wCUIdName = "data-uid-web-controls-ext-video-identifier-name";
  let Times = 1;
  let clearSTInd;

  function showMsg() {
    if (!msgSpan) return; // guard: don't touch a non-existent element
    console.log("showed msg one time");
    if (clearSTInd) {
      clearTimeout(clearSTInd);
    }
    msgSpan.style.opacity = '100%';
    clearSTInd = setTimeout(() => {
      msgSpan.style.opacity = '0%';
    }, 2000);
  }

  console.log("came here 0");

  let videoSpeedToChange;
  let checkVideoClassToAdd;

  function checkForVideos(video) {
    console.log("set the speed to .25 + " + video);
    checkVideoClassToAdd = document.getElementsByClassName(classToAdd)[0];
    if (checkVideoClassToAdd) {
      checkVideoClassToAdd.classList.remove(classToAdd);
    }
    video.classList.add(classToAdd);
    console.log("CLASSLIST OF VIDEO - " + video.classList);

    const currVidTag = document.getElementsByClassName(classToAdd)[0];
    console.log("Added class to video - " + currVidTag.classList);

    let divForChecking = document.getElementsByClassName("vid-overlay-web-controls-ext")[0];

    if (!divForChecking) {
      let newDiv = document.createElement('div');
      newDiv.classList.add("vid-overlay-web-controls-ext");
      newDiv.innerHTML = '<span id="msg-span-web-controls-ext" class="msg-span-inner-web-controls-ext">Initiating Web Controls🚀</span>';
      currVidTag.insertAdjacentElement('afterend', newDiv);
      console.log('Injected newDiv');

      msgSpan = document.getElementById("msg-span-web-controls-ext");
      console.log("msgSpan = " + msgSpan);
      showMsg();

      if (video) {
        msgSpan.textContent = "Web Controls are Up 🚀";
        showMsg();
      } else {
        msgSpan.textContent = "Oops!, something went wrong";
        showMsg();
      }
    }
  }

  function checkWCAttribute(video) {
    if (!video.hasAttribute(wCUIdName)) {

      const elementsWithDataUID = document.querySelectorAll(`[${wCUIdName}]`);
      if (elementsWithDataUID.length > 0) {
        elementsWithDataUID.forEach(element => {
          element.removeAttribute(wCUIdName);
          console.log(`Removed data-uid from:`, element);
        });
      }

      checkForVideos(video);
      video.setAttribute(wCUIdName, wCUIdValue);
    }
  }

  // ==================== Zoom persistence (fixes the reset bug) ====================

  let zoomObserver = null;

  function enforceZoom() {
    if (!videoSpeedToChange) return;
    const expected = `scale(${zoom})`;
    if (videoSpeedToChange.style.transform !== expected) {
      videoSpeedToChange.style.transform = expected;
    }
  }

  function watchVideoForResets(video) {
    if (zoomObserver) {
      zoomObserver.disconnect();
    }
    zoomObserver = new MutationObserver(() => enforceZoom());
    zoomObserver.observe(video, { attributes: true, attributeFilter: ['style'] });
  }

  // ==================== Bind to video element ====================

  function bindVideo(video) {
    if (!video || video === videoSpeedToChange) return; // avoid re-binding same node repeatedly

    videoSpeedToChange = video;
    console.log("Targeted tag - " + videoSpeedToChange.tagName);

    watchVideoForResets(videoSpeedToChange);

    videoSpeedToChange.addEventListener('play', () => {
      console.log("Video is playing");
      console.log("Ran " + (Times += 1) + " Times");
      checkWCAttribute(videoSpeedToChange);
    });

    videoSpeedToChange.addEventListener('pause', () => {
      console.log('Video is paused');
      checkWCAttribute(videoSpeedToChange);
    });
  }

  document.addEventListener('click', function (event) {
    const clickedElement = event.target;
    const tagName = clickedElement.tagName.toLowerCase();
    if (tagName) {
      console.log("TagClicked " + tagName);
    }
    console.log("came here 1");

    const foundVideo = document.querySelector('video');
    if (foundVideo) {
      bindVideo(foundVideo);
    }
  });

  // Re-bind on YouTube SPA navigation (ad swaps / video element replacement)
  document.addEventListener('yt-navigate-finish', () => {
    const foundVideo = document.querySelector('video');
    if (foundVideo) {
      bindVideo(foundVideo);
    }
  });

  // ==================== Filters / speed / volume / zoom state ====================

  let isInvert = false;

  function updateFilters() {
    if (!videoSpeedToChange) return;
    if (isInvert) {
      videoSpeedToChange.style.filter = 'saturate(100%) contrast(115%) brightness(115%) invert(100%)';
    } else {
      videoSpeedToChange.style.filter = `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%)`;
    }
  }

  function removeFilters() {
    if (!videoSpeedToChange) return;
    videoSpeedToChange.style.filter = `saturate(100%) contrast(100%) brightness(100%)`;
  }

  let currSpeed = 1;
  let saturation = 100;
  let contrast = 100;
  let brightness = 100;
  let isEmbedLight = true;
  let zoom = 1;

  let satArr = [150, 100];
  let conArr = [110, 115];
  let brightArr = [100, 50];
  let filterMsg = ["For Movies", "For Late Night Studies"];
  let filterCounter = 0;

  let currVol;

  console.log("Above event listener of keys");

  document.addEventListener('keydown', (event) => {
    console.log("Some key pressed");

    if (!videoSpeedToChange) return; // guard: nothing to control yet

    const key = event.key.toLowerCase();

    if (key === 'a' && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      if (currSpeed > .25) {
        videoSpeedToChange.playbackRate = (currSpeed - .25);
        currSpeed -= .25;
        msgSpan.textContent = "Speed : " + (currSpeed).toFixed(2) + "x";
        showMsg();
      }
    }

    videoSpeedToChange.style.transition = "transform 0.3s ease";

    if (key === "m" && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      event.preventDefault();
      if (zoom < 2) {
        zoom += .05;
        videoSpeedToChange.style.transform = `scale(${zoom})`;
        msgSpan.textContent = 'Zoom : ' + zoom.toFixed(2);
        showMsg();
      }
    }

    if (key === "n" && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      event.preventDefault();
      if (zoom > 1) {
        zoom -= .05;
        videoSpeedToChange.style.transform = `scale(${zoom})`;
        msgSpan.textContent = 'Zoom : ' + zoom.toFixed(2);
        showMsg();
      }
    }

    if (key === "b" && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      event.preventDefault();
      zoom = 1;
      videoSpeedToChange.style.transform = `scale(${zoom})`;
      msgSpan.textContent = 'Zoom : ' + (zoom).toFixed(2);
      showMsg();
    }

    if (key === 's' && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      if (currSpeed < 8) {
        videoSpeedToChange.playbackRate = (currSpeed + .25);
        currSpeed += .25;
        msgSpan.textContent = "Speed : " + (currSpeed).toFixed(2) + "x";
        showMsg();
      }
    }

    if (key === 'd' && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      videoSpeedToChange.playbackRate = 1;
      currSpeed = 1;
      msgSpan.textContent = "Speed : " + (currSpeed).toFixed(2) + "x";
      showMsg();
    }

    if (key === '/' && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      event.preventDefault();
      currVol = videoSpeedToChange.volume;
      if (currVol > 0.1) {
        currVol -= 0.1;
        videoSpeedToChange.volume = currVol;
      }
      msgSpan.textContent = "Volume : " + (currVol * 100).toFixed(0) + "%";
      showMsg();
    }

    if (key === '*' && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      event.preventDefault();
      if (currVol === undefined) currVol = videoSpeedToChange.volume;
      if (currVol < 0.9) {
        currVol += 0.1;
        videoSpeedToChange.volume = currVol;
      }
      msgSpan.textContent = "Volume : " + (currVol * 100).toFixed(0) + "%";
      showMsg();
    }

    // ===== Filters =====

    if (key === "q" && !isAnyInputFocused && (saturation > 0)) {
      event.stopImmediatePropagation();
      saturation -= 10;
      updateFilters();
      msgSpan.textContent = 'Saturation : ' + (saturation / 100).toFixed(2);
      showMsg();
    }

    if (key === "w" && !isAnyInputFocused && (saturation < 200)) {
      event.stopImmediatePropagation();
      saturation = parseInt(saturation) + 10;
      updateFilters();
      msgSpan.textContent = 'Saturation : ' + (saturation / 100).toFixed(2);
      showMsg();
    }

    if (key === "e" && !isAnyInputFocused && (contrast > 50)) {
      event.stopImmediatePropagation();
      contrast -= 5;
      updateFilters();
      msgSpan.textContent = 'Contrast : ' + (contrast / 100).toFixed(2);
      showMsg();
    }

    if (key === "r" && !isAnyInputFocused && (contrast < 150)) {
      event.stopImmediatePropagation();
      contrast = parseInt(contrast) + 5;
      updateFilters();
      msgSpan.textContent = 'Contrast : ' + (contrast / 100).toFixed(2);
      showMsg();
    }

    if (event.key === "[" && !isAnyInputFocused && (brightness > 40)) {
      event.stopImmediatePropagation();
      brightness -= 5;
      updateFilters();
      msgSpan.textContent = 'Brightness : ' + (brightness / 100).toFixed(2);
      showMsg();
    }

    if (event.key === "]" && !isAnyInputFocused && (brightness < 150)) {
      event.stopImmediatePropagation();
      brightness = parseInt(brightness) + 5;
      updateFilters();
      msgSpan.textContent = 'Brightness : ' + (brightness / 100).toFixed(2);
      showMsg();
    }

    if (key === "x" && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      isInvert = !isInvert;
      updateFilters();
      filterCounter = 1;
      msgSpan.textContent = 'Invert : ' + isInvert;
      showMsg();
    }

    if (key === "z" && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      console.log("Z was Pressed");
      applyFilterPresets();
    }

    if (key === "v" && !isAnyInputFocused) {
      event.stopImmediatePropagation();
      removeFilters();
      isInvert = false;
      saturation = 100;
      brightness = 100;
      contrast = 100;
      filterCounter = 0;
      msgSpan.textContent = 'Filters Cleared';
      showMsg();
    }

  }, true);

  let applyFilterPresets = () => {
    if (!videoSpeedToChange) return;

    if (filterCounter > 1) {
      filterCounter = 0;
      console.log('came inside if if z');
    }

    saturation = satArr[filterCounter];
    contrast = conArr[filterCounter];
    brightness = brightArr[filterCounter];
    videoSpeedToChange.style.filter = `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%)`;
    isInvert = false;

    msgSpan.textContent = 'Filter Preset ' + (filterCounter + 1) + ': ' + filterMsg[filterCounter];
    filterCounter += 1;
    showMsg();
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "Preset") {
      if (request.status) {
        console.log("Preset applied by kevin");
        applyFilterPresets();
      }
    }
  });

});
