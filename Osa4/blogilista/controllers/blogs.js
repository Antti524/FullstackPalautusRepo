const blogsRouter = require('express').Router()
const { request } = require('http')
const { update } = require('lodash')
const { response } = require('../app')
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { name: 1 })
    response.json(blogs)
    /* Vanha Malli ennen muutosta async muotoon.
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })*/
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = request.user
    if (user === undefined || user.id === undefined || !user.id) {
        return response.status(401).json({ error: 'Unauthorized' })
    }

    if (body.title === undefined || body.url === undefined) {
        response.status(400).end()
    } else {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })
        console.log(request.body)

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    //Tokenin purku ja varmistus
    const user = request.user
    //Jos Token ei sisällä ID kenttää
    if (!user.id) {
        return response.status(401).json({ error: 'Unauthorized' })
    }
    //Poistajan tunnistaminen ja poistettavan tietojen hakeminen
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'something went' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blogUpdatedLikes = { likes: body.likes }
    await Blog.findByIdAndUpdate(request.params.id, blogUpdatedLikes)
    response.status(201).end()
})

module.exports = blogsRouter