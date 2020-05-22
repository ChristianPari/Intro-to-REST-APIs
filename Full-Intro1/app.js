require('dotenv').config();
const express = require('express'),
    morgan = require('morgan'),
    app = express(),
    port = process.env.PORT || 3000,
    reqBodyLog = require('./middleware/reqBodyLog');

console.log(`Created by: ${process.env.AUTHOR}`);

let database = {
    movies: [{
            title: `The Avengers`,
            release: 2012,
            img: `images/ta.jpg`,
            desc: `When Thor's evil brother, Loki (Tom Hiddleston), gains access to the unlimited power of the energy cube called the Tesseract, Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth. Joining Fury's "dream team" are Iron Man (Robert Downey Jr.), Captain America (Chris Evans), the Hulk (Mark Ruffalo), Thor (Chris Hemsworth), the Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner).`,
            rentID: `TAG12`,
            genre: `action`,
            ref: `https://www.imdb.com/title/tt0848228/?ref_=fn_al_tt_1`,
            available: true
        },
        {
            title: `Guardians of the Galaxy`,
            release: 2014,
            img: `images/gotg.jpg`,
            desc: `Brash space adventurer Peter Quill (Chris Pratt) finds himself the quarry of relentless bounty hunters after he steals an orb coveted by Ronan, a powerful villain. To evade Ronan, Quill is forced into an uneasy truce with four disparate misfits: gun-toting Rocket Raccoon, treelike-humanoid Groot, enigmatic Gamora, and vengeance-driven Drax the Destroyer. But when he discovers the orb's true power and the cosmic threat it poses, Quill must rally his ragtag group to save the universe.`,
            rentID: `GOG14`,
            genre: `action`,
            ref: `https://www.imdb.com/title/tt2015381/?ref_=fn_al_tt_1`,
            available: false
        },
        {
            title: `Spider-Man: Homecoming`,
            release: 2017,
            img: `images/smh.jpg`,
            desc: `Thrilled by his experience with the Avengers, young Peter Parker returns home to live with his Aunt May. Under the watchful eye of mentor Tony Stark, Parker starts to embrace his newfound identity as Spider-Man. He also tries to return to his normal daily routine -- distracted by thoughts of proving himself to be more than just a friendly neighborhood superhero. Peter must soon put his powers to the test when the evil Vulture emerges to threaten everything that he holds dear.`,
            rentID: `SMH17`,
            genre: `action`,
            ref: `https://www.imdb.com/title/tt2250912/?ref_=nv_sr_srsg_6`,
            available: true
        },
        {
            title: `Iron Man`,
            release: 2008,
            img: `images/im.jpg`,
            desc: `A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon. Instead, he builds an armored suit and upends his captors. Returning to America, Stark refines the suit and uses it to combat crime and terrorism.`,
            rentID: `IMN08`,
            genre: `action`,
            ref: `https://www.imdb.com/title/tt0371746/?ref_=fn_al_tt_1`,
            available: true
        },
        {
            title: `Black Panther`,
            release: 2017,
            img: `images/bp.jpg`,
            desc: `After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king. When a powerful enemy suddenly reappears, T'Challa's mettle as king -- and as Black Panther -- gets tested when he's drawn into a conflict that puts the fate of Wakanda and the entire world at risk. Faced with treachery and danger, the young king must rally his allies and release the full power of Black Panther to defeat his foes and secure the safety of his people.`,
            rentID: `BPN17`,
            genre: `action`,
            ref: `https://www.imdb.com/title/tt1825683/?ref_=fn_al_tt_1`,
            available: false
        },
        {
            title: `Doctor Strange`,
            release: 2016,
            img: `images/ds.jpg`,
            desc: `Dr. Stephen Strange's (Benedict Cumberbatch) life changes after a car accident robs him of the use of his hands. When traditional medicine fails him, he looks for healing, and hope, in a mysterious enclave. He quickly learns that the enclave is at the front line of a battle against unseen dark forces bent on destroying reality. Before long, Strange is forced to choose between his life of fortune and status or leave it all behind to defend the world as the most powerful sorcerer in existence.`,
            rentID: `DST16`,
            genre: `action`,
            ref: `https://www.imdb.com/title/tt1211837/?ref_=fn_al_tt_1`,
            available: true
        },
        {
            title: `Thor: Ragnarok`,
            release: 2017,
            img: `images/tr.jpg`,
            desc: `Imprisoned on the other side of the universe, the mighty Thor finds himself in a deadly gladiatorial contest that pits him against the Hulk, his former ally and fellow Avenger. Thor's quest for survival leads him in a race against time to prevent the all-powerful Hela from destroying his home world and the Asgardian civilization`,
            rentID: `TRN17`,
            genre: `action`,
            ref: `https://www.imdb.com/title/tt3501632/?ref_=fn_al_tt_1`,
            available: false
        },
        {
            title: `Captian America: Civil War`,
            release: 2016,
            img: `images/cacw.jpg`,
            desc: `Political pressure mounts to install a system of accountability when the actions of the Avengers lead to collateral damage. The new status quo deeply divides members of the team. Captain America (Chris Evans) believes superheroes should remain free to defend humanity without government interference. Iron Man (Robert Downey Jr.) sharply disagrees and supports oversight. As the debate escalates into an all-out feud, Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner) must pick a side.`,
            rentID: `CACW16`,
            genre: `action`,
            ref: `https://www.imdb.com/title/tt3498820/?ref_=fn_al_tt_1`,
            available: false
        }
    ],
    users: []
};

app.use(morgan('dev')); // used to get console logs of the requests being made
app.use(express.json()); // used to parse data in my request body that's json
app.use(express.static(__dirname + '/static')); // needed when we are using files that aren't changing like CSS
//^ Place before calback function in the GET request

// ######################### Route Handling #########################
const homeRouter = require('./routes/homeRouter'),
    usersRouter = require('./routes/usersRouter');

app.use('/', homeRouter); // hands off any request made to the root route to the homeRouter file

app.use('/users', usersRouter); // hands off any request made to the root route to the userRouter file

app.listen(port, () => { console.log(`Listening on Port:${port}`) });

//* All code below this comment is from a youtube tutorial on setting up REST APIs
{
    // app.use(express.json());
    // const port = process.env.PORT || 2000;
    // const courses = [
    //     { id: 1, name: 'course1' },
    //     { id: 2, name: 'course2' },
    //     { id: 3, name: 'course3' }
    //];
    // app.get('/', (req, res) => {
    //     res.send('Hello World!!!');
    // });

    // app.get('/api/courses', (req, res) => {
    //     res.send(courses);
    // });

    // app.post('/api/courses', (req, res) => {
    //     const course = {
    //         id: courses.length + 1,
    //         name: req.body.name
    //     };
    //     courses.push(course);
    //     res.send(course);
    // });

    // app.get('/api/courses/:id', (req, res) => {
    //     const course = courses.find(c => c.id === parseInt(req.params.id));

    //     if (!course) res.status(404).send('The course with the given ID was not found'); // return status 404 NOT FOUND
    //     res.send(course);
    // });

    // app.get('/api/posts/:year/:month', (req, res) => {
    //     res.send(req.query);
    // });

    // app.listen(port, () => console.log(`Listening on port: ${port}`));
}

//* All code below was from a walkthrough during class
{
    // require('dotenv').config();

    // const express = require('express'),
    //     port = process.env.PORT;

    // console.log(`Created by: ${process.env.AUTHOR}`);

    // let app = express();

    // let database = [

    //     {
    //         title: `The Avengers`,
    //         release: 2012,
    //         img: `images/ta.jpg`,
    //         desc: `When Thor's evil brother, Loki (Tom Hiddleston), gains access to the unlimited power of the energy cube called the Tesseract, Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth. Joining Fury's "dream team" are Iron Man (Robert Downey Jr.), Captain America (Chris Evans), the Hulk (Mark Ruffalo), Thor (Chris Hemsworth), the Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner).`,
    //         rentID: `TAG12`,
    //         genre: `action`,
    //         ref: `https://www.imdb.com/title/tt0848228/?ref_=fn_al_tt_1`,
    //         available: true
    //     },
    //     {
    //         title: `Guardians of the Galaxy`,
    //         release: 2014,
    //         img: `images/gotg.jpg`,
    //         desc: `Brash space adventurer Peter Quill (Chris Pratt) finds himself the quarry of relentless bounty hunters after he steals an orb coveted by Ronan, a powerful villain. To evade Ronan, Quill is forced into an uneasy truce with four disparate misfits: gun-toting Rocket Raccoon, treelike-humanoid Groot, enigmatic Gamora, and vengeance-driven Drax the Destroyer. But when he discovers the orb's true power and the cosmic threat it poses, Quill must rally his ragtag group to save the universe.`,
    //         rentID: `GOG14`,
    //         genre: `action`,
    //         ref: `https://www.imdb.com/title/tt2015381/?ref_=fn_al_tt_1`,
    //         available: false
    //     },
    //     {
    //         title: `Spider-Man: Homecoming`,
    //         release: 2017,
    //         img: `images/smh.jpg`,
    //         desc: `Thrilled by his experience with the Avengers, young Peter Parker returns home to live with his Aunt May. Under the watchful eye of mentor Tony Stark, Parker starts to embrace his newfound identity as Spider-Man. He also tries to return to his normal daily routine -- distracted by thoughts of proving himself to be more than just a friendly neighborhood superhero. Peter must soon put his powers to the test when the evil Vulture emerges to threaten everything that he holds dear.`,
    //         rentID: `SMH17`,
    //         genre: `action`,
    //         ref: `https://www.imdb.com/title/tt2250912/?ref_=nv_sr_srsg_6`,
    //         available: true
    //     },
    //     {
    //         title: `Iron Man`,
    //         release: 2008,
    //         img: `images/im.jpg`,
    //         desc: `A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon. Instead, he builds an armored suit and upends his captors. Returning to America, Stark refines the suit and uses it to combat crime and terrorism.`,
    //         rentID: `IMN08`,
    //         genre: `action`,
    //         ref: `https://www.imdb.com/title/tt0371746/?ref_=fn_al_tt_1`,
    //         available: true
    //     },
    //     {
    //         title: `Black Panther`,
    //         release: 2017,
    //         img: `images/bp.jpg`,
    //         desc: `After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king. When a powerful enemy suddenly reappears, T'Challa's mettle as king -- and as Black Panther -- gets tested when he's drawn into a conflict that puts the fate of Wakanda and the entire world at risk. Faced with treachery and danger, the young king must rally his allies and release the full power of Black Panther to defeat his foes and secure the safety of his people.`,
    //         rentID: `BPN17`,
    //         genre: `action`,
    //         ref: `https://www.imdb.com/title/tt1825683/?ref_=fn_al_tt_1`,
    //         available: false
    //     },
    //     {
    //         title: `Doctor Strange`,
    //         release: 2016,
    //         img: `images/ds.jpg`,
    //         desc: `Dr. Stephen Strange's (Benedict Cumberbatch) life changes after a car accident robs him of the use of his hands. When traditional medicine fails him, he looks for healing, and hope, in a mysterious enclave. He quickly learns that the enclave is at the front line of a battle against unseen dark forces bent on destroying reality. Before long, Strange is forced to choose between his life of fortune and status or leave it all behind to defend the world as the most powerful sorcerer in existence.`,
    //         rentID: `DST16`,
    //         genre: `action`,
    //         ref: `https://www.imdb.com/title/tt1211837/?ref_=fn_al_tt_1`,
    //         available: true
    //     },
    //     {
    //         title: `Thor: Ragnarok`,
    //         release: 2017,
    //         img: `images/tr.jpg`,
    //         desc: `Imprisoned on the other side of the universe, the mighty Thor finds himself in a deadly gladiatorial contest that pits him against the Hulk, his former ally and fellow Avenger. Thor's quest for survival leads him in a race against time to prevent the all-powerful Hela from destroying his home world and the Asgardian civilization`,
    //         rentID: `TRN17`,
    //         genre: `action`,
    //         ref: `https://www.imdb.com/title/tt3501632/?ref_=fn_al_tt_1`,
    //         available: false
    //     },
    //     {
    //         title: `Captian America: Civil War`,
    //         release: 2016,
    //         img: `images/cacw.jpg`,
    //         desc: `Political pressure mounts to install a system of accountability when the actions of the Avengers lead to collateral damage. The new status quo deeply divides members of the team. Captain America (Chris Evans) believes superheroes should remain free to defend humanity without government interference. Iron Man (Robert Downey Jr.) sharply disagrees and supports oversight. As the debate escalates into an all-out feud, Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner) must pick a side.`,
    //         rentID: `CACW16`,
    //         genre: `action`,
    //         ref: `https://www.imdb.com/title/tt3498820/?ref_=fn_al_tt_1`,
    //         available: false
    //     }

    // ];

    // app.get('/', (req, res) => {

    //     // data you can send
    //     // .json({message: "hi"});
    //     // .send('Welcome!');
    //     // .sendFile();

    //     res.json({ message: 'Welcome to my Home Page' });

    // });

    // app.get('/about', (req, res) => {

    //     res.send('Learn more about me!');

    // });

    // app.get('/query', (req, res) => {

    //     const q = req.query,
    //         name = q.name,
    //         saying = q.saying,
    //         color = q.color;

    //     console.log(req.query);
    //     res.json({
    //         status: 200,
    //         message: `A person named ${name} has a favorite color and it's ${color}. His catchphrase is '${saying}'`
    //     });

    // });

    // app.get('/movies', (req, res) => {

    //     res.json({
    //         message: 'All the movies in our database',
    //         all_movies: database
    //     });

    // });

    // app.get('/movies/:id', (req, res) => {

    //     console.log(req.params);

    //     const moviePick = parseInt(req.params.id);

    //     if (isNaN(moviePick)) {

    //         res.json({
    //             status: 404,
    //             message: `The selection you make must be between 1 and ${database.length}`
    //         });

    //     } else if (moviePick > 0 && moviePick < database.length) {

    //         res.json({
    //             status: 200,
    //             message: `You picked the movie '${database[moviePick - 1].title}'`,
    //             movie: database[moviePick - 1]
    //         });

    //     } else {

    //         res.json({
    //             status: 404,
    //             message: `'${moviePick}' is not in the range of movies`,
    //             valid_range: `1 - ${database.length}`
    //         });

    //     }

    // });

    // app.listen(port, () => {

    //     console.log(`Application listening on Port:${port}`);

    // });
}