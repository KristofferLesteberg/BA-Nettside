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
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card  w-1/2 h-2/3 z-50">
                    <div>
                        <div className="btn btn-primary" onClick={() => setActive(false)}>X</div>
                    </div>
                </div>
            )}
        </>
    )
}