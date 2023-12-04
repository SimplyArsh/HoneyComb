import { useState, useRef, useEffect } from "react";
import CommentAction from "./Comment-actions"
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";
import { formatDistanceToNow } from 'date-fns';


const Comment = ({
    comment,
    handleInsertNode,
    handleEditNode,
    handleDeleteNode,
    userId,
}) => {
    const [input, setInput] = useState(""); // user input into the comment/replies box
    const [editMode, setEditMode] = useState(false); // editing comment/reply?
    const [showReplyInput, setShowReplyInput] = useState(false);  // reply prompt
    const [expand, setExpand] = useState(comment._id === 1); // expands the tree of reply 
    const inputRef = useRef(null) // editing comments will actually change them in a tree
    const editable = userId === comment.user_id

    // formatting the time to be more user-friendly
    var formattedDate = null
    if (comment.date !== null) {
        const originalDate = new Date(comment.date);
        formattedDate = formatDistanceToNow(originalDate, { addSuffix: true });
    }

    useEffect(() => {
        inputRef?.current?.focus();
    }, [editMode])

    const onAddComment = ({ }) => {

        if (editMode) {
            handleEditNode(comment.id, inputRef?.current?.innerText)
        } else {
            setExpand(true);
            handleInsertNode(comment._id, input) // we need the parent comment id to insert
            // child comment after it 
            // setShowReplyInput(false); 
            setInput("")
        }
        if (editMode) setEditMode(false);
    }

    const handleNewComment = () => {
        setExpand(!expand)
        setShowReplyInput(true)
    }

    const handleDelete = () => {
        handleDeleteNode(comment._id)
    }

    return (
        <div>
            <div className={comment._id === 1 ? "inputContainer" : "commentContainer"}>
                {comment._id === 1 ? ( // using this as the comment id for all comments
                    // esenitally all comments are listed within comment id one
                    <>
                        <input
                            type="text"
                            className="inputContainer__input first_input"
                            autoFocus
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="comment..."
                        />
                        <CommentAction
                            className="reply comment"
                            type="COMMENT"
                            handleClick={onAddComment}
                        />
                    </>
                ) : (
                    <>
                        <div>{comment.username} {formattedDate}</div>
                        <div style={{
                            border: "none",
                            outline: "none"
                        }}>
                            <span
                                contentEditable={editMode}
                                suppressContentEditableWarning={editMode}
                                style={{
                                    wordWrap: "break=word"
                                }}
                                ref={inputRef}
                            >
                                {comment.comment}
                            </span>
                        </div>
                        <div style={{ display: "flex", margainTop: "5px" }}>
                            {editMode ? (
                                <>
                                    <CommentAction className="reply" type="SAVE"
                                        handleClick={onAddComment}
                                    />
                                    <CommentAction className="reply" type="CANCEL"
                                        handleClick={() => {
                                            inputRef.current.innerText = comment.comment
                                            setEditMode(false);
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <CommentAction
                                        className="reply"
                                        type={
                                            <>
                                                {expand ? (
                                                    <UpArrow width="10px" height="10px" />
                                                ) : (
                                                    <DownArrow width="10px" height="10px" />
                                                )}{" "}
                                                REPLY
                                            </>
                                        }
                                        handleClick={handleNewComment}
                                    />
                                    {editable && (
                                        <>
                                            <CommentAction
                                                className="reply"
                                                type="EDIT"
                                                handleClick={() => {
                                                    setEditMode(true);
                                                }}
                                            />
                                            <CommentAction
                                                className="reply"
                                                type="DELETE"
                                                handleClick={handleDelete}
                                            />
                                        </>
                                    )}

                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
                {showReplyInput && (
                    <div className="inputContainer">
                        <input
                            type="text"
                            className="inputContainer__input first_input"
                            autoFocus
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="comment..."
                        ></input>
                        <CommentAction
                            className="reply"
                            type="REPLY"
                            handleClick={onAddComment}
                        />
                        <CommentAction
                            className="reply"
                            type="CANCEL"
                            handleClick={() => {
                                setShowReplyInput(false);
                            }}
                        />
                    </div>
                )}
                {comment?.comments?.map((comment) => { //comments? "?" is for undefined comments
                    return (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            handleInsertNode={handleInsertNode}
                            handleEditNode={handleEditNode}
                            handleDeleteNode={handleDeleteNode}
                            userId={userId}
                        />)
                })}
            </div>
        </div>
    )
}

export default Comment;