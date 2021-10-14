import React,{useEffect,useState,useContext} from 'react'
import {db0,storage,auth} from '../firebase'
import { BiImageAdd } from 'react-icons/bi';
import { ImCheckmark } from 'react-icons/im';
import {AuthContext} from "../Auth"
import { useLocation } from 'react-router';


function Give4adoption({dogBg}) {
    const {currentUser,pending} = useContext(AuthContext); 
    const initialvalues ={
                user:currentUser.email,
                userUid:currentUser.uid,
                name:"",
                age:"",
                location:"",
                about:"",
                number:""
            }

    
    const [successful, setsuccessful] = useState(false)
    const [values, setvalues] = useState(initialvalues)
    const [fileUrl, setfileUrl] = useState([])
    const [loaded, setloaded] = useState()
    const location = useLocation()
        //submit handler
        const submitHandler =  (e)=>{
            e.preventDefault()
            const infoRef = db0.ref(`info/data`)
            infoRef.push({values,fileUrl})
            setvalues(initialvalues)
            setfileUrl([])
            setsuccessful(true)
        }
        // change handler
        const handlerPicSubmit = async (e)=>{
            setloaded(false)
            for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files[i];
                const storageRef = storage.ref()
                const fileRef = storageRef.child(`images/${file.name}`)
                await fileRef.put(file)
                const urls = await fileRef.getDownloadURL()
                setfileUrl(prevUrls=>[...prevUrls,urls])
                setloaded(true)
            };
        }
        useEffect(()=>{
            console.log(dogBg)
        })
    return (
        <div style={{backgroundImage: `url(${dogBg})`}}>
           <div style={{position:"relative",border:"1px solid black",}}>
           {successful && (<div>
            <div className="blankdiv"></div>
            <div className="successDiv">
                <div className="message"><ImCheckmark/>&nbsp;&nbsp;Submitted Successfully!!</div>
                <div className="doneDiv">
                    <div className="done" onClick={()=>setsuccessful(!successful)}>done</div>
                </div>
            </div>
            </div>)}
            
            <form  onSubmit={submitHandler}>
            {/* <label>Username</label>
            <input type="text" value={values.user} onChange={(e)=>setvalues({...values,user:e.target.value})} required/> */}
            <label>Pet Name</label>
            <input type="text" value={values.name} onChange={(e)=>setvalues({...values,name:e.target.value})} required/>
            <label>Ph no.</label>
            <input type="text" value={values.number} onChange={(e)=>setvalues({...values,number:e.target.value})} required/>
            <label>Age</label>
            <input type="number" value={values.age} onChange={(e)=>setvalues({...values,age:e.target.value})} required/>
            <label>Location</label>
            <input type="text" value={values.location} onChange={(e)=>setvalues({...values,location:e.target.value})} required/>
            <label>About</label>
            {/* <input type="text" className="textarea" value={values.about} onChange={(e)=>setvalues({...values,about:e.target.value})}/>  */}
            <textarea name="" id="" cols="30" rows="10" className="textarea" value={values.about} onChange={(e)=>setvalues({...values,about:e.target.value})} required></textarea>
            <label><h3>upload 2 or more photos</h3></label>
            
            <div className="subpics">
                <div className="beforeUpload">
                    <label className="btn">
                        <BiImageAdd/>
                        <input type="file" multiple style={{display:"none"}} onChange={handlerPicSubmit} required/>
                        
                    </label>
                    {loaded==false && <div className="loader"></div>}
                    {fileUrl && fileUrl.map((url,index)=>(
                        <div className="btn2"><img src={url} alt="" /></div>
                    ))}
                </div>
            </div>
            <input type="submit" value="submit" className="submitBtn"/>
            </form>
        </div>
        </div>  
    )}

export default Give4adoption
