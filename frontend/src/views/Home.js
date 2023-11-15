import PostCard from "../components/postTemplate";
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth-context'
import InfiniteScroll from 'react-infinite-scroll-component'
// import { useInfiniteQuery } from '@tanstack/react-query'

const Home = () => {
    
    const [pageNumber, pageNumberUpdate] = useState(1)
    const [posts, postsUpdate] = useState([])
    const { user } = useAuthContext()
    const isInitialRender = useRef(true);

    const fetchMoreData = () => {

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
                    throw new Error('Fetch error')
                }
                return response.json();
        }).then(
            (data) => {
                pageNumberUpdate(pageNumber+1)
                console.log(data)
                if (!posts || posts.length === 0) {
                    postsUpdate(data)
                } else {
                    postsUpdate((prevPosts) => [...prevPosts, ...data])
                }
        })
        
    }; 

    useEffect(() => {
        fetchMoreData(); // Initial fetch when the component mounts
      }, []); // Empty dependency array to run only once

    return(
        <div>
            <InfiniteScroll 
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<p> Loading... </p>}
            > 
                {posts.map((post) => ( <PostCard 
                    key={post._id} 
                    name={post.profile_name}
                    avatar="https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=1380&t=st=1700010094~exp=1700010694~hmac=b9d7f8d56b66ac184e10e6b6fc4df817beaf81b63a6e495f32ad81e1eebbbb1a"
                    postName={post.postName}
                    description={post.description}
                    dateCreated={post.dateCreated}
                    skills={post.skills}
                    likes={post.numberOfLikes}
                />
                ))}
            </InfiniteScroll>
            
        </div>
    )
}

export default Home

