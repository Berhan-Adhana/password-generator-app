import React, {useState,useRef, useEffect} from 'react'
import CopyIcon from '../../assets/images/icon-copy.svg'
import Toast from '../../components/toast/Toast.jsx';
import { getPassword, strength,copyText} from '../../utility/helper'
import './password-generator.scss'

const PasswordGenerator = () => {
  const [password,setPassword]=useState('PTx1f5DaFX1');
  const [passLength,setPassLength]=useState(8);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const [errors, setErrors] = useState({});
  const [showToast,setShowToast]=useState(false);
  
  const firstChild=useRef();
  const secondChild=useRef();
  const thirdChild=useRef();
  const fourthChild=useRef();

const generatePassword=()=> {
    setErrors({})
    if (!uppercase && !lowercase && !numbers && !symbols) {
      return setErrors('Nothing Selected');
    } else if (passLength <5) {
      return setErrors('Password Length must be greater than 4');
    } 
    else if (!numbers) {
      return setErrors('Password Must Include Numbers');
    } 
    setPassword(getPassword(lowercase,passLength,uppercase,symbols));
  }

  useEffect(()=>{
    setStrength();
  },[passLength]);


  const displayToast=()=>{
    setShowToast(true);
    setTimeout(()=>{
      setShowToast(false);
    },1000);
  }

const setStrength=()=>{
  if(strength(passLength)==='STRONG')
  {
    firstChild.current.style.backgroundColor='#A4FFAF';
    secondChild.current.style.backgroundColor='#A4FFAF'; 
    thirdChild.current.style.backgroundColor='#A4FFAF';
    fourthChild.current.style.backgroundColor='#A4FFAF';
  }
  if(strength(passLength)==='MEDIUM')
  {
    firstChild.current.style.backgroundColor='#F8CD65';
    secondChild.current.style.backgroundColor='#F8CD65'; 
    thirdChild.current.style.backgroundColor='#F8CD65';
    fourthChild.current.style.backgroundColor='black';
  }
  if(strength(passLength)==='WEAK')
  {
    firstChild.current.style.backgroundColor='#FB7C58';
    secondChild.current.style.backgroundColor='#FB7C58'; 
    thirdChild.current.style.backgroundColor='black';
    fourthChild.current.style.backgroundColor='black';
  }
  if(strength(passLength)==='TOO WEAK')
  {
    firstChild.current.style.backgroundColor='#F64A4A';
    secondChild.current.style.backgroundColor='black'; 
    thirdChild.current.style.backgroundColor='black';
    fourthChild.current.style.backgroundColor='black';
  }
}
  return (
    <div className="App">
    <Toast show={showToast}/>
     <div className="password-gerenator">
       <p>Password Generator</p>
       <div className="container">
         <div className="display">
           <p>{password}</p>
           <img src={CopyIcon} alt="" 
              onClick={()=>{
              copyText(password);
              displayToast();
            }
              }/>
         </div>
         <div></div>
         <div className="main">
           <div>
             <p>Character Length</p>
             <span className='no-of-characters'>{passLength}</span>
           </div>
           <input className='length' type="range" name="length" id="length"  min={0} max={10} onChange={(e)=>{setPassLength(e.target.value)}}/>
           <ul>
             <li>
               <input className='input' type="checkbox" checked={uppercase} name="uppercase" id="uppercase" onChange={(value)=>{setUppercase(!uppercase)}} /> <span>Include Uppercase Letters</span>
             </li>
             <li>
               <input  className='input'  type="checkbox" checked={lowercase} name="lowercase" id="lowercase" onChange={(value)=>{setLowercase(!lowercase)}}/> <span>Include Lowercase Letters</span>
             </li>
             <li>
               <input className='input'  type="checkbox" checked={numbers} name="numbers" id="numbers" onChange={(value)=>{setNumbers(!numbers)}}/> <span>Include Numbers Letters</span>
             </li>
             <li>
               <input  className='input' type="checkbox" name="symbols" checked={symbols} id="symbols" onChange={(value)=>{setSymbols(!symbols)}}/> <span>Include Symbols Letters</span>
             </li>
           </ul>
           {errors.length && <li className='error'>{errors}</li>}
           <div className="strength">
             <p>STRENGTH</p>
             <div>
               <p>{strength(passLength)}</p> 
               
               <span>
              
                
                 <span ref={firstChild}></span>
                 <span ref={secondChild}></span>
                 <span ref={thirdChild}></span>
                 <span ref={fourthChild}></span>
               </span>
               
               </div>
           </div>
           <button className='btn' onClick={generatePassword}>GENERATE <span>-></span></button>
         </div>

       </div>
     </div>
     
   </div>
  )
}

export default PasswordGenerator