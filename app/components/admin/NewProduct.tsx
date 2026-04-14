"use client"

import React, { useState } from 'react'

const NewProduct = () => {

    const [educationField, setEducationField] =  useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [measures, setMeasures] = useState({
        "height": 0,
        "width": 0,
        "length": 0
    })
    const [amount, setAmount] = useState(0)
    const [image, setImage] = useState<File | null>(null)

    const handleForm = async (e: any) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("educationField", educationField.toString())
        formData.append("title", title)
        formData.append("description", description)
        formData.append("price", price.toString())
        formData.append("measures", JSON.stringify(measures))
        formData.append("amount", amount.toString())
        formData.append("image", image as File)
    
        const postRequest = {
            method: "POST",
            body: formData
        }
        
        const respons = await fetch("/api/products", postRequest)
        if(!respons.ok) { 
            console.error(respons.json())
        }
    }
return (
    <form onSubmit={handleForm}>
        <select name='Klasse' onChange={(e) => setEducationField(e.target.value)}>

            <option value="BYGG">Bygg</option>
            <option value="ANNLEGG">Annlegg</option>
            
        </select>
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
            value={price || 0}
            onChange={(e) => setPrice(parseInt(e.target.value))}
        />
        {/*AMOUNT*/}
        <p>antall</p>
        <input
            type="number" 
            placeholder="Antall"
            value={amount || 0}
            onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        {/*IMAGE*/}
        <p>Bilder:</p>
        <input
            type="file" 
            placeholder="Bilde"
            
            onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button type='submit'>Opprett annonse</button>
    </form>
  )
}

export default NewProduct