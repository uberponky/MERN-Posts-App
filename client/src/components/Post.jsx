import React from 'react'

const Post = ({ post, children }) => {
  console.log(post);
  
  return (
    <div className="mb-4">
      <div className="flex items-start justify-between">
        <div>
            <h2 className="font-bold text-lg text-indigo-600 first-letter:uppercase">{post.title}</h2>
            <p className="text-[10px] text-slate-500">{new Date(post.createdAt).toLocaleDateString()}{post.email ? ` - ${post.email}` : null}</p>
        </div>
        <div>
          {children}
        </div>
      </div>
      <p className="text-sm mt-2">{post.body}</p>
      <div className="h-px w-full bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 mt-3"></div>
    </div>
  )
}

export default Post