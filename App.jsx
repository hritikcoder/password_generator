import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  const[length, setLenght] = useState(8)
  const[numAllow, setNumAllow] = useState(false)
  const[charAllow, setCharAllow] = useState(false)
  const[password, setPassword] = useState("")

  //using ref hook
  const passwordRef = useRef(null)


  //password generator function
  const passwordGenerator= useCallback(()=>{
    let pass =""
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllow) str += "0123456789"
    if(charAllow) str+= "!@#$%&()_[]{}\|<>/?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllow, charAllow])

//using function of useRef
  const copyPasswordToClipboard = useCallback( ()=>{
    passwordRef.current?.select()
    passwordRef.current.setSelectionRange(1, 100)
    window,navigator.clipboard.writeText(password)
  },[password])

//calling function of password generator in useEffect function
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllow, charAllow, passwordGenerator, setPassword])


return (
  <>
  {/* output field of password  */}
  <div className='w-full max-w-md mx-auto shadow-md rounded-lg pb-3 px-5 text-white'>
    <h1 className='text-white text-center mt-5'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input
      type='text'
      value={password}
      className='outline-none w-full bg-blend-color-burn text-black py-2 pb-4 px-3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
      <button
      onClick={copyPasswordToClipboard} 
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

  </div>

{/* input field of length */}
<div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1 '>
    <input
      type="range"
      min={6}
      color="blue"
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e) => {setLenght(e.target.value)}}
    />
    <label>Length: {length}</label>
  </div>

{/* input field of number */}
  <div className='flex items-center gap-x-1'>
    <input
      type="checkbox"
      defaultChecked={numAllow}
      id='numberInput'
      onChange={() => {
          setNumAllow((prev) => !prev);
      }}
    />
    <label htmlFor='numberInput'>Number</label>
  </div>


{/* input field of special character */}
  <div className='flex items-center gap-x-1'>
    <input
      type="checkbox"
      defaultChecked={charAllow}
      id='charInput'
      onChange={() => {
          setCharAllow((prev) => !prev);
      }}
    />
    <label htmlFor='charInput'>Spe. Character</label>
  </div>
</div>

  </div>


   </>
  )
}

export default App
