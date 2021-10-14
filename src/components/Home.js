import React ,{useEffect} from 'react'
import puppy01 from "../img/puppy01.jpg"
import puppy02 from "../img/puppy02.jpg"
import {Link} from "react-router-dom"
import { BsChevronRight } from "react-icons/bs";
import { GrReactjs} from "react-icons/gr";
import { SiFirebase} from "react-icons/si";
import { SiJavascript} from "react-icons/si";
import { DiCss3} from "react-icons/di";
import { AiFillHtml5} from "react-icons/ai";
import Navbar from './Navbar'


function Home({dogsinfolist,vid}) {
    return (
        <div>
            <div className="videos">
                <video src={vid} muted loop autoPlay></video>
                <div className="overlay"></div>
            </div>
      
            <div className="hero-txt">
                <h1>
                Help dogs 
                </h1>
                <h2>
                to find their new homes,
                </h2>
                <h2>
                Adopt / give 4 adoption.
                </h2>
                <button><Link to='/take4adoption' style={{textDecoration:"none",color:'white',fontSize:"1.5em"}}>Find now</Link></button>
            </div>
    
            <div className="dogDiv">
                <div className="discoverSec">
                    <h1>Discover <br/>Section</h1>
                </div>
                <div  className="dogGallery">
                    {dogsinfolist && dogsinfolist.map(dog=>(
                <Link to={`dogs/${dog.id}`} style={{textDecoration:"50px",color:"black"}}>
                <div className="dogGalleryind">
                    <img src={dog.fileUrl} alt="" style={{width:"100%",height:"85%",objectFit:"cover"}}/>
                        <div style={{textAlign:"center"}}>{dog.values.name}</div>
                </div>
                </Link> 
                ))
                }
                </div>
                <Link to="Take4adoption">
                <button className="moreBtn">< BsChevronRight /></button>
              </Link>
            </div>
            <div className="adoption">
                <div className="div1">
                    <img src={puppy01} alt="" />
                    <Link to="/give4adoption"><h1 className="h1s">Give For Adoption</h1></Link>
                </div>
                <div className="div2">
                    <img src={puppy02} alt="" />
                    <Link to="take4adoption"><h1 className="h1s">Take For Adoption</h1></Link>
                </div>
            </div>
            <div className="techUsed">
                <div className="techheading"><h5>Made by Nitin</h5></div>
                <div className="allIcons">
                    <div className="icons">
                    <SiJavascript style={{width:"100%",height:"100%"}}/>
                    </div>
                    <div className="icons">
                    <GrReactjs style={{width:"100%",height:"100%"}}/>
                    </div>
                    <div className="icons">
                    <SiFirebase style={{width:"100%",height:"100%"}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
