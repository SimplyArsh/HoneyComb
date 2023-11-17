import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// format for post displays
const PostDetails = ({ editable, post, handleEdit, handleDelete }) => ( // if editable, add edit and delete buttons. Otherwise, don't add them
    <div className="postDetails">
        <h4>{post.postName}</h4>
        <p><strong>Description: </strong>{post.description}</p>
        <p><strong>Skills: </strong>{post.skills}</p>
        <p><strong>Number of likes: </strong>{post.numberOfLikes}</p>
        <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
        {editable && <div className="icon-container">
            <span className="material-symbols-outlined" onClick={() => { handleEdit(post) }}>edit</span>
            <span className="material-symbols-outlined" onClick={() => { handleDelete(post._id) }}>delete</span>
        </div>}
    </div>
)

export default PostDetails