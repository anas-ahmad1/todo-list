
# TaskFlow

**TaskFlow** is a full-stack Todo List application that allows users to manage tasks efficiently. Users can register, login, create and delete categories, add tasks, mark tasks as complete or undo completion, filter tasks by priority, and search tasks by title. The app supports a dark/light theme for a better user experience.




## Tech Stack

**Client:** Next.js, React, TypeScript, Tailwind CSS, Custom CSS

**Server:** Node.js, Express.js

**Database:** MongoDB

**Authentication:** JWT, Bcrypt

**State Management:** React Context API, useState
## Table of Contents

1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [Screenshots](#screenshots)
6. [Project Features](#project-features)
6. [Question and Answers](#question-and-answers)
## Installation

### Prerequisites
- Node.js >= 16
- npm or yarn
- MongoDB (Compass)
- Git

### Steps
1. Clone the repository:
```bash
git clone https://github.com/anas-ahmad1/todo-list.git
cd todo-list
```

2. Install dependencies for backend and frontend:
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

1- Frontend

`NEXT_PUBLIC_API_URL` : Points your frontend to the backend API

2- Backend

`PORT` : The port on which the backend server will run

`MONGO_URI` : MongoDB connection string

`JWT_SECRET` : Secret key used for signing JWT tokens for authentication

You can cross check .env.example files to find the variables needed 
## Database Setup

1- Install MongoDB if not already installed.

2- Open MongoDB Compass.

3- Connect to local MongoDB and copy that URI

4- Create a new Database, it will ask for database name and initial collection name

5- Paste the copied URI and name of the database in `MONGO_URI` in backend's .env file. Like this: URI/{databaseName}

6- Run the seed script from /server . But make sure that .env variables are entered already
```bash
node seed.js
```



## Running the Application

Backend
```bash
  cd server
  nodemon server.js
```

Frontend
```bash
  cd client
  npm run dev
```


## Screenshots

#### Login Page
**Dark Mode**  
![Login Dark](client/screenshots/login-dark.png)

**Light Mode**  
![Login Light](client/screenshots/login-light.png)

---

#### Signup Page
**Dark Mode**  
![Signup Dark](client/screenshots/signup-dark.png)

**Light Mode**  
![Signup Light](client/screenshots/signup-light.png)

---

#### Categories Page
**Dark Mode**  
![Categories Dark](client/screenshots/categories-dark.png)

**Light Mode**  
![Categories Light](client/screenshots/categories-light.png)

---

#### Tasks Page
**Dark Mode**  
![Tasks Dark](client/screenshots/tasks-dark.png)

**Light Mode**  
![Tasks Light](client/screenshots/tasks-light.png)





## Features

- User Signup / Login / Logout
- Category creation and deletion
- Task creation, update, deletion
- Mark task as complete / undo completion
- Filter tasks by priority
- Search tasks by title
- Dark / Light theme toggle


## Question and Answers

#### Explain the difference between Server-Side Rendering (SSR) and Client-Side Rendering (CSR). Why did you choose your approach?

In SSR the HTML is generated on the server and sent to the client for each request. This can improve initial load times as well as SEO. But in CSR, the server sends mostly blank HTML and JS loads and renders content in browser, this has slower initial load but later on its faster. I have used NextJs with mostly "use client" components, so the pages are rendered on CSR. This was suitable because the app is a single user small app. SSR was not critical for SEO etc. 

#### What is JWT and why is it suitable for authentication in this application?

JWT: JSON Web Token is a token for secure transmission of information between client and server. It has three parts: payload, header, signature. It was suitable because it provides stateless authentication, no need to store sessions. It can easily be sent with requests and used to protect routes.

#### Describe the purpose of middleware in Express.js and provide an example of custom middleware you implemented.

Middleware is a function that has access to 3 things: request, response and next middleware function. It is mostly used for logging, authentication, input validation etc. I have used authMiddleware that checks if the user sending request is allowed to access that route or not.

#### How did you handle state management in your React application? What alternatives could you have used?

I have handled state using useState for component level storing. useEffect for side effects. useContext to share user authentication state across app. I could have used redux but it was not suitable for such lightweight project. 

#### What database did you choose and why? What are the pros and cons of your choice?

MongoDb
Pros: Flexibility and easy integration with nodeJs. 
Cons: Less strict schema, harder for complex queries

#### How did you structure your API routes? What REST principles did you follow?

Routes follow standard REST conventions under /tasks and /auth.
Proper HTTP verbs, resource-based URIs, and stateless communication using JWT

#### What security measures did you implement to protect user data?

Password hashing using bcrypt.
Authentication using JWT.
Protected routes through middleware.
JWT Blacklisting.
Input validation and sanitization.

#### How did you handle errors in both frontend and backend? Provide examples.

Wrapped calls in try catch block and send responses as JSON and receive them in frontend and display using Toastify. 
Example:
```bash
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists through email
  const user = await User.findOne({ email });

  // Not giving two different errors for security purposes
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({ message: "Invalid credentials" });
  }
});
```

#### What was the most challenging part of this project and how did you solve it?

I think I did not face any such challenge in technical things. The most challenging was the time management along with my current job and ongoing family event. Other than that documentation was a bit new thing for me so that took time. 

#### If you had more time, what improvements would you make to the application?

Some ui improvements could have been made like drag and drop of tasks. But more importantly I would have focused more on optimizing the current code and doing better testing before the submission.
Like using a more secure way of storing token instead of localStorage.
Implementing separation of concern even more.
Remove redundancy even more.
And yes I would also have added API documentation here in readme. I could not because of lack of time.