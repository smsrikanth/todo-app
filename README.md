Todo App
Build a social media app with todo lists.
The deliverables
For reference, refer to https://jsonplaceholder.typicode.com/ similar APIs
User can sign up and login using JWT token - /user , /login
User can create multiple Todos and manage them (Delete, Edit, Mark as Complete) - /todo, /todo/:id
User can create posts
Posts will accept only text -  /post/:id, /posts
Posts can have one or multiple comments
User can query other users and view their details
They can comment on other users’ posts
They can ONLY view other users’ todos
Add test cases using the library of your choice.
	
Note - 
Code hosted on github or bitbucket. You must use NodeJS to make this project.
Use MongoDB or any non relational database of your choice.
Typescript is a plus.
Please send the links in the chat on Cutshort itself.


Criteria the assignment will be evaluated on
Whether your code is extensible / scalable
How readable your code is (code quality)
How you organize your codebase
Can you think of edge cases - ( rate limiting, refresh tokens, caching, etc )
Have you done anything to make sure that the APIs are secure?
Bonus points - 
Try to add RBACs (https://auth0.com/docs/manage-users/access-control/rbac)
user with an admin role should be able to edit all other users
A regular user can edit their own todos/posts but can only comment and view other todos or posts
Things to keep in mind
Host your code on any cloud of your choice ( replit, aws, heroku, ngrok, etc.) and also send github link.
All listing APIs should support pagination and querying.
You can take up to 3 days to complete the assignment. If you need more time, please let us know in the chat itself.
If you have any questions or doubts around the assignment, you can always ask on the conversation thread on Cushort.
There is no need for any Frontend implementations. Only APIs are fine.


