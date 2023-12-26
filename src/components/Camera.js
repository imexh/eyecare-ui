import * as faceapi from 'face-api.js';
import React from 'react';

function App() {

    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);

    const videoRef = React.useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = React.useRef();

    React.useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(setModelsLoaded(true));
        }
        loadModels();
    }, []);

    const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;

                video.onloadedmetadata = () => {
                    video.play();
                };
            })
            .catch(err => {
                console.error("error:", err);
            });
    }

    // const handleVideoOnPlay = () => {
    //     setInterval(async () => {
    //         try {
    //             if (canvasRef && canvasRef.current) {
    //                 const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    //                 canvasRef.current.appendChild(canvas);
    
    //                 const displaySize = {
    //                     width: videoWidth,
    //                     height: videoHeight
    //                 }
    
    //                 faceapi.matchDimensions(canvasRef.current, displaySize);
    
    //                 const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    //                 const resizedDetections = faceapi.resizeResults(detections, displaySize);
    
    //                 canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
    
    //                 var distance = 0.0
    
    //                 if (resizedDetections.length > 0) {
    //                     distance = calculateDistance(resizedDetections)
    //                 }
    
    //                 canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    //                 faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
    //                 showDistanceOnCanvas(canvasRef, distance, { x: 10, y: 30 })
    //             }
    //         }
    //         catch(err) {
    //             console.log(err);
    //         }
    //         // Do something to rate
    //     }, 100)
    // }

    const handleVideoOnPlay = async () => {    
        const displaySize = {
            width: videoWidth,
            height: videoHeight
        };
    
        faceapi.matchDimensions(canvasRef.current, displaySize);
    
        const processVideoFrame = async () => {
            try {
                if (canvasRef && canvasRef.current) {
                    const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);

                    canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
    
                    var distance = 0.0;
    
                    if (resizedDetections.length > 0) {
                        distance = calculateDistance(resizedDetections);
                    }
    
                    // faceapi.draw.drawDetections(canvasRef.current, resizedDetections); // UNCOMMENT TO SHOW DETECTION BOX
                    faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                    showDistanceOnCanvas(canvasRef, distance, { x: 10, y: 30 });
                }
            } catch (err) {
                console.log(err);
            }
    
            requestAnimationFrame(processVideoFrame);
        };
    
        requestAnimationFrame(processVideoFrame);
    };

    const closeWebcam = () => {
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
    }

    function showDistanceOnCanvas(canvasRef, value, position, fontSize = 20, textColor = 'white', bgColor = 'black') {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = bgColor;
        const textWidth = ctx.measureText(`Distance: ${value.toFixed(2)}cm`).width;
        const textHeight = fontSize;
        ctx.fillRect(position.x, position.y - textHeight, textWidth + 5, textHeight + 5);

        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = textColor;
        ctx.fillText(`Distance: ${value.toFixed(2)}cm`, position.x, position.y);
    }


    function calculateDistance(resizedDetections) {
        // Get coordinations of left and right eyes
        const landmarks = resizedDetections[0].landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        // Calculate the distance between the eyes in units pixels
        const distanceBetweenEyes = Math.sqrt(
            Math.pow(leftEye[0]._x - rightEye[3]._x, 2) +
            Math.pow(leftEye[0]._y - rightEye[3]._y, 2)
        );

        const averageHumanFaceWidth = 6.3; // In centimeters (Need to be accurate)
        const focalLength = 610; // Estimated focal length of the camera (Changes with camera)

        return (averageHumanFaceWidth * focalLength) / distanceBetweenEyes + 30
    }

    return (
        <div>
            <div style={{ textAlign: 'center', padding: '10px' }}>
                {
                    captureVideo && modelsLoaded ?
                        <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                            Close Webcam
                        </button>
                        :
                        <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                            Open Webcam
                        </button>
                }
            </div>
            {
                captureVideo ?
                    modelsLoaded ?
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                            </div>
                        </div>
                        :
                        <div>loading...</div>
                    :
                    <>
                    </>
            }
        </div>
    );
}

export default App;