import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router'
import firebase from 'firebase/compat/app'
import { AiFillLeftCircle } from "react-icons/ai";
import { AiFillRightCircle } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { GiBrokenArrow } from "react-icons/gi";
import Modal from 'react-modal'
import SendMessage from './SendMessage';

function Blank() {
    const {id} = useParams()
    const [currImg, setcurrImg] = useState([])
    const [imgIndex, setimgIndex] = useState(0)
    const [dogsinfolist, setdogsinfolist] = useState()
    const [modalisOpen, setmodalisOpen] = useState(false)
    useEffect(()=>{
      const valuref = firebase.database().ref("info/data")
      const dogsinfolist = []
      valuref.on('value',(snapshot)=>{
        const dogsinfo = snapshot.val()
        for (let id1 in dogsinfo){
          if(id1==id){
            //dogsinfolist.push(dogsinfo[id1])
            setdogsinfolist([dogsinfo[id]])
            setcurrImg(dogsinfo[id].fileUrl)
          }
        }
        // setdogsinfolist(dogsinfolist) 
      })
  },[])

    useEffect(()=>{
    },[dogsinfolist])
    const clickHandler1 = () =>{
      imgIndex==0 ? setimgIndex(currImg.length-1) : setimgIndex(imgIndex-1)
    }
    const clickHandler2 = () =>{
      imgIndex==currImg.length-1 ? setimgIndex(0) : setimgIndex(imgIndex+1)
    }

    return (
        <div className="main">
          <div className="display">
              <div className="carousel">
                <div className="dirBtns" onClick={clickHandler1}><AiFillLeftCircle/></div>
                <img src={currImg[imgIndex]} alt="" />
                <div className="dirBtns" onClick={clickHandler2}><AiFillRightCircle/></div>
              </div>
              <div >
              {dogsinfolist && dogsinfolist.map((dog)=>(
                  <div className="dogpicGallery">
                    {dog.fileUrl.map((i,index)=>(
                      <div key={index} onClick={()=>setimgIndex(index)}>
                        {index==imgIndex && <img src={i} alt="" style={{border:"3px solid blue",borderRadius:"5px"}}/>} 
                        {index!=imgIndex && <img src={i} alt="" />}   
                      </div>
                    ))}
                  </div>
                ))}
              </div> 
          </div>
         
           <div >
               {dogsinfolist && dogsinfolist.map(i=>(
                 <div className="about">
                    <div className="personAbout">
                          <h3>Person's Name</h3>
                          <div>
                            <div className="iconName">
                            <div className="icon"><h1>{i.values.user.charAt(0)}</h1></div>
                            <h2>{i.values.user}</h2>
                            {/* <button className="dirBtns2"><BsChevronRight/></button> */}
                            </div>
                            <div className="chat" onClick={()=>{setmodalisOpen(true)}}>Chat with owner</div>
                            <Modal isOpen={modalisOpen}
                            style={{
                              overlay:{
                                  backgroundColor:'rgba(0,0,0,0.65)',
                              },
                              content:{
                                  width:'35%',
                                  height:"45%",
                                  margin:"auto",
                                  padding:"0",
                                  display:"flex",
                                  flexDirection:"column",
                                  justifyContent:"space-around"
                              }
                              }}
                            >
                              <div className="modaldiv">
                              {i.values.number ? 
                                <div className="contactModal">
                                  <div style={{display:"flex",alignItems:"center"}}>
                                  <AiOutlineWhatsApp style={{fontSize:"3em"}}/>
                                  <p style={{fontSize:"2em"}}>-{i.values.number}</p>
                                  </div>
                                  <button onClick={()=>{setmodalisOpen(false)}} className="submitBtn" style={{background:"green"}}>close</button>
                                </div> : 
                                <div className="errorModal">
                                  <GiBrokenArrow style={{fontSize:"4em"}}/>
                                  <h2 style={{color:"red",fontSize:"1.5em"}}>Sorry,no contact number provided</h2>
                                  <button onClick={()=>{setmodalisOpen(false)}} className="submitBtn" style={{background:"green"}}>close</button>
                                </div>
                                }
                              </div>
                              <h5 style={{opacity:"0.3",textAlign:"center"}}>Chat feature was abandoned due to time constraints and complexities</h5>
                            </Modal>
                          </div>
                    </div>
                    <div className="dogAbout">
                        <h3> Dog's Name</h3>
                        <h2>{i.values.name}</h2>
                        <div className="locAge">
                          <div style={{display:"flex"}}>
                          <GrMapLocation/>{i.values.location =="" ? <h4>-?</h4> : <h4>{i.values.location}</h4>}
                          </div>
                          <h4>Age:{i.values.age =="" ? <>-?</> : <>{i.values.age}</>}</h4>
                        </div>
                    </div>
                    <div className="aboutAbout">
                      <h2>About:</h2>
                      <p>{i.values.about}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
    )
}

export default Blank
