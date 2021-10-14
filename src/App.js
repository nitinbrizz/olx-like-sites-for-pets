import './App.css';
import { useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Take4adoption from './components/Take4adoption';
import Give4adoption from './components/Give4adoption';
import Blank from './components/Blank';
import {db0,storage} from './firebase'
import {AuthProvider}  from './Auth';
import SendMessage from './components/SendMessage';
import Chat from './components/Chat';


function App() {
  const [dogsinfolist, setdogsinfolist] = useState()
  const [vid, setvid] = useState()
  const [dogBg, setdogBg] = useState('')
  
  useEffect(()=>{
    const valuref = db0.ref("info/data")
    valuref.on('value',(snapshot)=>{
      const dogsinfo = snapshot.val()
      const dogsinfolist=[]
      var index=0
      for (let id in dogsinfo){
        dogsinfolist.push(dogsinfo[id])
        dogsinfolist[index].id=id
        index+=1
      }
      setdogsinfolist(dogsinfolist)
    })
    const videos = storage.ref().child('videos');
    const video = videos.child('Pexels Videos 2716.mp4');
    video.getDownloadURL().then((url) => setvid(url));
    const bg=storage.ref().child('bg.webp')
    bg.getDownloadURL().then((url)=>setdogBg(url))
    console.log(dogBg)
},[])

  return (
    <AuthProvider>
       <Router>
        <div className="container">
        <Navbar/>
        <Switch>
          <Route path="/Take4adoption">
            <Take4adoption dogsinfolist={dogsinfolist} dogBg={dogBg}/>
          </Route>
          <Route path="/Give4adoption">
            <Give4adoption dogBg={dogBg}/>
          </Route>
          <Route path="/dogs/:id">
            <Blank/>
          </Route>
          <Route path="/SendMessage">
              <SendMessage/>
          </Route>
          <Route path="/Chat">
              <Chat/>
          </Route>
          <Route path="/">
            <Home dogsinfolist={dogsinfolist} vid={vid}/>
          </Route>
        </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
