"use client"

import React, { useState } from 'react'

const newProduct = () => {

    const [educationField, setEducationField] =  useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [measures, setMeasures] = useState({
        "height": 0,
        "widht": 0,
        "length": 0
    })
    const [amount, setAmount] = useState(0)
    const [image, setImage] = useState("")

    const handleForm = async (e: any) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("educationField", educationField.toString())
        formData.append("title", title)
        formData.append("description", description)
        formData.append("price", price.toString())
        formData.append("measures", JSON.stringify(measures))
        formData.append("amount", amount.toString())
        formData.append("image", image)
    
        const postRequest = {
            method: "POST",
            body: formData
        }
        
        const respons = await fetch("/api/product", postRequest)
        if(!respons.ok) { console.error() }
    }
return (
    <form onSubmit={handleForm}>
        <section>
            <option value=""></option>
            <option value=""></option>
        </section>
        {/*TITLE*/}
        <p>Tittel</p>
        <input
            type="text" 
            placeholder="Produkt navn"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        {/*DESCRIPTION*/}
        <p>Beskrivelse</p>
        <textarea 
            placeholder='Beskriv produkt'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        
        {/*PRICE*/}
        <p>Pris</p>
        <input
            type="number" 
            placeholder="Pris"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        {/*AMOUNT*/}
        <p>antall</p>
        <input
            type="number" 
            placeholder="Antall"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        {/*IMAGE*/}
        <p>Bilder:</p>
        <input
            type="file" 
            placeholder="Bilde"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />

        <button type='submit'>Opprett annonse</button>
    </form>
  )
}

export default newProduct