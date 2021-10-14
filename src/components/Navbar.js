import React,{useState,useContext,useCallback} from 'react'
import {Link,useLocation,useHistory} from "react-router-dom"
import {auth} from '../firebase'
import "firebase/auth";
import Modal from 'react-modal'
import SignInLogin from './SignInLogin';
import {AuthContext} from "../Auth"


// import {useAuthState} from "react-firebase-hooks/auth";
// import ReactModal from 'react-modal'
// const auth = firebase.auth();

Modal.setAppElement('#root')
function Navbar() {
    const {currentUser} = useContext(AuthContext);
    const [modalIsOpen, setmodalIsOpen] = useState(false)
    const [push2, setpush2] = useState(false)
    const location = useLocation()
    const history = useHistory()

    const handleGive4adptn =()=>{
        if(!currentUser){
            setmodalIsOpen(true)
            setpush2(true)
        }
    }
    // const handleLogin = useCallback(
    //     async event => {
    //       event.preventDefault();
    //       try {
    //         await app
    //           .auth()
    //           .signInWithEmailAndPassword(emailNav, passwordNav);
    //         history.push("/give4adoption");
    //       } catch (error) {
    //         alert(error);
    //       }
    //     }
    //   )

    return (
        <div className="NAV">
            {
                location.pathname!="/give4adoption" ?
                (<>
                <Link to="/" style={{textDecoration:"none",color:"white",margin:"1% 5%"}}><h1>PetaBite</h1></Link>
                <nav>
                    <ul>
                        <Link to={currentUser ? "/give4adoption" : ""} style={{textDecoration:"none",color:"white",fontSize:"20px"}}><li onClick={handleGive4adptn}>Give for Adoption</li></Link>
                        <Link to="/take4adoption" style={{textDecoration:"none",color:"white",fontSize:"20px"}}><li>Adopt</li></Link>
                        {/* <Link to="" style={{textDecoration:"none",color:"white",fontSize:"25px",margin:"auto 0"}}><AiFillHeart/></Link> */}
                        {!currentUser && (<button onClick={()=>setmodalIsOpen(!modalIsOpen)} className="submitBtn" style={{background:"#349eeb"}}>SignIn/Login</button>)}
                        {currentUser &&  (<button onClick={()=>(auth.signOut())} className="submitBtn" style={{background:"red"}}>SignOut</button>)}
                        {/* <Link to="/chat">chat</Link>
                        <Link to="SendMessage">SendMessage</Link> */}
                    </ul>
                </nav>
                <Modal 
                isOpen={modalIsOpen}
                onRequestClose={()=>setmodalIsOpen(false)}
                style={{
                    overlay:{
                        backgroundColor:'rgba(0,0,0,0.65)',
                    },
                    content:{
                        width:'35%',
                        height:"45%",
                        margin:"auto",
                        paddingLeft:"2%",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"space-around"
                    }
                    }}>
                    <SignInLogin setmodalIsOpen={setmodalIsOpen} setpush2={setpush2} push2={push2}/>
                </Modal></>)
                :
                <>
                <Link to="/" style={{textDecoration:"none",color:"white",margin:"1% 5%"}}><h1>PetaBite</h1></Link>
                </>    
        }
        </div>
    )
}

export default Navbar
