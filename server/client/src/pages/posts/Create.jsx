import { useContext, useState } from 'react'
import { createPost } from '../../controllers/postsController'
import Alert from '../../components/Alert'
import { PostContext } from '../../contexts/PostContext'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const navigate = useNavigate()
  const { posts, setPosts } = useContext(PostContext)

  const [error, setError] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const data = await createPost(title, content)
      setPosts([...posts, data.post])
      navigate('/dashboard')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section className="card">
      <h1 className="title">Create a new post</h1>
      <form onSubmit={handleCreate}>
        <label htmlFor="Title">Post Title</label>
        <input 
          type="text" 
          id="title" 
          className="input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
        <label htmlFor="content">Post Content</label>
        <textarea
          name="content"
          id="content" className="input"
          value={content}
          onChange={e => setContent(e.target.value)}
        > </textarea>
        <button className="btn">Create</button>
      </form>
      {error && <Alert message={error}/>}
    </section>
  )
}

export default Create