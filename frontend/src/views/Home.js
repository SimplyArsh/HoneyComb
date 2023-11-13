import PostTemplate from "../components/postTemplate";
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth-context'
// import { useInfiniteQuery } from '@tanstack/react-query'

const Home = () => {
    // const { id } = useParams()
    const { user } = useAuthContext()
    const [image, setImage] = useState('');
    const [posts, updatePosts] = useState([])

    useEffect(() => {
        if (!user) {
            console.log("You must be logged in")
            return
        }

        const fetchRecomendations = async () => {
            let response;
            response = await fetch('/api/post/', {
                headers: { // include the page that we want to fetch
                    'Authorization': 'Bearer ' + user.token
                }
            }); 
            console.log(response)
            const json = await response.json() // get user info from server and update state

            for 

            updatePosts((prevPosts) => [...prevPosts, json])

            if (!response.ok) {
                return "Could not fetch a response"
            }
        }

        if (user) {
            fetchRecomendations()
        }

    }, [user]) // hook



    console.log(posts)

    return (
        // <div className="home">
        //     <h1>Home page</h1>
            <div className="home">
                posts && {posts.map((post) => (
                    <PostTemplate key={post.id} post={post} />
                ))}
            </div>
        // </div>
    )
}

export default Home


    // const page = () => {

    //     const  { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    //         ['query'],
    //         async ({ pageParam = 1}) => {
    //             const response = await fetchRecomendations(pageParam)
    //             return response
    //         },
    //         {
    //             getNextPageParam: (_, pages) => {
    //                 return pages.length + 1
    //             },
    //             // intialData: {
    //             //     pages: 
    //             // },
    //         }
    //     )

    //     return (
    //         posts: 
    //         {data?.pages.map((page, i) => 
    //             div key=[i]
    //             )}
    //     )

// EXTRA TESTING CODE BELOW

// useEffect(() => {
//     const fetchImage = async () => {
//       const response = await fetch('https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
//       const blob = await response.blob();
//       setImage(URL.createObjectURL(blob));
//     };

//     fetchImage();
//   }, []);

// const posts = [
//     {
//         id: 1,
//         user: {
//         id: 1,
//         name: "John Doe",
//         avatar: image,
//         },
//         ageSinceUpload: "1 hour ago",
//         textDescription: "This is a post.",
//         images: [
//         {
//             id: 1,
//             url: "https://unsplash.com/photos/cheerful-mature-businesswoman-keeping-arms-crossed-and-smiling-while-leaning-at-the-wall-wgh4eqMkh4k",
//         },
//         {
//             id: 2,
//             url: "https://example.com/image2.jpg",
//         },
//         ],
//     }
//     ];