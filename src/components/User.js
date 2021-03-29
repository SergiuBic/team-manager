import {React} from 'react'
import Button from './Button'
import { Animate } from "react-simple-animate";


export default function User(props) {
    const {userName, userStatus, userInit, userKey, increaseLevel,decreaseLevel,deleteUser} = props;
    
  
    function handleIncreaseLevel(){
        increaseLevel(userKey)
       
    }
    function handleDecreaseLevel(){
        decreaseLevel(userKey)
       
    }
    function handleDeleteUser(){
        deleteUser(userKey)
       
    }
    function getBadge(status){
        if(status === 0) return 'badge-success'
        if(status === 1) return 'badge-warning'
        if(status === 2) return 'badge-error'
    }
    function getStatus(status){
        if(status === 0) return 'FREE'
        if(status === 1) return 'Busy'
        if(status === 2) return 'Very Busy'
    }
    
    return (
     <Animate play start={{ opacity: 0, marginTop: -500}} end={{ opacity: 1, marginTop: 0}} duration={.5}>     
        <div className="border-white border rounded-xl w-auto h-auto m-2 fade flex-initial" style={props}>
        <ul className="accordion w-64 accordion-bordered accordion-arrow">
        
        <li className="accordion-item">
          <input id={userKey} type="checkbox"/> 
          <label htmlFor={userKey} className="text-md font-medium accordion-title">
          {userInit} | <div className={`badge ${getBadge(userStatus)}`}>{getStatus(userStatus)}</div>
        </label> 
          <div className="accordion-body flex flex-row flex-wrap space-x-2 space-y-0">
            <div className="font-bold text-sm">{userName}</div> 
           <div>|</div> 
           <Button color="btn-info" content="+" onClick={handleIncreaseLevel}/>
           <Button color="btn-info" content="-" onClick={handleDecreaseLevel}/>

           <div>|</div> 

           <Button color="btn-error" content="X" onClick={handleDeleteUser}/>
           
          </div>
        </li> 
        
      </ul>
      </div> 
   
      </Animate>
    )
}
