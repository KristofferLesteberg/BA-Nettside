"use client"

import { useState, useEffect, useRef } from "react"

type ImageEntry = {
  id: string
  url: string
}

export default function ImageTestPage() {
  const [images, setImages] = useState<ImageEntry[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function fetchImages() {
    const res = await fetch("/api/test-images")
    const data = await res.json()
    setImages(data)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/test-images", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? "Upload failed")
    } else {
      await fetchImages()
      if (fileInputRef.current) fileInputRef.current.value = ""
    }

    setUploading(false)
  }

  async function handleDelete(imageId: string) {
    const res = await fetch(`/api/test-images?id=${imageId}`, { method: "DELETE" })
    if (res.ok) await fetchImages()
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#f0f0f0",
      fontFamily: "'Courier New', monospace",
      padding: "3rem 2rem",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem", borderBottom: "1px solid #222", paddingBottom: "1.5rem" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#ff00dd", marginBottom: 8, textTransform: "uppercase" }}>
            Dev Tool
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            Image Upload Test
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#555" }}>
            All images are uploaded to product #1 (auto-created)
          </p>
        </div>

        {/* Upload */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#666", marginBottom: "1rem", textTransform: "uppercase" }}>
            Upload Image
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleUpload}
            disabled={uploading}
            style={{
              background: "#111",
              border: "1px solid #2a2a2a",
              color: "#f0f0f0",
              padding: "10px 14px",
              fontFamily: "inherit",
              fontSize: 13,
              cursor: "pointer",
              outline: "none",
              display: "block",
            }}
          />

          {uploading && (
            <div style={{ marginTop: 12, fontSize: 13, color: "#ff00dd" }}>
              ↻ Converting and saving...
            </div>
          )}
          {error && (
            <div style={{ marginTop: 12, fontSize: 13, color: "#ff5555", background: "#1a0000", padding: "8px 12px", border: "1px solid #330000" }}>
              ✕ {error}
            </div>
          )}
        </section>

        {/* Image grid */}
        <section>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#666", marginBottom: "1rem", textTransform: "uppercase" }}>
            Stored Images ({images.length})
          </div>

          {images.length === 0 ? (
            <div style={{ color: "#333", fontSize: 13, padding: "2rem", border: "1px dashed #1a1a1a", textAlign: "center" }}>
              No images yet
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
              {images.map(image => (
                <div key={image.id} style={{ background: "#111", border: "1px solid #1e1e1e" }}>
                  <div style={{ aspectRatio: "1", overflow: "hidden", background: "#161616" }}>
                    <img
                      src={image.url}
                      alt={image.id}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div style={{ padding: "8px 10px" }}>
                    <div style={{ fontSize: 9, color: "#444", marginBottom: 6, wordBreak: "break-all", lineHeight: 1.4 }}>
                      {image.id}
                    </div>
                    <button
                      onClick={() => handleDelete(image.id)}
                      style={{
                        background: "none",
                        border: "1px solid #2a2a2a",
                        color: "#666",
                        fontFamily: "inherit",
                        fontSize: 10,
                        padding: "4px 10px",
                        cursor: "pointer",
                        letterSpacing: "0.1em",
                        width: "100%",
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}