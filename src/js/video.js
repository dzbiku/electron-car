var recordedChunks = [];
var theStream;

//for timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timer;
function setTimerAfterClick() {
    timer = setInterval(setTime, 1000);
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}
//end timer

var recorder = null;
function gotMedia(stream) {
    // |video| shows a live view of the captured MediaStream.
    theStream = stream;
    var video = document.querySelector('video');

    video.src = URL.createObjectURL(stream);
    try {
        recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    }
    catch (e) {
        console.error('Exception while creating MediaRecorder: ' + e);
        document.getElementById('details_error').innerHTML = "We have a trouble with Creating MediaRecorder. </br> Error details below: </br>" + e;
        return;
    }

    recorder.ondataavailable = (event) => {
        console.log(' Recorded chunk of size ' + event.data.size + "B");
        recordedChunks.push(event.data);
        document.getElementById('activator').innerHTML = "Recording in progress...";
    };
}

btn_start_record.addEventListener('click', function (event) {
    recorder.start(100);
    setTimerAfterClick();
})

btn_stop_record.addEventListener('click', function (event) {
    recorder.stop();
    //clear record time
    clearInterval(timer);
    document.getElementById('activator').innerHTML = "Recording stoped! Please click download button to save video.";
    document.getElementById('btn_take_video').style.display = "block";
    secondsLabel.innerHTML = minutesLabel.innerHTML = totalSeconds ="00";
})

navigator.mediaDevices.getUserMedia({ "video": { width: { max: 640 } }, "audio": true })
    .then(gotMedia)
    .catch(e => {
        console.error('getUserMedia() failed: ' + e);
        document.getElementById('details_error').innerHTML = "We have a trouble with connecting to Your camera. Please check connection beetwen cam and Your device. </br> Error details below: </br>" + e;
    });

function download() {
    //recorder.stop();
    theStream.getTracks().forEach(track => { track.stop(); });

    var blob = new Blob(recordedChunks, { type: "video/webm" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = 'test.webm';
    a.click();
    // setTimeout() here is needed for Firefox.
    setTimeout(function () { URL.revokeObjectURL(url); }, 100);
    document.getElementById('activator').innerHTML = "Vidoe downloaded!";
}