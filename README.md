# Honeycomb: Collaboration and Project Sharing Platform

<p align="center">
<img src="https://res.cloudinary.com/dsljo12bp/image/upload/v1701919015/honeycomblogo.png" alt="drawing" width="200" position=middle/>
</p>



## Description

Honeycomb is a collaborative platform designed to connect individuals with shared interests, fostering a vibrant community of creators and collaborators. Whether you're seeking assistance on your latest project, looking for exciting ventures to contribute to, or showcasing your completed work, Honeycomb provides a buzzing hive of collaboration opportunities.

## Demo

https://www.youtube.com/watch?v=5KghRL7N9WA&t=2s&ab_channel=HoneyComb

## Usage Examples

- **Create a Project:**
  - Start your project journey by creating a post, detailing your project's goals, requirements, and the skills you're seeking in collaborators.

- **Discover Exciting Projects:**
  - Explore a myriad of projects posted by fellow community members. Find the ones that align with your interests and skills.

- **Connect and Collaborate:**
  - Reach out to project creators expressing your interest in collaboration. Honeycomb facilitates seamless communication to bring your ideas to life.

- **Showcase Your Achievements:**
  - Share completed projects with the community. Celebrate your successes, inspire others, and receive feedback from a supportive network.

## Features

- **Login/Signup:**
  - Create a personalized account to unlock the full suite of features and join the Honeycomb community.

- **Addressing Security**
  - Forgot your password? Don't sweat it! Recieve an email from honeycomb with your reset password link in the blink of an eye

- **Post Management:**
  - Create, edit, delete, and mark your posts as complete, maintaining an organized and up-to-date profile.

- **Engagement:**
  - Like and comment on posts to express appreciation, offer insights, or inquire about collaboration.

- **Search Functionality:**
  - Easily find projects of interest using the search feature, ensuring that you connect with the right collaborators.

- **Theme Options:**
  - Choose between light and dark mode to create a comfortable and customizable user experience.

- **Unique Profiles**
  - Customize your experience with Honeycomb's exclusive ~~waifus~~ avatars

## Contribution Guidelines

We encourage contributors to adhere to the following guidelines:

- **Respectful Communication:**
  - Foster an environment of respect and openness. Constructive feedback is welcome, but it should be delivered in a courteous manner.

- **Inclusive Collaboration:**
  - Embrace diversity and inclusivity. Everyone's perspective is valuable, and collaborative efforts should be accessible to all.

- **Community Support:**
  - Offer support and guidance to fellow collaborators. Together, we can create a community that uplifts each other.

- **Positive Environment:**
  - Maintain a positive atmosphere. We believe that a supportive environment enhances creativity and productivity.

## Setup
First, clone the repository 

```
git clone https://github.com/SimplyArsh/35l_project.git
```

Then, move into the frontend folder and install node.js packages

```
# Assuming you are in the root folder
cd frontend
npm install
```

Afterward, move into the backend folder and install node.js packages

```
# Assuming you are in the root folder
cd backend
npm install
```

**Environment setup**

At this point, the frontend should be functional. However, to utlilize the backend functionality, you will need to setup an env file. 

```
# Assuming you are in the root folder
cd backend
touch .env
```

Inside the .env file, put in:
```
PORT=4000
ATLAS_URI=<MongoDB Atlas>
SECRET=<secret>
CLIENT_URL=http://localhost:3000
EMAIL_HOST=<email host>
EMAIL_USERNAME=<email username>
EMAIL_PASSWORD=<email password>
FROM_EMAIL=<from email>
```

Substitute these variables with your own details:

- \<MongoDB Atlas\>: mongodb+srv://\<username\>:\<password\>@honeycomb.tkucoy7.mongodb.net/?retryWrites=true&w=majority, where \<username\> and \<password\> are for your own MongoDB cluster
- \<secret\>: any random string
- \<email host\>: your desired host e.g. smtp.gmail.com
- \<email username\>: this email will send password reset emails
- \<email password\>: password of email above
- \<from email\>: same as \<email username\>

**Start up the server**

Lastly, start the servers in both the frontend and the backend

```
# Assuming you are in the root folder
cd frontend
npm start
cd ../backend
npm start
```

Your server should be up and running!

## Final Words ##
Remember, the Honeycomb community thrives on collaboration, respect, and shared passion. Let's build something amazing together!

