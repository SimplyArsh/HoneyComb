import { useAuthContext } from '../hooks/use-auth-context';
import { useProfileContext } from '../hooks/use-profile-context';
import { useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProfilePostList = ({ postList, completed }) => {
    const { user } = useAuthContext();
    const { currentPosts, completedPosts, dispatch } = useProfileContext();

    useEffect(() => {
        if (!user) {
            console.log("You must be logged in");
            return;
        }

        let response
        const fetchPosts = async () => {
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

            const fetchedPosts = await response.json();

            dispatch({ type: 'SET_CURRENT_POSTS', payload: fetchedPosts.filter(post => post.completed === false) })
            dispatch({ type: 'SET_COMPLETED_POSTS', payload: fetchedPosts.filter(post => post.completed === true) })
        };

        fetchPosts()

    }, [user, postList, completed, dispatch]);

    const handleDelete = async (id) => {
        id = id.toString()
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

        dispatch({ type: 'DELETE_POST', payload: { _id: id } })
    }

    const handleEdit = async (id) => {

    }

    if (completed) { // display completed posts
        return (
            <div className="profilePagePosts">
                <h1>Completed Posts:</h1>
                {completedPosts && completedPosts.map((post) => (
                    <div className="postDetails" key={post._id}>
                        <h4>{post.postName}</h4>
                        <p><strong>Description: </strong>{post.description}</p>
                        <p><strong>Skills: </strong>{post.skills}</p>
                        <p><strong>Number of likes: </strong>{post.numberOfLikes}</p>
                        <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                        <div class="icon-container">
                            <span className="material-symbols-outlined" onClick={() => { handleEdit(post._id) }}>edit</span>
                            <span className="material-symbols-outlined" onClick={() => { handleDelete(post._id) }}>delete</span>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (!completed) { // display current posts
        return (
            <div className="profilePagePosts">
                <h1>Current Posts:</h1>
                {currentPosts && currentPosts.map((post) => (
                    <div className="postDetails" key={post._id}>
                        <h4>{post.postName}</h4>
                        <p><strong>Description: </strong>{post.description}</p>
                        <p><strong>Skills: </strong>{post.skills}</p>
                        <p><strong>Number of likes: </strong>{post.numberOfLikes}</p>
                        <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                        <div class="icon-container">
                            <span className="material-symbols-outlined" onClick={() => { handleEdit(post._id) }}>edit</span>
                            <span className="material-symbols-outlined" onClick={() => { handleDelete(post._id) }}>delete</span>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ProfilePostList;