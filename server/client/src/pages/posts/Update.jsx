import { useContext, useState } from 'react'
import { updatePost } from '../../controllers/postsController'
import Alert from '../../components/Alert'
import { PostContext } from '../../contexts/PostContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Update = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  
  const { posts, setPosts } = useContext(PostContext)

  const [error, setError] = useState(null)
  const [title, setTitle] = useState(state.title)
  const [content, setContent] = useState(state.body)

  const handleUpdate= async (e) => {
    e.preventDefault()
    try {
      const data = await updatePost(state._id, title, content)
      navigate('/dashboard')
    } catch (error) {
      setError(error.message)
      console.log(error);
    }
  }

  return (
    <section className="card">
      <h1 className="title">Update your post</h1>
      <form onSubmit={handleUpdate}>
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
        <button className="btn">Update</button>
      </form>
      {error && <Alert message={error}/>}
    </section>
  )
}

export default Update