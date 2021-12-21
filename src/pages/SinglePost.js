import React from "react"
import {Link, useParams} from "react-router-dom"

const SinglePost = ({posts, edit, deleteQuote}) => {
    // get the params from the url
    const params = useParams()
    const id = parseInt(params.id)

    // find the particular post the user wants to see based on the param
    const post = posts.find((p) => p.id === id)
    console.log(post)

    ////////////////////
    // Style Object
    /////////////////////
    const div = {
        textAlign: "center",
        border: "3px solid green",
        width: "80%",
        margin: "30px auto"
    }


    return <div style={div}>
        <h1>{post?.subject}</h1>
        <button className="bg-red-400 rounded-lg font-bold transition duration-500 ease-in-out hover:ring-2 ring-offset-2 ring-red-600" onClick={() => deleteQuote(post)}>Delete</button>
        <button onClick={() => edit(post)} className="edit-button bg-blue-400 rounded-lg font-bold transition duration-500 ease-in-out hover:ring-2 ring-offset-2 ring-blue-600">Edit</button>
        <Link to="/">
            <button className="bg-gray-400 rounded-lg font-bold transition duration-500 ease-in-out hover:ring-2 ring-offset-2 ring-gray-600">Go Back</button>
        </Link>
    </div>
}

export default SinglePost;