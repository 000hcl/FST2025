const CreateForm = ({ handleTitle, title, handleUrl, url, handleAuthor, author, handleCreate}) => {
    return(
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleCreate}>
                <div>
                    <label>
                        title
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitle}/>
                    </label>
                </div>
                <div>
                    <label>
                        author
                        <input
                            type="text"
                            value={author}
                            onChange={handleAuthor}/>
                    </label>
                </div>
                <div>
                    <label>
                        url
                        <input
                            type="text"
                            value={url}
                            onChange={handleUrl}/>
                    </label>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateForm