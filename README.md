# MERN-Stack-learning
From here: https://www.youtube.com/watch?v=8DploTqLstE&amp;list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&amp;index=2&amp;ab_channel=NetNinja

Things to install:

nodemon(server can refresh automatically): npm install -g nodemon 

Environment: npm install dotenv 

MongoDB: npm install mongodb

Express: npm install express

// In your .env file, put in:
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@honeycomb.tkucoy7.mongodb.net/?retryWrites=true&w=majority

Frontend: Do npm install react-router-dom in the /frontend folder to allow for routers. Add "proxy": "http://localhost:4000" to the package.json file in the frontend. Do npm install date-fns to add date formatting in the frontend. 

To start the server, cd into backend. Then do npm run dev or npm run nodemon server. Next, cd into frontend and do npm start.