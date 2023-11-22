import PostCard from "../components/Post-template";
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth-context'
import { useHomeContext } from '../hooks/use-home-context'
import InfiniteScroll from 'react-infinite-scroll-component'
import Comment from "../components/Comments"
import useNode from "../hooks/comment-node.js"
// import { useInfiniteQuery } from '@tanstack/react-query'

const comments = {
    id: 1, 
    items: []
}

const Home = () => {
    const [pageNumber, pageNumberUpdate] = useState(1)
    const { user } = useAuthContext()
    const { recomendedPosts, editFetchNeeded, dispatch, userLikes } = useHomeContext()
    const isInitialRender = useRef(true);
    const [commentsData, setCommentsData] = useState(comments); 
    const { insertNode, editNode, deleteNode } = useNode(); 

    const fetchMoreData = () => {
        if (editFetchNeeded) {
            pageNumberUpdate(pageNumber-1)
        }

        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        fetch('http://localhost:4000/api/post/recomendations?' + new URLSearchParams({
            "pageNumber": pageNumber,
            "pageSize": 4
        }), { 
            headers: {"Authorization": 'Bearer ' + user.token}
        }).then(
            (response) => {
                if (!response.ok) {
                    throw new Error('Home Page post fetch error')
                }
                return response.json();
        }).then(
            (data) => {
                pageNumberUpdate(pageNumber+1)
                dispatch({ type: 'SET_RECOMENDED_POSTS', payload: data })
                if (editFetchNeeded) {
                    dispatch({ type: 'EDIT_TOGGLE', payload: false})
                } 
            for(let i = 0; i < data.length; i++) {
                console.log(data[i]._id)
            }
        })

        fetch('/api/user/profile', {
            headers: { // include token in header
                'Authorization': 'Bearer ' + user.token
        }}).then(
            (response) => {
                if (!response.ok) {
                    throw new Error('Error fetching user Likes')
                }
                return response.json();
        }).then(
            (data) => {
                dispatch({ type: 'SET_USER_LIKES', payload: data})
        })
    }; 

    useEffect(() => {
        if (!user) { // is user logged in? 
            return (
                <p> You must be logged in! </p>
            )
        }
        fetchMoreData(); // Initial fetch when the component mounts
      }, [editFetchNeeded]); // editToggle will fetch new data whenever there is a change. 

    const handleLike = async (post) => {
        const postResponse = await fetch('/api/post/like/' + post._id, {
            headers: { // include token in header
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
            },
            method: 'PATCH'
        })
        if (!postResponse.ok) {
            return
        } 
        const userResponse = await fetch('/api/user/updateLikes/' + post._id, {
            headers: { // include token in header
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
            },
            method: 'PATCH'
        })
        const postResBdy = await postResponse.json()
        const userResBdy = await userResponse.json()
        // to re-fetch data
        dispatch({ type: 'UPDATE_LIKES_ON_POST', payload: {id: post._id, count: postResBdy.numberOfLikes} })
        dispatch({ type: 'UPDATE_USER_LIKES', payload: {id: post._id, liked: userResBdy.liked} })
    };

    // comments handle functions 

    const handleInsertNode = (folderId, item) => {
        const finalStructure = insertNode(commentsData, folderId, item);
        setCommentsData(finalStructure); 
    }

    const handleEditNode = (folderId, value) => {
        const finalStructure = editNode(commentsData, folderId, value);
        setCommentsData(finalStructure);
        console.log(commentsData)
    }

    const handleDeleteNode = (folderId) => {
        const finalStructure = deleteNode(commentsData, folderId);
        const temp = { ...finalStructure }
        setCommentsData(temp); 
    }

    const handleAddComment = async () => {
        console.log("wow")
        // try {
        //     const response = await fetch('/api/post/addComment?' 
        //     + new URLSearchParams({
        //         "parentCommentId":"6559af4bc4256aaea0270d12",
        //         "idSelect":"1"
        //     }), {
        //         headers: { // include token in header
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + user.token,
        //         },
        //         body: JSON.stringify({
        //             "comment":"that mf aint got shit on me"
        //         }),
        //         method:"POST" 
        //     })
        //     const response_ = await response.json()
        //     console.log(response_)
        // } catch (error) {
        //     console.log(error)
        // }
        try {
            const response = await fetch ('/api/post/comments/' + "6559af4bc4256aaea0270d12", { 
                headers: { // include token in header
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                }})
            const res = await response.json()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <>
            <button onClick={handleAddComment}>Button</button>
            </>
            {/* <InfiniteScroll 
                dataLength={recomendedPosts.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<p> Loading... </p>}
            > 
                {recomendedPosts.map((post) => (
                    <> 
                        <PostCard 
                            key={post._id} 
                            post={post}
                            handleLike={handleLike}
                            color={userLikes.includes(post._id)}
                            comment={commentsData} 
                            handleInsertNode={handleInsertNode}
                            handleEditNode={handleEditNode}
                            handleDeleteNode={handleDeleteNode}
                        />
                    </> 
                ))}
            </InfiniteScroll> */}
            
        </div>
    )
}

export default Home

