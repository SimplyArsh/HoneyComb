import React from "react";

const CommentAction = ({ handleClick, type, className}) => {
    return (<div className={className} onClick={handleClick}>
        {type}
    </div>)
}

export default CommentAction; 