import {React, useState, useRef, useEffect} from 'react'
import Card from './components/Card';
import Navbar from './components/Navbar';
import User from './components/User';
import Button from './components/Button'

const LOCAL_KEY = "mycrew"
function App() {
  
  const [currentUsers, setCurrentUsers] = useState([])
  const memberRef = useRef()
   useEffect(()=>{


      const stored = JSON.parse(localStorage.getItem(LOCAL_KEY))
      if(stored) setCurrentUsers(stored)
    
   },[])
   useEffect(()=>{
    localStorage.setItem(LOCAL_KEY, JSON.stringify(currentUsers))
   },[currentUsers])
  function addCrewMember(){
    let member = memberRef.current

    if(member.value === "") return

    const initials = member.value.toString().split(/[,.\s]/)
 

    const user = {
      id: Date.now(),
      userName: member.value,
      userStatus: 0,
      userInit: initials.length > 1 ? initials[0].toString()[0].toUpperCase() + initials[1].toString()[0].toUpperCase() : member.value.toString()[0].toUpperCase(),
    }
    const newUsers = [...currentUsers, user]
    setCurrentUsers(newUsers)
    memberRef.current.value = ""

  }
  function increaseLevel(id){
    const newUsers = [...currentUsers]
    const user = newUsers.find(u => u.id === id)
    if(user.userStatus === 2 ) return
    if(user.userStatus >= 0 && user.userStatus < 2 ) user.userStatus = user.userStatus + 1;
    setCurrentUsers(newUsers);
  }

  function decreaseLevel(id){
    const newUsers = [...currentUsers]
    const user = newUsers.find(u => u.id === id)
    if(user.userStatus === 0 ) return
    if(user.userStatus <= 2 ) user.userStatus = user.userStatus - 1;
    setCurrentUsers(newUsers);
  }

  function deleteUser(id){
    const newUsers = [...currentUsers]
    newUsers.splice(newUsers.findIndex(u => u.id === id), 1);
    setCurrentUsers(newUsers);

  }


  return (
    <div className="App bg-neutral h-screen w-screen " data-theme="dark">
      <Navbar/>
      <div className='content flex justify-between bg-neutral items-center p-5 free flex-wrap sm:flex-nowrap'>
      
      <Card cardStyle="shadow-2xl border-black border text-white mx-2 w-full" title="Free team" subtitle={<form onSubmit={function(e) {e.preventDefault(); addCrewMember(e)}}><input type="text" ref={memberRef} className="w-3/4 m-auto outline-none font-bold bg-neutral-focus p-2" onSubmit={addCrewMember} placeholder="Lastname Firstname"/><Button color="btn-primary h-auto rounded-l p-1" type="submit" content="Add" onClick={addCrewMember}/></form>}>
     
        {currentUsers.map(user =>
          user.userStatus === 0 ? <User className="user"  userName={user.userName} userStatus={user.userStatus} userInit={user.userInit} key={user.id} userKey={user.id}  increaseLevel={increaseLevel} decreaseLevel={decreaseLevel} deleteUser={deleteUser}/> : <div key={user.id}></div>
          )}
          
      </Card>
      <Card cardStyle="shadow-2xl border-black border text-white mx-2 w-full busy" title="Busy team">
      {currentUsers.map(user =>
          user.userStatus > 0 ? <User className="user"userName={user.userName} userStatus={user.userStatus} userInit={user.userInit} key={user.id} userKey={user.id}  increaseLevel={increaseLevel} decreaseLevel={decreaseLevel} deleteUser={deleteUser}/> : <div key={user.id}></div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default App;
