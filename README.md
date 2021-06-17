# CHATI
## About this Project:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CHATI is a social media app focused on sports and fitness. The ideal design would be an interactive experience in which users can view and message about events, arrange meetups, and keep and maintain friends.The MVP delivered includes account creation and authentication, and the viewing and posting of events.  Future plans would include upgrading to the ideal design, creating a mobile app, and adding additional functionality like teams or stories.
## Overview:
###### MVP:
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The MVP we delivered is a web application with a React JS frontend and Django backend which provides URLs to make requests in REST APIs. It has user account creation and authentication.  Users can view and create events and create their statuses based on the event they want to share their feelings. Also, other users can interact with the statuses through comments. Owner of events or owner of statuses have a choice to delete and edit function. Users can update their profile page with things like organization, favorite sport, and role in organizatio

###### Unfinished Features:
 Stories and Chat box are the things that we could not finish because we want to focus on user’s profile and authentication, events, statuses, and comments to make it work smoothly on backend server API and frontend UI to make users easy to interact with app.
  
## Build Overview:
Live instances of the CHATI frontend and backend are available (chatifrontend.herokuapp.com, chatispu.herokuapp.com). However, our development efforts are also exhibited in our code base. Here’s how we navigate and run locally:\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Through various shell incantations, it is possible to instantiate local servers that allow development of frontend or backend.  You must be in the directory of the /frontend to run npm start and in /backend to run Python manage.py runserver.  Once both ends are running, you can make calls from `localhost:3000` (frontend) to various paths starting at root `127.0.0.1:8000/api` (backend).

**FRONTEND:**\
Instructions are in frontend repo

**BACKEND:**\
Instructions are in backend repo 

**DEPLOY:**\
We use two GitHub-linked Heroku instances. The deployment process requires attention to Heroku tooling.

**Project_Path:**\
Because we hold two projects in one repo, we configure ( via dashboard.heroku.comà‘settings’ ) a configuration variable to specify the subdirectory to image:PROJECT_PATH [subdirectory] where subdirectory is either ‘frontend’ or ‘backend

**BuildPacks:**\
- Require https://github.com/timanovsky/subdir-heroku-buildpack.git as the first buildpack ( via dashboard.heroku.comà‘settings’ ).        
- The frontend requires an additional buildpack https://github.com/mars/create-react-app-buildpack.git. The backend may use the standard Heroku/Python buildpack.

## Test Results and User Feedback:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Testing did not achieve the level of robust C/I. We would need to make considerable efforts to achieve this. Some essential aspects of our services are tested simply by needing to deploy and communicate through a narrow API channel. More granular testing has been ad-hoc.In a more or less obvious way, as the window for adding needed functionality and features became smaller, it became less plausible to spend development effort on robust testing, whether from a technical or user perspective. Some changes (patches seems like the appropriate term) have been made post-crunch, post-submission to the live services as we attempt to smooth out bugs or issues. Our situation is not ideal, but the notion of maintenance is intriguing to experience. 

>Original team Repo: https://github.com/AndrewHarrisSPU/CHATI2

