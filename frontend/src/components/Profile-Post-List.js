import { useAuthContext } from '../hooks/use-auth-context';
import { useProfileContext } from '../hooks/use-profile-context';
import { useEffect } from 'react';
import PostEditDetails from "./Post-Edit-Details";
import PostDetails from "./Post-Details"

const ProfilePostList = ({ id, completed }) => { // if id is null, user is looking at their own profile. Otherwise, user is looking at another person's webpage
    const { user } = useAuthContext()
    const { editPostId, editFormData, currentPosts, completedPosts, dispatch } = useProfileContext()

    useEffect(() => { // runs when page refreshes or when its dependencies change
        if (!user) {
            console.log("You must be logged in");
            return;
        }

        let response

        // Get post data from the backend
        const fetchPosts = async () => {
            if (id == null) { // user is looking at their own webpage
                try {
                    response = await fetch('/api/post/', {
                        headers: { // include token in header
                            'Authorization': 'Bearer ' + user.token,
                        },
                    });

                    if (!response.ok) {
                        console.log(response)
                        return
                    }


                } catch (error) {
                    return error;
                }
            } else { // user is looking at someone else's webpage
                try {
                    response = await fetch('/api/post/user/' + id, {
                        headers: { // include token in header
                            'Authorization': 'Bearer ' + user.token,
                        },
                    });

                    if (!response.ok) {
                        console.log(response)
                        return
                    }


                } catch (error) {
                    return error;
                }
            }

            const fetchedPosts = await response.json();

            // Set profile context 
            dispatch({ type: 'SET_CURRENT_POSTS', payload: fetchedPosts.filter(post => post.completed === false) })
            dispatch({ type: 'SET_COMPLETED_POSTS', payload: fetchedPosts.filter(post => post.completed === true) })
            dispatch({ type: 'SET_NUMBER_OF_POSTS' })
        };

        fetchPosts()

    }, [user, completed, dispatch, editPostId, id]);


    // handle deleting posts
    const handleDelete = async (id) => {
        id = id.toString()

        // Delete post in the backend
        const response = await fetch('/api/post/' + id, {
            headers: { // include token in header
                'Authorization': 'Bearer ' + user.token,
            },
            method: 'DELETE'
        })

        if (!response.ok) {
            console.log(response)
            return
        }

        // Update profile context about delete post
        dispatch({ type: 'DELETE_POST', payload: { _id: id } })
        dispatch({ type: 'SET_NUMBER_OF_POSTS' })
    }

    // handle the editing of the form
    const handleEdit = async (post) => {
        // Update profile context
        dispatch({ type: 'SET_EDIT_POST_ID', payload: post._id })
        dispatch({
            type: 'SET_EDIT_FORM_DATA', payload: {
                postName: post.postName,
                description: post.description,
                skills: post.skills,
                numberOfLikes: post.numberOfLikes,
            }
        })
    }

    // Handle form data change
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        // Update profile context
        dispatch({
            type: 'SET_EDIT_FORM_DATA', payload: {
                ...editFormData,
                [name]: value,
            }
        })
    };

    // Handle the submission of the edit form
    const handleSave = async (e) => {
        e.preventDefault();

        // Call API to update the post
        const response = await fetch('/api/post/' + editPostId, {
            headers: { // include token in header
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
            },
            body: JSON.stringify(editFormData),
            method: 'PATCH'
        })

        if (!response.ok) {
            console.log(response)
            return
        }

        // Reset editing state
        dispatch({ type: 'SET_EDIT_POST_ID', payload: null })
    };

    // Handle the cancelling of the edit form
    const handleCancel = async (e) => {
        dispatch({ type: 'SET_EDIT_POST_ID', payload: null })
    }

    if (completed) { // display completed posts
        return (
            <div className="profilePagePosts">
                <h1>Completed Posts:</h1>
                {completedPosts && completedPosts.map((post) => {
                    if (editPostId === post._id) { // editing post format
                        return ( // if id == null, user is accessing their own webpage, so they can edit their posts
                            <PostEditDetails key={post._id} handleSave={handleSave} editFormData={editFormData} handleFormChange={handleFormChange} handleCancel={handleCancel} />
                        );
                    } else { // normal post format
                        return (
                            <PostDetails post={post} key={post._id} editable={(id == null)} handleEdit={handleEdit} handleDelete={handleDelete} />
                        )
                    }


                })}
            </div>
        )
    }

    if (!completed) { // display completed posts
        return (
            <div className="profilePagePosts">
                <h1>Current Posts:</h1>
                {currentPosts && currentPosts.map((post) => {
                    if (editPostId === post._id) { // editing post format
                        return ( // if id == null, user is accessing their own webpage, so they can edit their posts
                            <PostEditDetails key={post._id} handleSave={handleSave} editFormData={editFormData} handleFormChange={handleFormChange} handleCancel={handleCancel} />
                        );
                    } else { // normal post format
                        return (
                            <PostDetails post={post} key={post._id} editable={(id == null)} handleEdit={handleEdit} handleDelete={handleDelete} />
                        )
                    }
                })}
            </div>
        )
    }
}

export default ProfilePostList;