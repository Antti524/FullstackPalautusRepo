const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Spring',
        author: 'Bob The Blob',
        url: 'bob.blog.eu',
        likes: 5
    },
    {
        title: 'Kevät koittaa',
        author: 'Heikki Hela',
        url: 'Heikki.hela.eu',
        likes: 3
    },
    {
        title: 'Vain kevään takia',
        author: 'Haikailija Haiku',
        url: 'Hai.on.kala',
        likes: 7
    }
]

const extraBlog = [
    {
        title: 'Aamusta iltaan',
        author: 'Töissä käyvä isä',
        url: 'isi.hoitaa.com',
        likes: 99
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const user =
{
    "username": "testi3",
    "name": "Testi hölö",
    "password": "Salainen"
}

module.exports = {
    initialBlogs,
    extraBlog,
    blogsInDB,
    usersInDB,
    user
}