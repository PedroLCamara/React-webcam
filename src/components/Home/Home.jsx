import React, { useState } from 'react'
import './homeStyles.css'
import { WebcamCapture, GetAsFile} from '../Webcam/Webcam'


const Home = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');


    const submitForm = () => {
        alert("Form submitted");
        setName('');
        setEmail('');
    }

    const logarArqImg = () => {
        const img = document.getElementById("inputImagemBuscaAluno").files[0];
        console.log(img)
        console.log(GetAsFile())
    }


    return (
        <div className="home-container">
            <div className="container">
                <div className="text">
                    <h1>Fill up this form!</h1>
                    <form className="form">
                        <WebcamCapture/>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        <input type="file" id="inputImagemBuscaAluno"  onChange={(e) => logarArqImg()} />
                        <button type="submit" id="login-button" onClick={(e) => submitForm(e)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Home
