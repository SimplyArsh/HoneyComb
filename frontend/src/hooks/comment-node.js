import { useAuthContext } from '../hooks/use-auth-context'

const useNode = () => {

    const { user } = useAuthContext()

    const updateLocalNodeRecursively = (tree, commentId, newItem) => {
        if (tree._id === commentId) {
            tree.comments = [...tree.comments, newItem]
            return tree
        }

        /* if the commentId does not match, then recursivley search the tree to
            find the direct parent */
        let latestNode = []; // the new node to be added
        latestNode = tree?.comments?.map((object) => {
            return updateLocalNodeRecursively(object, commentId, newItem)
        })
        /* tree.items.push alters the local tree passed in,
        when tree is returned,  */
        return { ...tree, comments: latestNode }
    }

    const insertNode = async (tree, parentSelector, commentId, item) => {

        // console.log("Inserting a new node: ", tree, parentSelector, commentId, item)
        /* checks to see if the commentId matches the tree passed in
            (i.e. its in the first layer of replies to the comment)
        */
        if (item.length === 0) {
            return tree
        }

        try {
            const response = await fetch('/api/post/addComment?'
                + new URLSearchParams({
                    "parentCommentId": commentId,
                    "idSelect": parentSelector // 0 if reply to a comment
                }), {
                headers: { // include token in header
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
                body: JSON.stringify({
                    "comment": item
                }),
                method: "POST"
            })
            const newItem = await response.json()
            // console.log(newItem)

            if (parentSelector === 1) {
                tree.comments.push(newItem)
                return tree
            } else {
                return updateLocalNodeRecursively(tree, commentId, newItem)
            }

        } catch (error) {
            console.log(error)
        }

    }

    const editLocalNodeRecursively = (tree, commentId, newItem) => {

        console.log("in recursion")
        if (tree._id === commentId) {
            tree.comment = newItem
            return tree
        }

        /* if the commentId does not match, then recursivley search the tree to
            find the direct parent */
        tree?.comments?.map((object) => {
            editLocalNodeRecursively(object, commentId, newItem)
        })
        /* tree.items.push alters the local tree passed in,
        when tree is returned,  */
        return { ...tree }
    }

    const editNode = async (tree, commentId, value) => {

        if (value.length === 0) {
            return tree
        }

        try {
            const response = await fetch('/api/post/editComment', {
                headers: { // include token in header
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
                method: 'PATCH',
                body: JSON.stringify({
                    id: commentId,
                    editedComment: value
                })
            })
            const res = await response.json()
            console.log(res)

            return editLocalNodeRecursively(tree, commentId, value)

        } catch (error) {
            console.log(error)
        }

    }

    const deleteLocalCommentsRecursively = (tree, id) => {
        for (let i = 0; i < tree.comments.length; i++) {
            const currentItem = tree.comments[i];
            if (currentItem._id === id) {
                tree.comments.splice(i, 1);
                // console.log("PRINTING TREE FROM INSIDE: ", tree)
                return tree;
            } else {
                deleteLocalCommentsRecursively(currentItem, id);
            }
        }
        // console.log("PRINTING TREE: ", tree)
        return tree
    }

    const deleteNode = async (tree, commentId, parentPostId) => {
        /* loops through all the comments in the layer, and checks
        if id of "desired delete" comment matches;
        if id matches then it splices that branch;
        if id not matched then it recursively goes through the sublayers
        of that particular comment (i.e. it's replies)  */
        try {
            // const response = await fetch('/api/post/deleteComment?'
            //     + new URLSearchParams({
            //         "commentId": commentId,
            //         "postParentId": parentPostId
            //     }), {
            //     headers: { // include token in header
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Bearer ' + user.token,
            //     },
            //     method: "PATCH"
            // })
            //const res = await response.json() // without this call, code never reaches deleteLocalPart. I don't understand fetch well enough to know it's rejection process
            return deleteLocalCommentsRecursively(tree, commentId)

        } catch (error) {
            console.log(error)
        }
    }

    return { insertNode, editNode, deleteNode }
}

export default useNode