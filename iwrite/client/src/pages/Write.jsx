import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate , useNavigate} from "react-router-dom"
import axios from "../axios"
import { useParams } from "react-router-dom"

function Write() {

  const user = useSelector((state) => state.auth.data)

  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [poster, setPoster] = useState("")
  const inputRef = useRef(null)

  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const isUpdate = Boolean(id)

  const handleFile = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append("story-poster", file)
            const { data } = await axios.post("/poster", formData)
            setPoster(data.URL)

        } catch (error) {
            console.log(error)
        }
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        setLoading(true)
        isUpdate 
            ? await axios.put(`/api/stories/${id}`, { title, text, poster})
            : 
            await axios.post("/api/stories", { title, text, poster})

            navigate("/")
    } catch (error) {
        console.log(error)
    }
  }

  const handleRemove = () => {
     setPoster("")
  }

  useEffect(() => {
        if(id){
            axios.get(`/api/stories/${id}`)
                .then(({ data }) => {
                    setTitle(data.title)
                    setText(data.text)
                    setPoster(data.poster)
                })
                .catch((error) => {
                    console.log(error)
                })
                
        }
    }, [id])

  if(!user && !window.localStorage.getItem("token")) {
        window.alert("You should login first!")
        return <Navigate to="/login" />
  }


  return (
      <div className="container-lg my-5">
          <div className="row justify-content-center">
              <div className="col-lg-8">
                  <div className="text-center">
                      <h2 className="fw-bold mb-5">Write Your Story</h2>
                  </div>
              </div>
          </div>

          <div className="row justify-content-center text-center">

              <form onSubmit={handleSubmit} encType="multipart/form-data" >

                {poster && (
                    <div className="d-flex flex-column mb-3">
                        <div className="mb-3">
                            <button className="btn btn-danger" onClick={handleRemove}>Remove</button>
                        </div>
                        <div className="mb-3">
                            <img src={`http://localhost:5000/${poster}`} alt="poster" width={200} height={300} />
                        </div>
                    </div>
                )}

                  <div className="mb-5 rounded">
                      <input name="story-poster" type="file" ref={inputRef} onChange={handleFile} hidden />
                      <button className="btn btn-secondary" onClick={(e) => {
                        e.preventDefault()
                        inputRef.current.click()
                      }}>Upload Image</button>
                  </div>

                  <div className="mb-3 rounded">
                      <input type="text" placeholder="Title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>

                  <div className="mb-3 rounded">
                      <textarea rows="20" cols="50000" placeholder="Story" className="form-control" value={text} onChange={(e) => setText(e.target.value)} required ></textarea>
                  </div>

                  <div className="mb-3 rounded">
                      <button type="submit" className="btn btn-primary">Publish</button>
                  </div>

              </form>
          </div>

      </div>
  )
}

export default Write