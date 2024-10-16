import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { deletePost, getUserPosts } from '../../controllers/postsController'
import { UserContext } from '../../contexts/UserContext'
import Alert from '../../components/Alert'
import Success from '../../components/Success'
import Post from '../../components/Post'

const Dashboard = () => {
  // Consume user context
  const { user, setUser } = useContext(UserContext)

  const [ loading, setLoading ] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    async function getPostsCallback() {
      const { userPosts, email } = await getUserPosts()
      setUser({ email, posts: userPosts })
      setLoading(false)
    }
     try {
      getPostsCallback()
     } catch (error) {
      console.log(error);
     }
    
  }, [])

  const handleDelete = async (_id) => {
    try {
      const data = await deletePost(_id)
      setSuccess(data.msg)
    } catch (error) {
      setError(error.msg)
    }

    const newPosts = user.posts.filter(post => post._id !== _id)
    setUser({...user, posts: newPosts})
  }

  return (
    <section className="card">
      <h1 className="title">My Posts</h1>
      { loading && <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>}
      { success && <Success message={success}/>}
      { error && <Alert message={error}/>}
      { user.posts && user.posts.map(post => (
        <div key={post._id}>
          <Post post={post}>
            <div className="flex items-center gap-2">
              <Link 
                className="fa-solid fa-pen-to-square nav-link text-indigo-400 hover:text-indigo-500"
                title="Update"
                to="/update-post"
                state={ post }
              />
              <button 
                className="fa-solid fa-trash-can nav-link text-red-400 hover:text-red-500"
                title="Delete"
                onClick={() => handleDelete(post._id)}
              ></button>
            </div>
          </Post>
        </div>
      )) }
    </section>
  )
}

export default Dashboard