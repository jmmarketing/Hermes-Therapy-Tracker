# [Hermes Therapy Tracker](https://hermes-tracker.herokuapp.com/)
The Hermes Therapy Tracker is a web application that allows guardians with children in therapy to track their child's progress.

Users may register an account, where they may fill out a form to add a child (or multiple children) to their account.  

Guardians may track their child's therapy sessions by filling out a form for each session. As session forms are submitted, a graph is generated to show the child's progress during therapy over time. Guardians may also view past sessions, where they can add comments that they may want to revisit, or that they may want their child's therapist to see.

Resources provided by the child's therapist (e.g. articles, pamphlets, etc.) are made available to the guardian via the child's display page. Each time a new session is submitted, the resource associated with that session is displayed on the child's page.

A list of therapists and their contact information is available to the users via the sidebar on the left.

## New Technologies Used
- ReactStrap, for page styling
- ChartJS, to make child progress line graph

## Future Enhancements
- Therapist user role, where the child therapists can do the following:
  - Comment on their patients' past sessions
  - Add resources for their patients to view
- Calendar where users may view past sessions by day
- Notifications (in-app and email) for guardians when new resources are added or when a therapist comments on one of their child's sessions
- Avatar select/image upload for profiles
- Parent Checkpoints in the form of quizzes to ensure that parents are reading the resources from their thrapists
