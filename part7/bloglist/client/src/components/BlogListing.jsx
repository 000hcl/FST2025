import { Listing } from './StyledComponents'

const BlogListing = ({ blog }) => {

  return (
    <div data-testid="blog">
      <Listing href={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Listing>
    </div>
  )
}

export default BlogListing
