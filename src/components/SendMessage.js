import React, { useState,useEffect } from 'react'
import {db,auth} from '../firebase'
import firebase from 'firebase/compat/app'

function SendMessage({ userUid  }) {
    const [msg, setMsg] = useState('')

    const sendMessage = async (e)=>{
        e.preventDefault()
        const { uid, photoURL } = auth.currentUser
        await db.collection('messages').doc(userUid).set({
            text: msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        // scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    // useEffect(() => {
    //     const { uid } = auth.currentUser
    //     db.collection('messages').doc(uid).collection(userUid).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
    //         setmsgs(snapshot.docs.map(doc => doc.data()))
    //         // console.log(snapshot.docs)
    //     })
    // }, [])


    return (
        <div>
            {/* <div className="msgs">
                {msgs && msgs.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} >
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div> */}
            <form onSubmit={sendMessage} className="sendMsg">
                <div >
                    <input  placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} ></input>
                    <button  type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage