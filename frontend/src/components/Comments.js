import { useState, useRef, useEffect } from "react";
import CommentAction from "./Comment-actions"
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";


const Comment = ({ 
    comment,
    handleInsertNode,
    handleEditNode,
    handleDeleteNode
}) => {
    const [input, setInput] = useState(""); // user input into the comment/replies box
    const [editMode, setEditMode] = useState(false); // editing comment/reply?
    const [showReplyInput, setShowReplyInput] = useState(false);  // reply prompt
    const [expand, setExpand] = useState(false); // expands the tree of reply 
    const inputRef = useRef(null) // editing comments will actually change them in a tree

    useEffect(() => {
        inputRef?.current?.focus(); 
    }, [editMode])

    const onAddComment = ({}) => {

        if (editMode) {
            handleEditNode(comment.id, inputRef?.current?.innerText)
        } else {
            setExpand(true);
            handleInsertNode(comment.id, input) // we need the parent comment id to insert
            // child comment after it 
            setShowReplyInput(false); 
            setInput("")
        }
        if (editMode) setEditMode(false); 
    }

    const handleNewComment = () => {
        setExpand(!expand)
        setShowReplyInput(true)
    }

    const handleDelete = () => {
        handleDeleteNode(comment.id)
    }

    return (
        <div>
            <div className={ comment.id === 1 ? "inputContainer" : "commentContainer"}>
                {comment.id === 1 ? ( // using this as the comment id for all comments
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
                ):(
                    <>
                        <span 
                            contentEditable={editMode}
                            suppressContentEditableWarning={editMode}
                            style={{ wordWrap: "break=word"}}
                            ref={inputRef}
                        >
                            {comment.name}
                        </span>

                         <div style={{display: "flex", margainTop: "5px"}}>
                            {editMode ? (
                                <>
                                    <CommentAction className="reply" type="SAVE" 
                                        handleClick={onAddComment}
                                    />
                                    <CommentAction className="reply" type="CANCEL" 
                                        handleClick={() => {
                                            inputRef.current.innerText = comment.name
                                            setEditMode(false); 
                                        }}
                                    /> 
                                </>
                            ):(
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
                         </div>
                    </>
                )}
            </div>
            <div style={{ display: expand ? "block" : "none", paddingLeft: 25}}>
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
                {comment?.items?.map((comment) => { //comments? "?" is for undefined comments
                    return (
                    <Comment 
                        key={comment.id} 
                        comment={comment}
                        handleInsertNode={handleInsertNode}
                        handleEditNode={handleEditNode}
                        handleDeleteNode={handleDeleteNode}
                    />)
                })}
            </div>
        </div>
    )
}

export default Comment;