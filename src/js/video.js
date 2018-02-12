var recordedChunks = [];

  function gotMedia(stream) {
    // |video| shows a live view of the captured MediaStream.
    var video = document.querySelector('video');
    video.src = URL.createObjectURL(stream);

    var recorder = null;
    try {
      recorder = new MediaRecorder(stream, {mimeType : "video/webm"});
    } catch (e) {
      console.error('Exception while creating MediaRecorder: ' + e);
      return;
    }

    recorder.ondataavailable = (event) => {
      console.log(' Recorded chunk of size ' + event.data.size + "B");
      recordedChunks.push(event.data);
    };

    recorder.start(100);
  }

  navigator.mediaDevices.getUserMedia({video: true , audio: true})
      .then(gotMedia)
      .catch(e => { console.error('getUserMedia() failed: ' + e); });