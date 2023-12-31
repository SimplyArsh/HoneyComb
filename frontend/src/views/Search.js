import PostDetails from "../components/Post-Details";
import { useEffect, useState, useRef } from 'react'
import { useAuthContext } from '../hooks/use-auth-context'
import { useHomeContext } from '../hooks/use-home-context'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
// import { useInfiniteQuery } from '@tanstack/react-query'

// const comments = {
//     id: 1, 
//     items: []
// }

const Search = () => {
    const [pageNumber, pageNumberUpdate] = useState(1)
    const { user } = useAuthContext()
    const [searchPageUserId, setSearchPageUserId] = useState()
    const { recomendedPosts, editFetchNeeded, dispatch, userLikes } = useHomeContext()
    const isInitialRender = useRef(true);

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearchClick = () => {
        console.log("searchTerm is now: " + searchTerm + " " + typeof (searchTerm))
        navigate(`/search?results=${searchTerm}`, { state: { lookup: searchTerm } });
        window.location.reload();
    }

    const fetchMoreData = () => {
        if (editFetchNeeded) {
            pageNumberUpdate(pageNumber - 1)
        }

        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        fetch('api/post/find?' + new URLSearchParams({
            "pageNumber": pageNumber,
            "pageSize": 4,
            "lookup": location.state.lookup,
        }), {
            headers: { "Authorization": 'Bearer ' + user.token }
        }).then(
            (response) => {
                if (!response.ok) {
                    throw new Error('Home Page post fetch error')
                }
                return response.json();
            }).then(
                (data) => {
                    pageNumberUpdate(pageNumber + 1)
                    dispatch({ type: 'SET_RECOMENDED_POSTS', payload: data })
                    if (editFetchNeeded) {
                        dispatch({ type: 'EDIT_TOGGLE', payload: false })
                    }
                    for (let i = 0; i < data.length; i++) {
                        // console.log(data[i]._id)
                    }
                })

        fetch('/api/user/profile', {
            headers: { // include token in header
                'Authorization': 'Bearer ' + user.token
            }
        }).then(
            (response) => {
                if (!response.ok) {
                    throw new Error('Error fetching user Likes')
                }
                return response.json();
            }).then(
                (data) => {
                    setSearchPageUserId(data.userId)
                    dispatch({ type: 'SET_USER_LIKES', payload: data })
                })
    };

    useEffect(() => {
        if (!user) { // is user logged in? 
            return (
                <p> You must be logged in! </p>
            )
        }
        // console.log(recomendedPosts)
        fetchMoreData(); // Initial fetch when the component mounts
        // eslint-disable-next-line
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
        dispatch({ type: 'UPDATE_LIKES_ON_POST', payload: { id: post._id, count: postResBdy.numberOfLikes } })
        dispatch({ type: 'UPDATE_USER_LIKES', payload: { id: post._id, liked: userResBdy.liked } })
    };

    // comments handle functions
    /*
    const handleAddComment = async () => {
        try {
            const response = await fetch('/api/post/addComment?'
                + new URLSearchParams({
                    "parentCommentId": "6559c27c37797e4fb897ebea",
                    "idSelect": "0" // 0 if reply to a comment
                }), {
                headers: { // include token in header
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
                body: JSON.stringify({
                    "comment": "this is a new comment  that i just added"
                }),
                method: "POST"
            })
            const response_ = await response.json()
            console.log(response_)
        } catch (error) {
            console.log(error)
        }
 
 
        // try {
        //     const response = await fetch ('/api/post/editComment', {
        //         headers: { // include token in header
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + user.token,
        //         },
        //         method: 'PATCH',
        //         body: JSON.stringify({
        //             id: "6559c3c837797e4fb897ebf0",
        //             editedComment: "this is the new value"
        //         })
        //     })
        //     const res = await response.json()
        //     console.log(res)
        // } catch (error) {
        //     console.log(error)
        // }
 
 
        // try {
        //     const response = await fetch ('/api/post/comments/' + "6559af4bc4256aaea0270d12", {
        //         headers: { // include token in header
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + user.token,
        //         },
        //         method: 'GET'
        //     })
        //     const res = await response.json()
        //     console.log(res)
        // } catch (error) {
        //     console.log(error)
        // }
 
 
    }
    */


    return (
        <div>
            {/* Search bar */}
            <div className="col-md-8 mx-auto">
                <input
                    type="text"
                    placeholder="Search for posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-secondary" onClick={handleSearchClick}>Search</button>

                <InfiniteScroll
                    dataLength={recomendedPosts.length}
                    next={fetchMoreData}
                    hasMore={true}
                >
                    {recomendedPosts.map((post) => (
                        <PostDetails
                            editable={false}
                            inProfilePage={false}
                            post={post}
                            key={post._id}
                            handleLike={handleLike}
                            userId={searchPageUserId}
                            color={userLikes.includes(post._id)}
                        ></PostDetails>
                    ))}
                </InfiniteScroll>
                <div className="extremely-extremely-long-spacer"></div>
            </div>
        </div>
    );
}

export default Search

