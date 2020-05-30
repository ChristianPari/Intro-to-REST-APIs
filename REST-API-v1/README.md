<h3>May 29, 2020</h3>
GOAL: To go through the creation of a simple server completely on my own. Expecting to find out more of what I need to practice with by way of seeingmy struggles through this small project.<br>
Technology Used:<br>
    - Express
    - Nodemon
    - Dotenv
    - Morgan
    - FS

This project is going to contain a simple server setup that will allow for the user to make requests with all the main CRUD methods. The topic of the server will be a Dog Owner social media, the database will contain a collection of users, each user will have their own object which will include data like the owners name, pets name, pets breed, favorite (pet food, toy, place to sleep). Will be able to GET all users, create via PUT a new user, edit via PATCH a user, DELETE a user.<br>
The database will be a .txt file included in the [database folder](link).

<h3>May 29, 2020</h3>
<b>12:00pm - 1:00pm</b><br>
Created the server file '[app.js](link)' and within it I configured and requried all the packages being used within this server, after then I middleware I needed that would be applied to all routes on this server; morgans property to delcare what way I want the requests being displayed in my console, express's json property to recognize that the Request data coming in is in JSON format, then another to serve the static homepage html and js I created for the root route.<br>
Created the enviorment file that is storing my port number.<br>
Next was to create the home route and I did this by creating a routes folder then within that I created a [homeRouter.js file](link) that would be used to handle the request made to the root route. Here I sent my [home.html](link) file when there is a GET request made to this route. For now it is just a heading "Home Page" and a log to console from the JS file for the webpage.<br>

<b>1:40pm - 2:20pm</b><br>
Started the creation of the next route of my server; Users; Going to have a GET request for both the full database and individual users, a POST request to create a new user, a DELETE request to remove a user entry from the database and a PATCH request to update a users data, due to the fact that I don't want any fields to be removed I wont be using a PUT request becuase there is no need for a complete overwrite of data.<br>
The GET requests have been made for both the full database and the indivual user which uses a request paramter that is the users ID. Due to repetitious code I created a mildware function to get the database data and assign it to a new request key/value pair, this way it can be used in the callback function of the request with ease.