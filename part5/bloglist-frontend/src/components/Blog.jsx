import { useState } from 'react'

const Blog = ({ blog, likeFunction }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div>
      {blog.title} {blog.author} <button onClick={toggleExpanded}>{ expanded ? 'hide' :'view'}</button>
      </div>
      {expanded &&
      <div>
        {blog.url}
        <br/>
        {blog.likes} likes <button onClick={()=>likeFunction(blog)}>like</button>
        <br/>
        {blog.user.name}
      </div>
      }
    </div>
    
  )
  
}

export default Blog