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


       const response = await fetch('/api/post', { // create post, which automatically updates user's post list in the backend
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
               <h1>Project created!</h1>
               <Link to="/createProject" onClick={() => { setProjectCreated(false) }}>
                   <h1>Create new project</h1>
               </Link>
           </div>
       )
   }


  /* return (
      
   
       <div className="createProject">
           <div className="spacer"></div>
           <h2>Create project</h2>
           <div className="spacer"></div>
               <div class="container mt-6">


               
               <div class="card">
               <div class="card-body">
               <div class="row">
                   <div class="col-md-6">
           <form className="create" onSubmit={handleSubmit}>
               <label>Name:</label>
               <input
                   type="text"
                   onChange={(e) => {
                       setPostName(e.target.value)
                   }}
               />
               <label>Description:</label>
               <input
                   type="text"
                   onChange={(e) => {
                       setDescription(e.target.value)
                   }}
               />
              
               <label>Skills required (tags):</label>
               <input
                   type="text"
                   onChange={(e) => {
                       setSkills(e.target.value)
                   }}
               />
               <button className="btn submit-button" disabled={isLoading}>Submit</button>
               {error && <div className="error">{error}</div>}
           </form>
           </div>
                       </div>
                   </div>
               </div>
               </div>
           </div>
   )
}
*/


return (
    <div className="createProject">
      <div className="spacer"></div>
      <h2>Create project</h2>
      <div className="spacer"></div>
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
  );
};

export default CreateProject




