

## Project Update Log

Date | Description | Status
-------------- | ----------------------- | ---------------------
May 23    | Git Repo initiation
May 24    | Folder Structure | create-react-app
May 24    | Backend: Database - migration & seed files
May 25    | Tasks List (spreadsheet)
May 28    | Tasks List added in trello
May 28    | READme update
May 29    | Split folders into frontend and backend
May 29    | React Routers
May 29    | API routes | definition
May 30    | README update | front-end flow
May 30    | Backend: Routes | Description
May 31    | Blueprint UI | Scss implementation
Jun 4     | Frontend development
Jun 5     | Display page | in progress
Jun 5     | Backend: Routes/Service (Users/Items) | in progress
Jun 5     | Backend: Converted all backend files to Typescript
Jun 6     | Backend: Developed routes and functions for adding, getting and editing items (except file upload)
Jun 8     | Backend: Developed routes and functions for adding, getting adn editing orders
Jun 10    | Backend: Included picture upload for users and items
Jun 12    | redux, react-redux, axios, redux-thunk | yarn add
Jun 12    | order menu searchBox | basic
Jun 12    | add/remove item from cart
Jun 12    | Backend: Found and edited all photos for items in database
Jun 12    | Circle CI configuration
Jun 13    | Backend: Added sample users in the database
Jun 13    | Cloudfront invalidation
Jun 15    | Backend: Added method to capture information for generating radar graph
Jun 15    | Items descriptions added
Jun 16    | Backend: Auth and API routing
Jun 17    | Backend: Local login
Jun 19    | Backend: Bug fixes and price change logic
Jun 20    | Backend: Limited access for getting all orders (staff only)
Jun 20    | Backend: Replaced :userId params by obtaining id from user auth token
Jun 20    | Frontend: manager pages
Jun 21    | Backend: Bug fixes (sorting responses, requiring unique username, bcrypt initiated)
Jun 21    | Frontend: display screen styling 
Jun 22    | Backend: Bug fixes (sending token upon sign up)
Jun 22    | Frontend: admin page /current Orders implementation 
Jun 23    | Backend: Fluctuating prices response complete (in format as agreed upon)
Jun 23    | Backend: Bug fixes (login with error checks and response)
Jun 23    | Backend: Included priceUp and priceDown variable to adjust fluctuating prices
Jun 24    | Backend: Bug fixes (priceUp and priceDown variables able to accept float point values)
Jun 24    | Backend: Updated migration file with googleToken, stripeToken
Jun 24    | Backend: Added support for Stripe payment services
Jun 25    | Backend: Added isActive option for getAll items and error check in payment services
Jun 25    | Frontend: admin page /pending Orders implementation 
Jun 26    | Backend: Bug fixes (double-checked photo names, updated seed file)
Jun 26    | Backend: Created route for obtaining photo
Jun 27    | Backend: Working on fluctuating prices algorithm
Jun 27    | Backend: Changing backend to async/await format
Jun 27    | Backend: Bug fixes (error in renaming items for respond value)
Jun 28    | Backend: Auto insert into itemLog using chronjob and new route
Jun 28    | Backend: Renamed 'chardata' to 'chartdata' in fluctuating route to match graph plugin
Jun 28    | Backend: Cleaned up all item photo size to be 300 x 300 and cat photo to 339 x 175
Jun 28    | Backend: Fluctuating price now returns with each add order request
Jun 29    | Backend: Performance graph for all will include user data as well
Jun 29    | Backend: Performance graph will only include categories where the user has ordered
Jun 30    | Backend: Added maxMin and priceDrop route for new functions
Jul 01    | Backend: Cleaned up all backend service files to use await/async
Jul 02    | Backend: Updated all item photos (better quality, new margin requirement)
Jul 02    | Backend: Created data and seed file for mock data

## Deployment
Frontend deployment is done using CircleCI.
Backend is deployed with AWS (EC2).
