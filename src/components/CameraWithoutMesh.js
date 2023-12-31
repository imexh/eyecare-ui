import * as faceapi from 'face-api.js';
import React from 'react';

function CameraComponent({ onDistanceChange }) {

    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);
    const [videoDimensions, setVideoDimensions] = React.useState({
        height: 480,
        width: 640,
    });

    const videoRef = React.useRef();
    const canvasRef = React.useRef();

    React.useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(() => {
                setModelsLoaded(true);
                startVideo();
            });
        }
        loadModels();
    }, []);

    const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } }) // Controls the size of video
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;

                video.onloadedmetadata = () => {
                    video.play();

                    setVideoDimensions({
                        height: video.videoHeight,
                        width: video.videoWidth,
                    });
                };
            })
            .catch(err => {
                console.error("error:", err);
            });
    }

    const handleVideoOnPlay = async () => {
        const displaySize = {
            width: videoDimensions.width,
            height: videoDimensions.height
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const processVideoFrame = async () => {
            try {
                if (canvasRef && canvasRef.current) {
                    const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);

                    canvasRef.current.getContext('2d').clearRect(0, 0, videoDimensions.width, videoDimensions.height);

                    var distance = 0.0;

                    if (resizedDetections.length > 0) {
                        distance = calculateDistance(resizedDetections);
                    }

                    // faceapi.draw.drawDetections(canvasRef.current, resizedDetections); // UNCOMMENT TO SHOW DETECTION BOX
                    // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                    // showDistanceOnCanvas(canvasRef, distance, { x: 10, y: 30 });
                    onDistanceChange(distance);
                }
            } catch (err) {
                console.log(err);
            }

            requestAnimationFrame(processVideoFrame);
        };

        requestAnimationFrame(processVideoFrame);
    };

    // eslint-disable-next-line no-unused-vars
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

        return (averageHumanFaceWidth * focalLength) / distanceBetweenEyes + 25; // Change 25 to a correct value (Nodejs is 30)
    }

    return (
        <div>
            {
                captureVideo ?
                    modelsLoaded ?
                        <div>
                            <div>
                                {/* <video ref={videoRef} height={videoDimensions.height} width={videoDimensions.width} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} /> */}
                                <video ref={videoRef} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
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

export default CameraComponent;