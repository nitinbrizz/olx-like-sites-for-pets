import React,{useEffect,useState,useContext} from 'react'
import firebase from 'firebase/compat/app'
import { AuthContext } from '../Auth';
import { auth,db } from '../firebase';

function Chat() {
    const [msgs, setMsgs] = useState('')

        useEffect(() => {
            const { uid } = auth.currentUser
                db.collection("messages").doc(uid).get().then((snapshot) => {
                    // setMsgs(snapshot.docs.map(doc => doc.data()))
                    console.log(snapshot)
                })
            }, [])
    return (
        <div>
            <div className="msgs">
                {msgs && msgs.map((m) => (
                    <div>
                        {m.text}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Chat

