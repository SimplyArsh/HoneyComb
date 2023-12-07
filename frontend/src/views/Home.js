import PostDetails from "../components/Post-Details";
import React from 'react'; // Add this line at the top of your file
import { useEffect, useState, useRef } from 'react'
// import { useAsyncError, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth-context'
import { useHomeContext } from '../hooks/use-home-context'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
// import { useLocation } from 'react-router-dom';
// import { useInfiniteQuery } from '@tanstack/react-query'



const Home = () => {
    const [pageNumber, pageNumberUpdate] = useState(1)
    const { user } = useAuthContext()
    const [homePageUserId, setHomePageUserId] = useState(null)
    const { recomendedPosts, editFetchNeeded, dispatch, userLikes } = useHomeContext()
    const isInitialRender = useRef(false);

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    // const location = useLocation();

    const handleSearchClick = async () => {
        console.log("searchTerm is now: " + searchTerm + " " + typeof (searchTerm))
        navigate(`/search?results=${searchTerm}`, { state: { lookup: searchTerm } });
        window.location.reload();
    }

    const fetchUserData = async () => {
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
                setHomePageUserId(data.userId)
                dispatch({ type: 'SET_USER_LIKES', payload: data })
        })
    }

    const fetchMoreData = async () => {
        if (editFetchNeeded) {
            pageNumberUpdate(pageNumber - 1)
        }

        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        fetch('api/post/recomendations?' + new URLSearchParams({
            "pageNumber": pageNumber,
            "pageSize": 4,
            "userId": homePageUserId
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

    };

    useEffect(() => {
        
        if (!user) { // is user logged in? 
            return (
                <p> You must be logged in! </p>
            )
        }
        fetchUserData();

        // eslint-disable-next-line
    }, []); // editToggle will fetch new data whenever there is a change. 

    useEffect(() => {
        
        if (homePageUserId != null) {
            fetchMoreData();
        }
    }, [homePageUserId])

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


    return (
        <div className="homePage">
            <div className="spacer"> </div>

            <div><h2>Explore projects</h2> {/* Header */}<div>
                <div className="small-spacer"> </div>
                {/* Search bar */}
                <div className="col-md-8 mx-auto">
                <input
                    type="text"
                    placeholder="Search for posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-secondary" onClick={handleSearchClick}>Search</button>
                <div className="col-md-8 mx-auto">
                <InfiniteScroll
                    dataLength={recomendedPosts.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<p></p>}
                >
                    {recomendedPosts.map((post) => (
                        <React.Fragment key={post._id}>
                            <PostDetails editable={false} inProfilePage={false} post={post} handleLike={handleLike}
                                userId={homePageUserId}
                                color={userLikes.includes(post._id)}  />
                        </React.Fragment>
                    ))}

                </InfiniteScroll>
                </div>
            </div>
            </div>
        </div>
        </div>

    )
}

export default Home
