"use client"
import React, { useState } from 'react'

const newProduct = () => {

    const [educationField, setEducationField] =  useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [measures, setMesures] = useState({
        "height": 0,
        "widht": 0,
        "length": 0
    })
    const [amount, setAmount] = useState(null)

    const handleForm = async (e: any) => {
        e.preventDefault()

        const postRequest = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                educationField: educationField,
                title: title,
                description: description,
                price: price,
                measures: measures,
                amount: amount
            })
        }
        const data = await fetch('/api/products', postRequest)
    }

return (
    <form onSubmit={handleForm}>
    
        <input
            type="text" 
            placeholder="Produkt navn"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
            placeholder='Beskriv produkt'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        <input
            type="number" 
            placeholder="Pris"
            value={price.toString()}
            onChange={(e) => setTitle(e.target.value)}
        />
        <input
            type="text" 
            placeholder="Produkt navn"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
    </form>
  )
}

export default newProduct