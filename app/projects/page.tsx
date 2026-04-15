/*import { prisma } from "../lib/prisma";


import React from 'react'

export const Test = () => {

    const createBuilding = async () => {
        const newBuilding = await prisma.product.create({
        data: {
            title: "Test",
            description: "fett bygg"
        }
    }) 
}
  return (
    
  )
}*/

export default function ProjectsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects Page</h1>
      <p>This is the projects page. You can add project listing and management features here.</p>
    </div>
  )
}
