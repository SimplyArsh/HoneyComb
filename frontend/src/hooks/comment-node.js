const useNode = () => {
    const insertNode = function (tree, commentId, item) {

        /* checks to see if the commentId matches the tree passed in
            (i.e. its in the first layer of replies to the comment)
         */
        if (tree.id === commentId) {
            tree.items.push({
                id: new Date().getTime(), //we fucked if two users add comment in the same millisecond
                name: item,
                items: []
            })
            return tree
        }
        
        /* if the commentId does not match, then recursivley search the tree to
            find the direct parent */
        let latestNode = []; // the new node to be added
        latestNode = tree?.items?.map((object) => {
            return insertNode(object, commentId, item)
        })
        /* tree.items.push alters the local tree passed in,
        when tree is returned,  */
        return { ...tree, items: latestNode } 
    }

    const editNode = (tree, commentId, value) => {
        /* if commentId matches the tree.id, then we have found the right comment
        to edit */
        if (tree.id === commentId) {
            tree.name = value
            return tree
        }
        /* else search for the right comment recursivley 
        no need for latestNode here because we are merely updating the value*/
        tree.items.map((object) => {
            return editNode(object, commentId, value)
        })
        /* if node id is not found, then just returns the unedited node */
        return { ...tree }
    }

    const deleteNode = (tree, id) => {
        /* loops through all the comments in the layer, and checks
        if id of "desired delete" comment matches;
        if id matches then it splices that branch;
        if id not matched then it recursively goes through the sublayers
        of that particular comment (i.e. it's replies)  */
        for (let i = 0; i < tree.items.length; i++) {
            const currentItem = tree.items[i];
            if (currentItem.id == id) {
                tree.items.splice(i, 1);
                console.log("here")
                return tree; 
            } else {
                deleteNode(currentItem, id);
            }
        }
        return tree
    }

    return { insertNode, editNode, deleteNode }
}

export default useNode