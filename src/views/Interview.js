import React from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'
import axios from 'axios';
import Webcam from "react-webcam"
import { Button, Button2, InputTag, SectionHeader } from '../components';
import im from "./robo.png"
import { useSpeechSynthesis } from "react-speech-kit"
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
const Interview = () => {
    const navigate = useNavigate();
    const k = [
        "Hello How are you? Introduce yourself",
        "How did you learn Management System?",
        "What was your contribution in Store Easy?",
        "How was your experience at PPM Info",
        "What was your contribution in Finalist Avishkar"
    ]

    const [val, setval] = useState(0);
    const { speak } = useSpeechSynthesis();
    const vid = useReactMediaRecorder(
        {
            video: true,
            audio: false,
            blobPropertyBag: { type: "video/mp4" },
        }
    );
    const aud = useReactMediaRecorder(
        {
            audio: true,
        }
    );

    React.useEffect(() => {

        async function uploadVoice() {
            const audioBlob = await fetch(aud.mediaBlobUrl).then((r) => r.blob());
            const audiofile = new File([audioBlob], "audio/wav", {
                type: "audio/wav",
            });
            console.log(audiofile);
            const formData = new FormData();
            formData.append("file", audiofile);
            await axios.post(
                // endPoint,
                formData,
                {
                    "content-type": "multipart/form-data",
                }
            );

        }
        if (aud.mediaBlobUrl) {
            uploadVoice();
        }

    }, [aud.mediaBlobUrl]);

    React.useEffect(() => {

        async function uploadVideo() {
            const audioBlob = await fetch(vid.mediaBlobUrl).then((r) => r.blob());
            const audiofile = new File([audioBlob], "video/mp4", {
                type: "video/mp4",
            });
            console.log(audiofile);
            const formData = new FormData();
            formData.append("file", audiofile);
            await axios.post(
                // endPoint,
                formData,
                {
                    "content-type": "multipart/form-data",
                }
            );

        }
        if (vid.mediaBlobUrl) {
            uploadVideo();
        }

    }, [vid.mediaBlobUrl]);

    return (
        <div>
            {/* <center> */}
            <Button2 onClick={() => {
                speak({ text: k[val] });
                // setval(val + 1)
            }}>Start</Button2>
            <div className="grid grid-cols-2">
                <div>
                    <img src={im} alt="robot" style={{ height: "400px" }} />
                    <br />

                    <p>{k[val]}</p>
                </div>
                <div>
                    <Webcam />
                    <br />
                    <SectionHeader>Status : {aud.status}</SectionHeader>
                    <br />
                    <Button2 onClick={() => {

                        aud.startRecording()
                        vid.startRecording()
                    }}>Start Recording</Button2>
                    <Button2 onClick={() => {
                        aud.stopRecording()
                        vid.stopRecording()
                        speak({ text: k[val+1] });
                        setval(val + 1);
                        if (val+1 >= k.length) {
                            Swal.fire("View your progress",'',"success");
                            navigate("/admin/users/")
                        }
                    }}>Stop Recording</Button2>
                </div>
            </div>
            {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
            {/* </center> */}
            {/* <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <video src={mediaBlobUrl} controls autoPlay loop />
                    </div>
                )}
            /> */}
        </div>
    )
}

export default Interview