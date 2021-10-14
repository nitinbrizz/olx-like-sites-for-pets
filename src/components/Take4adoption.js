// eslint-disable-next-line
import React from 'react'
import { Link } from 'react-router-dom'
import { BsPersonFill } from 'react-icons/bs';
import { FaDog } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';

function Take4adoption({dogsinfolist,dogBg}) {
    return (
        <div className="container2" style={{backgroundImage: `url(${dogBg})`}}>
            <div className="doglist">
            {dogsinfolist && dogsinfolist.map(dog=>(
              <div className="dogContent">
                  <Link to={`dogs/${dog.id}`} style={{textDecoration:"50px",color:"black"}}>
                    <img src={ dog.fileUrl} alt="" className="dogContentImg" />
                    <div className="dc">
                    <div className="dc1">
                        <h2>{dog.values.name}</h2>
                        <button className="adoptBtn">Adopt</button>
                    </div>
                    <div className="dc2">
                    <div >{dog.values.age} yrs old</div>
                    <div style={{width:"50%"}}><GrLocation/>{dog.values.location}</div>
                    </div>   
                    </div>
                    </Link>  
              </div>
              
            ))
            }
            </div>
        </div>
    )
}

export default Take4adoption
