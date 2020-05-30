GOAL: To go through the creation of a simple server completely on my own. Expecting to find out more of what I need to practice with by way of seeingmy struggles through this small project.<br>

Technology Used:
* Express
* Nodemon
* Dotenv
* Morgan
* FS

This project is going to contain a simple server setup that will allow for the user to make requests with all the main CRUD methods. The topic of the server will be a Dog Owner social media, the database will contain a collection of users, each user will have their own object which will include data like the owners name, pets name, pets breed, favorite (pet food, toy, place to sleep). Will be able to GET all users, create via PUT a new user, edit via PATCH a user, DELETE a user.<br>
The database will be a .txt file included in the database folder of this repo.

<h3>May 30, 2020</h3>
<b>12:30pm - 2:30pm</b><br>

Completed the creation of the PATCH, DELETE, POST requests. The POST request used the same [middlware](https://github.com/ChristianPari/Intro-to-REST-APIs/blob/master/REST-API-v1/middleware/getDB.js) to read the .txt file I but then I also created another middleware function, [validNewUser](https://github.com/ChristianPari/Intro-to-REST-APIs/blob/master/REST-API-v1/middleware/validNewUser.js) to validate that the request body from the front end has all the required fields needed to create a new user. To do this I used object destructing to create an object out of the request body and made a SCHEMA-like newUserObject and then compared their lengths and keys to see if they were similar, if not then the server would respond with a status 400 with the message error for the user in JSON format, otherwise returns a status 200 and sends back the created user object and their ID (index in the users array of objects) in JSON.<br>
Next was to create the DELETE request for a specified user within the request parameters and I use both middlwares (read databse, validates the requested value) and then if all checks out then the user is found in the database and removed via splice method.<br>
Lastly, the PATCH request to update a users data which is very similar to the DELETE request but instead of removing the data entirely, I'm splice the old users' data and inserting the new updated user data. I used a 'for in' loop to cycle through the orginal users data and then check if any keys of the object matched the ones within the request body and if so assign the value in the request body to the user data variables' data.<br>
Since this was the same for all requests, I used the File System packages writeFile method to overwrite the database with the new or removed data from the request.

<h3>May 29, 2020</h3>
<b>1:40pm - 2:20pm</b><br>

Started the creation of the next route of my server; [Users](https://github.com/ChristianPari/Intro-to-REST-APIs/blob/master/REST-API-v1/routes/usersRouter.js); Going to have a GET request for both the full database and individual users, a POST request to create a new user, a DELETE request to remove a user entry from the database and a PATCH request to update a users data, due to the fact that I don't want any fields to be removed I wont be using a PUT request becuase there is no need for a complete overwrite of data.<br>
The GET requests have been made for both the full database and the indivual user which uses a request paramter that is the users ID. Due to repetitious code I created a [mildware function to get the database data/read the .txt file](https://github.com/ChristianPari/Intro-to-REST-APIs/blob/master/REST-API-v1/middleware/getDB.js) and another [middleware function that validates that the value being requested is a number and within the range of IDs of the database](https://github.com/ChristianPari/Intro-to-REST-APIs/blob/master/REST-API-v1/middleware/validID.js), if valid then assigns it to a new request key/value pair, this way it can be used in the callback function of the request with ease.


<b>12:00pm - 1:00pm</b><br>

Created the server file [app.js](https://github.com/ChristianPari/Intro-to-REST-APIs/blob/master/REST-API-v1/app.js) and within it I configured and requried all the packages being used within this server, after then I middleware I needed that would be applied to all routes on this server; morgans property to delcare what way I want the requests being displayed in my console, express's json property to recognize that the Request data coming in is in JSON format, then another to serve the static homepage html and js I created for the root route.<br>
Created the enviorment file that is storing my port number.<br>
Next was to create the home route and I did this by creating a routes folder then within that I created a [homeRouter.js file](https://github.com/ChristianPari/Intro-to-REST-APIs/blob/master/REST-API-v1/routes/homeRouter.js) that would be used to handle the request made to the root route. Here I sent my [home html and js](https://github.com/ChristianPari/Intro-to-REST-APIs/tree/master/REST-API-v1/static) files when there is a GET request made to this route. For now it is just a heading "Home Page" and a log to console from the JS file for the webpage.<br>
Also created the [text file database](https://github.com/ChristianPari/Intro-to-REST-APIs/blob/master/REST-API-v1/database/db.txt) I will be using to test my server.<br>