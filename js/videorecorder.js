const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const downloadButton = document.getElementById('downloadButton');
const preview = document.getElementById('preview');

let mediaRecorder;
let recordedBlobs = [];

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);
downloadButton.addEventListener('click', downloadVideo);

function startRecording() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      preview.srcObject = stream;
      preview.play();
      mediaRecorder.start();

      recordedBlobs = [];
      startButton.disabled = true;
      stopButton.disabled = false;
    })
    .catch(err => {
      console.error('Error accessing camera:', err);
    });
}

function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
}

function downloadVideo() {
  if (recordedBlobs.length === 0) return;

  const videoBlob = new Blob(recordedBlobs, { type: 'video/webm' });
  const videoURL = URL.createObjectURL(videoBlob);

  downloadButton.href = videoURL;
  downloadButton.download = 'recorded_video.webm';
}

mediaRecorder.ondataavailable = (event) => {
  recordedBlobs.push(event.data);
}