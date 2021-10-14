import React,{useState,useEffect,useContext,useCallback} from 'react'
import Modal from 'react-modal'
import {auth} from '../firebase'
import {AuthContext} from "../Auth"
import { useHistory } from 'react-router'

Modal.setAppElement('#root')
function SignInLogin({setmodalIsOpen,push2,setpush2}) {

    const {currentUser} = useContext(AuthContext);
    const [loginModal, setloginModal] = useState("")
    const [signUpModal, setsignUpModal] = useState("none")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [Error, setError] = useState("")
    const [user, setUser] = useState("")
    const [hasAccount, sethasAccount] = useState(false)
    const [loginLoading, setloginLoading] = useState(false)
    const history = useHistory()


    const clearInputs =()=>{
        setemail("")
        setpassword("")
    }

    const clearErrors =()=>{
        setError("")
    }

//    const handleLogin = async() =>{
//     clearErrors();
//     await app.auth()
//     .signInWithEmailAndPassword(email,password)
//     .catch((err)=>{
//         switch(err.code){
//             case "auth/invalid-email":
//             case "auth/user-disabled":
//             case "auth/user-not-found":
//                 setemailError(err.message)   
//                 break;
//             case "auth/wrong-password":
//                 setpasswordError(err.message)
//         }    
//     })
//   }

    const handleLogin = useCallback(
      async event => {
        event.preventDefault();
        try {
          await 
            auth
            .signInWithEmailAndPassword(email, password)
            push2 ? history.push("/give4adoption") :
            history.push("/")
            setpush2(false)
        } catch (error) {
          setError(error.message)
        }
      })

      const handleSignUp = useCallback(
        async event => {
          event.preventDefault();
          try {
            await 
              auth
              .createUserWithEmailAndPassword(email,password)
              push2 ? history.push("/give4adoption") :
              history.push("/")
              setpush2(false)
          } catch (error) {
            setError(error.message)
          }
        })


//    const handleSignUp = async () =>{
//     clearErrors();
//     app
//     .auth()
//     .createUserWithEmailAndPassword(email,password)
//     .catch((err)=>{
//         switch(err.code){
//             case "auth/invalid-email":
//             case "auth/email-already-in-use":
//                 setemailError(err.message)   
//                 break;
//             case "auth/weak-password":
//                 setpasswordError(err.message)
//         }    
//     })
//   }

    useEffect(()=>{
        // {currentUser && setmodalIsOpen(false)}
        if(currentUser!=null){
            setmodalIsOpen(false)
        }
    },[handleLogin,handleSignUp])
    
    return (
        <>
                <p className="errors">{Error}</p>
                <label>Email</label>
                <input type="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                <div className="btnContainer">
                    {!hasAccount ?(
                      <>
                      <button onClick={handleLogin} className="submitBtn" style={{background:"green"}}>Login</button>
                      <p>Don't have an account ?
                      <span onClick={()=>{sethasAccount(!hasAccount)
                                         clearErrors("")}}>SignUp</span>
                      </p>
                      </>   
                    ):(
                        <>
                      <button onClick={handleSignUp} className="submitBtn" style={{background:"green"}}>SignUp</button>
                      <div>have an account ?
                      <span onClick={()=>{sethasAccount(!hasAccount)
                                         clearErrors("")}}>SignIn</span>
                      </div>
                      </>    
                    )}
                </div>
                {loginLoading && <h1>Loading...</h1>}
        </>
    )
}

export default SignInLogin
