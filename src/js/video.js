var recordedChunks = [];
var theStream;

var recorder = null;
function gotMedia(stream) {
    // |video| shows a live view of the captured MediaStream.
    theStream = stream;
    var video = document.querySelector('video');
    video.src = URL.createObjectURL(stream);
    try {
        recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    } catch (e) {
        console.error('Exception while creating MediaRecorder: ' + e);
        return;
    }

    recorder.ondataavailable = (event) => {
        console.log(' Recorded chunk of size ' + event.data.size + "B");
        recordedChunks.push(event.data);
    };
}

btn_start_record.addEventListener('click', function (event) {
    recorder.start(100);
})

navigator.mediaDevices.getUserMedia({ "video": { width: { max: 640 } }, "audio" : true })
    .then(gotMedia)
    .catch(e => { console.error('getUserMedia() failed: ' + e); });

function download() {
    recorder.stop();
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
}