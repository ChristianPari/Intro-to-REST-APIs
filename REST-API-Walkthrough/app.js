require('dotenv').config();
const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 2000;
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    //! Need to define a SCHEMA w/ Joi
    //* const result = validateCourse(req.body); same as below
    const { error } = validateCourse(req.body);

    // 400 bad request
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('The course with the given ID was not found'); // return status 404 NOT FOUND
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course with the id
    // If not exist, return 404 not found
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('The course with the given ID was not found'); // return status 404 NOT FOUND

    // validate
    // if invalid, return 400 - bad request
    //* const result = validateCourse(req.body); same as below
    const { error } = validateCourse(req.body);

    // 400 bad request
    if (error) return res.status(400).send(error.details[0].message);

    // update course
    // return the updated course
    course.name = req.body.name;

    res.send(course);

});

function validateCourse(course) {

    const SCHEMA = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, SCHEMA);

};

app.delete('/api/courses/:id', (req, res) => {
    // look up course
    // not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('The course with the given ID was not found'); // return status 404 NOT FOUND

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return the same course
    res.send(course);

});

app.listen(port, () => console.log(`Listening on port: ${port}`));