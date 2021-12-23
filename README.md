# Winder App
This is an task manager app that allows users to sign up an account and contribute to a pool of tasks. Users can assign tasks to other users, assign task priority, and change task statuses.

## Getting Started
Start by cloning the repository. Make sure that your current version of node is **v16.13.0** and make sure you are in the winder directory. Then run the following command.

``` npm install ```

Do this for the winder-backend directory as well.

Then start the local react server with:

``` npm start ```

The front-end will open to to localhost:3000.

To start the backend server go to the winder-backend directory and run:

``` npm start ```

The backend server will listen on localhost:8001 by default.

## About the Project
The introduction screen for the user will be a login screen.

![image](https://user-images.githubusercontent.com/51723128/147170489-6cd104b8-92a7-419a-9371-24453d7a0053.png)

The user will be able to register an account, sign-in with their registered account, or sign-in through google authentication.

Once logged in. The user will see the task list with all the relevant information.

![image](https://user-images.githubusercontent.com/51723128/147170659-9114bd40-ac60-43c4-b64d-5bb3ede167c7.png)

The user can sort the left by the categories on the left side or use the search bar to look up tasks by relevant information.
The user also has the ability to log out through the top right.
