
 const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }

   const randomLower = () => {
    return String.fromCharCode(random(97, 122))
  }

   const randomUpper = () => {
    return String.fromCharCode(random(65, 90))
  }

   const randomSymbol = () => {
    const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>"
    return symbols[random(0, symbols.length - 1)]
  }

  //copy given text

 export const copyText=(password)=>{
    navigator.clipboard.writeText(password);

    //for reading the data from clipboard
    // navigator.clipboard.readText().then((data)=>{
    //  return data;
    // }).catch((err)=>console.log(err));
  
  }

  export const getPassword=(lowercase,passLength,uppercase,symbols,numbers)=>{
    let password = ''
    for (let i = 0; i < passLength; i++) {
      let choice = random(0, 3)
      if (lowercase && choice === 0) {
        password += randomLower()
      } else if (uppercase && choice === 1) {
        password += randomUpper()
      } else if (symbols && choice === 2) {
        password += randomSymbol()
      } else if (numbers && choice === 3) {
        password += random(0, 9)
      } else {
        i--
      }
    }

    return password;
  }

  export const strength=(length)=> {
   
    if(length>8){
       return 'STRONG';
    }

    else if(length>=6 && length<=8){
        return 'MEDIUM';
    }

    else if(length>=3 && length<=6){
        return 'WEAK';
    }

    else {
        return 'TOO WEAK'; 
    }
     
}