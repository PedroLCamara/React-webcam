import React, { useState } from 'react';
import Webcam from "react-webcam";

//Salva a imagem como arquivo no escopo global
var ImgFile;

//Retorna a imagem como arquivo
export const GetAsFile = () => {
    return ImgFile
}

//Retorna se a imagem esta preenchida ou nao
export const IsFileSet = () => {
    if (ImgFile != undefined) 
        return true
    else return false
}

//Cria o componente webcam
const WebcamComponent = () => <Webcam />;

//Define as configurações do componente de webcam
const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

//Define o método de captura de imagem no componente de webcam
export const WebcamCapture = () => {

    const [image, setImage] = useState('');
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc);
            Conversoes(imageSrc);
        });

        const Conversoes = async(imageSrc) => {
            var UrltoFile;
            UrltoFile = await dataURLtoFile(imageSrc, "ImagemWebcam");
            console.log(UrltoFile);
            ImgFile = UrltoFile;
        }

    const dataURLtoFile = async (dataurl, filename) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    return (
        <div className="webcam-container">
            <div className="webcam-img">

                {image == '' ? <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </div>
            <div>
                {image != '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>
        </div>
    );
};

export default WebcamCapture;
