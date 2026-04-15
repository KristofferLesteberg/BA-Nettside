import React, { useState } from 'react'


import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";

interface Measure {
        name: string,
        measure: string
    }


const Measurement = ({ productId }: { productId: string}) => {

    const [name, setName] = useState("")
    const [measure, setMeasure] = useState("")
    const [measurement, setMeasurement] = useState("")

    const [measureList, setMeasureList] = useState<Measure[]>([])
    const [showMeasures, setShowMeasures] = useState(false)


    const addMeasure = () => {
        setMeasureList([...measureList, { name: name, measure: measure + measurement } ])

        setMeasurement("")
        setMeasure("")
        setName("")
    
    }
 
  return (
    <div>  
        <label className='label'>Legg til målenheter</label><br />
        <div className="grid grid-cols-4 gap-3 mt-2">
            <input 
                className='input'
                type='text'
                value={name}
                placeholder='Navn...'
                onChange={(e) => setName(e.target.value)}
            />
                <input
                    className='input'
                    type='text'
                    value={measure}
                    placeholder='Mål...'
                    onChange={(e) => setMeasure(e.target.value)}
            />
            <select onChange={(e) => setMeasurement(e.target.value) }>
                <option value="">Velg målenhet</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="m">mm</option>
            </select>
            <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                    className='btn btn-outline bg-muted'
                    type='button'
                    onClick={() => addMeasure()}
                >
                    <IoIosAdd />
                </button>
                <button
                    className="btn btn-outline bg-muted"
                    type='button' 
                    onClick={() => setShowMeasures(!showMeasures)}
                >
                    {!showMeasures ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
            </div>
        </div>
        {showMeasures && (
            <div>
                
                {measureList.map((item, index) => (
                    <p key={index}>{`${item.name} ${item.measure}`}</p>
                ))}
            </div>
        )}

        

    </div>
  )
}

export default Measurement