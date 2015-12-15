function initializePlayer() {
    video = document.querySelector('video.shadowEffect');
    
    // turn off the default video controls 
    video.controls = false;
    
    //Select the video cover image
    $videoCover = $('#videoCover');
    
    //
    // grab handles (nicknames or references)) to our various control elements
    // 
    playPauseButton = document.getElementById('playPause');
    stopButton = document.getElementById('stopButton');
    progressBar = document.getElementById('progressBar');
    playProgress = document.getElementById('played');
    muteButton = document.getElementById('mute');
    volumeSlider = document.getElementById('volumeSlider');
    fullScreenButton = document.getElementById('fullScreen');
    
    //time values 
    currentTimeText = document.getElementById('currentTime');
    durationTimeText = document.getElementById('durationTime');
    
    //Determine and display the video's duration 
    durationMinutes = Math.floor(video.duration / 60);
    durationSeconds = Math.floor(video.duration % 60);
    
    
//    console.log('druation = ' + video.duration)
    
    if (durationSeconds < 10){
        durationSeconds = '0' + durationSeconds;
        
    }
    
    durationTimeText.innerHTML = durationMinutes + ':' + durationSeconds;
    
    
    //
    // Add event listeners to detect when a control has been
    // activated by the user 
    // 
    
    playPauseButton.addEventListener('click',  togglePlay, false);
   // old way...  playPauseButton.onclick = togglePlay; 
    stopButton.addEventListener('click',  stopVideo, false);
    muteButton.addEventListener('click', toggleMute, false);
    volumeSlider.addEventListener('input', setVolume, false);
//    volumeSlider.addEventListener('change', setVolume, false);
    // note : the 'change' event requires a commit to the change (meanting 
    // they need to mouse up before change is commited), where 'input' 
    // event does not require commit
    fullScreenButton.addEventListener('click', toggleFullScreen, false);
    
    
    // update the progress bar and current time as video plays 
    video.addEventListener('timeupdate', updateProgress, false);
    
    
    
    // add 'seek' ablility 
    progressBar.addEventListener('mouseup', function (e) {
       
        // pass the mouse cursor's position to set a new play position 
        // on the progress bar to refect where the user 'clicked'
        setPlayPosition(e.pageX);
        
    });
}

// fade the video cover image back in when video ends 
    video.addEventListener('ended', function () {
    
   stopVideo();
    
    $videoCover.fadeIn(3000, function(){
        
//       playPauseButton.className = 'playBtn';
//        this.currentTime = 0;
        
//        currentTimeText.innerHTML = '0:00';
//        playProgress.style.width = '0%';
        
    });
    
}, false);



function togglePlay() {
    
    // if video is paused or ended
    if (video.paused || video.ended) {
        console.log('current')
        
        if(!video.currentTime) {
            $videoCover.fadeOut(500);
        }
        
//        
//        if(video.ended){
//            console.log('video ended');
//            video.currentTime = 0; // reset time to beginning 
//            playPauseButton.className = 'playBtn';
//
//            
//        } 
//        else { // video is paused, but not ended
//        
//        video.play();
//        playPauseButton.className = 'pauseBtn';
//        
//        }
        
    
    }
    else { // video is playing 
        
        video.pause();
        playPauseButton.className = 'playBtn';
        
    }
    
}

function stopVideo() {
    
    video.pause();
    
    if (playPauseButton.className == 'pauseBtn'){
        playPauseButton.className = 'playBtn';
        
    }
    video.currentTime = 0;
    
}

function toggleMute() {
    
    if (video.muted) {
        
        video.muted = false;
        muteButton.className = 'mute';
        
    }
    else { // video was not muted 
        video.muted = true; 
        muteButton.className = 'unmute';
        
    }
}

function setVolume() {
    
    if (video.muted) {
        toggleMute();
    }
    
    video.volume = this.value;
    
}

function toggleFullScreen() {
    
    // Use feature detection to determine if user's browser 
    // supports fullscreen standard vs prefix 
    if (video.requestFullScreen) {
        video.requestFullScreen();
        
    } 
    else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    }
    else if (video.mozRequestFullScreen) {
         video.mozRequestFullScreen();

    }
    else if (video.msRequestFullScreen){
        video.allowFullScreen = true;
         video.msRequestFullScreen();

    }
}

function updateProgress(){
    
    var value = 0;
    
    if (video.currentTime > 0){ // not at beginning 
        
        value = (100 / video.duration) * video.currentTime;
        
    }
    
    
    // fill the progress bar element to the point the 
    // video is currently at (current playback position)
    playProgress.style.width = value + '%';
    
    // DETERMINE AND DISPLAY THE CURRENT TIME FIELD 
    currentMinutes = Math.floor(video.currentTime / 60);
    currentSeconds = Math.floor(video.currentTime % 60);
    
    if (currentSeconds < 10) {
        
        currentSeconds = '0' + currentSeconds;
    }
    
    currentTimeText.innerHTML = currentMinutes + ":" + currentSeconds;
    
}

function setPlayPosition(mouseX){
    
  // if video.currentTime is 0 meaning user clicks progress bar before 
    // video is played at all fade out the video cover image 
    if (!video.currentTime){
       $videoCover.fadeOut(500);
   }
    
    var playPos = (mouseX - findPos(progressBar)).toFixed(2);
    
    var timeToSet = ((video.duration / progressBar.offsetWidth) * playPos).toFixed(2);
    
    video.currentTime = timeToSet;

}


function findPos(progressBarObject){
    
    var currentLeft = 0;
    
    if (progressBarObject.offsetParent){
        
        // loop up through all the offsetParent objects until we 
        // reach the top (html element)
        do {
            
            currentLeft += progressBarObject.offsetLeft;
            
        } while(progressBarObject = progressBarObject.offsetParent);
    
    }
    
    return currentLeft;
}