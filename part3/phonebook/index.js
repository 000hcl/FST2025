require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')


app.use(express.static('dist'))

app.use(cors())

app.use(express.json())


morgan.token('body', (req) => {
  return JSON.stringify(req.body)
}
)

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req)
  ].join(' ')
}))


app.get('/api/persons', (request, response) => {
    Person.find({}).then(p => {
      response.json(p)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(p => {
    response.json(p)
  })
  .catch((error) => next(error))
  
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person({
    "name": body.name,
    "number": body.number
  })
  person.save().then(savedP => {
    response.json(savedP)
  })

})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id'})
  }

  next(error)
  
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})