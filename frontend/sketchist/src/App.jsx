import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // Validate file upload type
  const validateFileType = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png']
    const fileType = file?.type || ''
    if (allowedTypes.includes(fileType)) return true

    // Fallback: check file extension when MIME type is missing/incorrect
    const ext = file?.name?.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png'].includes(ext)) return true

    throw new Error('Invalid file type. Please upload a JPEG or PNG image.')
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      try {
        validateFileType(selectedFile)
        setFile(selectedFile)
        setPreview(URL.createObjectURL(selectedFile))
        setError(null)
      } catch (err) {
        setError(err.message)
        setFile(null)
        setPreview(null)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select an image file')
      return
    }

    // Validate again before uploading
    try {
      validateFileType(file)
    } catch (err) {
      setError(err.message)
      return
    }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', file.name.split('.').pop())
    

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setResult(response.data)
    } catch (err) {
      console.log(">>>>>>>", err)
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
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Upload & Process'}
        </button>
      </form>

      {preview && <img src={preview} alt="Preview" className="preview" onError={() => { setError('Unable to preview image. Please upload a valid PNG or JPEG.'); setPreview(null); setFile(null); }} />}

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h2>Result:</h2>
          {console.log(result)}
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
