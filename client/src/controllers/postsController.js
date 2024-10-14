const getPosts = async () => {
  const res = await fetch('/api/posts')
  const data = await res.json()
  if (!res.ok) throw Error(data.error ?? data.msg)
  return data
}

const getUserPosts = async () => {
  const res = await fetch('/api/posts/user', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })

  const data = await res.json()
  if (!res.ok) throw Error(data.error ?? data.msg)
  return data
}

const createPost = async (title, body) => {
  if(!title || !body) throw Error('All fields are required')

  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  })

  const data = await res.json()
  if (!res.ok) throw Error(data.error ?? data.msg)
  return data
}

const updatePost = async (_id, title, body) => {
  if(!title || !body) throw Error('All fields are required')

  const res = await fetch(`/api/posts/${_id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  })

  const data = await res.json()
  if (!res.ok) throw Error(data.error ?? data.msg)
  return data
}

const deletePost = async (_id) => {
  const res = await fetch(`/api/posts/${_id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ _id })
  })

  const data = await res.json()
  if (!res.ok) throw Error(data.error ?? data.msg)
  return data
}

export { getPosts, getUserPosts, createPost, updatePost, deletePost }