// format for post edits
const PostEditDetails = ({ handleSave, editFormData, handleFormChange, handleCancel }) => (
    <div className="postDetails">
        <form onSubmit={handleSave}>
            <h4>Name:</h4>
            <input
                name="postName"
                value={editFormData.postName}
                onChange={handleFormChange}
            />
            <h4>Description:</h4>
            <textarea
                name="description"
                value={editFormData.description}
                onChange={handleFormChange}
            />
            <h4>Skills:</h4>
            <input
                name="skills"
                value={editFormData.skills}
                onChange={handleFormChange}
            />
            <button type="submit">Save</button>
        </form>
        <span className="material-symbols-outlined" onClick={handleCancel}>cancel</span>
    </div>
)

export default PostEditDetails