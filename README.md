# README

This is the project done for phase 4 FLEX program at Flatiron School.  In this phase students learned Ruby on Rails.

## Getting Started

To begin, enter the following from the root directory into the terminal:

bundle install

This will install the dependencies, including BCrypt and active_model_serializers located at Gemfile.

After installing, from root go to /client and enter the following:

npm install

This will install the dependencies used for the front end, such as DatePicker and moment.

To run the app, the user can simply enter the following into the root directory:

foreman start -f Procfile.dev

## Some Exercise App

In this app, users can enter a routine of exercises.  After creating and logging into an account, user will enter the main page where the person creates an exercise routine consists of the workout, set, reps, and rest intervals.

Once the user saves it, user can head over to the link above 'Select Routine' where the user will enter the weight used (in lbs).  User has a choice of either performing them on that day, or save it for a different date.

Finally, the user performs the exercise and check off complete or incomplete.  If completed, user will judge the difficulty of that exercise based on user perception (detail in app).  Otherwise, user will log in the amount that has been successfully performed.

After submitting the routine performed, the user can then head over to the View Progression page where all the data of the routines and individual exercises are to track all the past attempts performed.  Additionally, the user can check through the calendar when the routines were performed.

Finally, user can head over to the Manage page and delete any routines that user may no longer use or accidentally create.