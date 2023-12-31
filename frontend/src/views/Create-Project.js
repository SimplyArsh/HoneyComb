import { useState } from "react"
import { useAuthContext } from '../hooks/use-auth-context'
import { Link } from 'react-router-dom'


const CreateProject = () => {
   const { user } = useAuthContext()
   const [postName, setPostName] = useState(null)
   const [description, setDescription] = useState(null)
   const [skills, setSkills] = useState(null)
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(null)
   const [projectCreated, setProjectCreated] = useState(false)


   if (!user) {
       console.log("You must be logged in")
       return
   }


   const handleSubmit = async (e) => {
       setIsLoading(true)
       setError(null)
       e.preventDefault() // Don't refresh the page by default


       const response = await fetch('/api/post/create', { // create post, which automatically updates user's post list in the backend
           method: 'POST',
           body: JSON.stringify({ postName, description, skills }),
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + user.token
           }
       })


       const json = await response.json() // get back response


       if (!response.ok) {
           setIsLoading(false)
           setError(json.error)
       }


       if (response.ok) {
           setIsLoading(false)
           setProjectCreated(true)
       }


   }


   if (projectCreated) {
       return (
           <div className="projectCreated">
               <h2>Project created!</h2>
               <div className="spacer"></div>
               <Link to="/" onClick={() => { setProjectCreated(false) }}>
                   <h2>Explore more projects</h2>
               </Link>
               <div className="spacer"></div>
               <div className="extremely-extremely-long-spacer"></div>
           </div>
       )
   }


return (
    <div className="createProject">
      <div className="spacer"></div>
      <h2>Create project</h2>
      <div className="spacer"></div>
      <div className="col-md-10 mx-auto">
      <div className="container mt-6">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <form className="create" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setPostName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Relevant Skills:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setSkills(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <form className="create" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      rows="4"
                      className="form-control"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="small-spacer"></div>
                  <div className="text-center">
                    <button
                      className="btn submit-button"
                      disabled={isLoading}
                    >
                      Submit
                    </button>
                  </div>
                  {error && <div className="error">{error}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="extremely-long-spacer"></div>
      <div className="very-long-spacer"></div>
    </div>
  );
};

export default CreateProject




