import React, {useState} from 'react'
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

Modal.setAppElement('#root');


// eslint-disable-next-line
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: '20px',
        margin: '0px',
        // marginRight: '-50%',
        width: "30%",
        transform: 'translate(-50%, -50%)',
        border: '2px solid var(--primary)',
        borderRadius: '12px',
    },
};

export default function SignUp(props) {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'var(--primary)';
    }

    function closeModal() {
        setIsOpen(false);
        console.log("Closing modal");
    }


    const host = "http://localhost:8000";

    const [cred, setCred] = useState({name: "", email: "", password: ""})
    const navigate = useNavigate();

    const onChange = (e) =>{
        setCred({...cred, [e.target.name]: e.target.value})
    }

    const handelOnSubmit = async(e) => {
        e.preventDefault();
        const {name, email, password} = cred;

        const response = await fetch(`${host}/api/auth/createuser`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password}),
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // redirect to HomePage--
            localStorage.setItem("token", json.authToken);
            console.log("You have Successfully Created your account")
            navigate("/");
            closeModal();
        } else {
            // alert("Invaild Credintials, Please try again...")
            console.log("Not Created")
        }
    }

    return (
        <div className='boxModal'>  
            <button className="headBtn-one" onClick={openModal}>{props.signup}</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='login-main'>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Sign Up Your Account Here</h2>
                    <CloseIcon onClick={closeModal} />
                </div>

                <div className='login-form btn'>
                    <p>Already have an account? <span>Login</span></p>
                    <div className="login-socialBtn">
                        <div className="login-socialBtn-first">
                            <button style={{ marginRight: "20px" }} ><Link to="/facebook">Google <GoogleIcon fontSize="small" /></Link></button>
                            <button><Link to="/google">FaceBook <FacebookIcon fontSize="small" /></Link></button>
                        </div>
                        <div className="login-socialBtn-first">
                            <button style={{ marginRight: "20px" }}><Link to="/instagram">Discord</Link></button>
                            <button><Link to="/github">GitHub <GitHubIcon fontSize="small" /></Link></button>
                        </div>
                    </div>
                    <p className='or'>OR</p>
                    <form onSubmit={handelOnSubmit}>
                        <input type="text" placeholder='Enter your Name' id="name" name="name" onChange={onChange} required/><br />
                        <input type="text" placeholder='Enter your Email' id="email" name="email" onChange={onChange} required/><br />
                        <input type="text" placeholder='Enter your Password' id="password" name="password" onChange={onChange} required/><br />
                        <button type="submit" className='sbtn'>Sign Up</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}