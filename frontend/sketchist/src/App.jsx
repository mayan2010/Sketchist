import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select an image file')
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Sketchist - Image Processor</h1>

      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Upload & Process'}
        </button>
      </form>

      {preview && <img src={preview} alt="Preview" className="preview" />}

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
