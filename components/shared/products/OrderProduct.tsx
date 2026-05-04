"use client"
import { useState } from "react"

export default function OrderProduct() {

    const [active, setActive] = useState<boolean>(false)

    return (
        <>
            <button onClick={() => setActive(!active)} className="btn btn-secondary w-full py-3 text-base">
                Bestill!
            </button>

            {active && (
                <div>test</div>
            )}
        </>
    )
}