"use client"
import { useState } from "react"




export default function Checkbox({ checked, callback }: {checked: boolean, callback: Function}) {

  return (
    
    <div
      onClick={() => callback()}  
      className={` flex flex-row ml-auto w-15 h-7 rounded-2xl border-2 cursor-pointer border-secondary
        ${checked ? 'bg-green-500' : 'bg-gray-400'}
        transition delay-100 duration-300 ease-in-out
      `}
      >
        <div className={`w-1/3 bg-white h-4/5 rounded-full mt-auto mb-auto ml-0.5 shadow shadow-grey-500
          transition delay-100 duration-300 ease-in-out
          transform ${checked ? 'translate-x-8' : 'translate-x-0'}
          `}
        >
        
        </div>
        
    </div>
    

  )
}