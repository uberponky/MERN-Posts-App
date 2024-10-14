import { useState, useEffect, useContext } from 'react'
import { getPosts } from '../../controllers/postsController'
import { PostContext } from '../../contexts/PostContext'
import Post from '../../components/Post'

const Home = () => {
  const { posts, setPosts } = useContext(PostContext)

  // Loading state
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    async function getPostsCallback() {
      const data = await getPosts()
      setPosts(data.posts)
      setLoading(false)
    }

    getPostsCallback()
  }, [])

  return (
    <section className="card">
      <h1 className="title">Latest Posts</h1>
      { loading && <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>}
      { posts && posts.map(post => (
        <div key={post._id}>
          <Post post={post}/>
        </div>
        )
      )}
    </section>
  )
}

export default Home