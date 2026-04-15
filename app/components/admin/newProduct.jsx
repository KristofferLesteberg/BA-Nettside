"use client"
import React, { useState } from 'react'
import { prisma } from "../lib/prisma"
import { data } from 'autoprefixer'
import { headers } from 'next/headers'


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

    const handleForm = async (e) {
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
        />

    </form>
  )
}

export default newProduct