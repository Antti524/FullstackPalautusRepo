const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const apuri = require('./test_helper')
const User = require('../models/user')
const { response } = require('../app')

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(apuri.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(apuri.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(apuri.initialBlogs[2])
    await blogObject.save()
})

describe('Api tests:', () => {

    test('Adding new user first', async () => {
        console.log('Testit alkaa')
        await User.deleteMany({})
        let userObject = apuri.user
        console.log(userObject)
        const newUser = await api
            .post('/api/users')
            .send(userObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        console.log('Tallennettu käyttäjä testissä on:', JSON.stringify(newUser.body))
        const hlö = await apuri.usersInDB()
        console.log('Käyttäjät tietokannassa', hlö.length)
    })

    test('Blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are three blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(apuri.initialBlogs.length)
    })

    test('the first note is about HTTP methods', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].title).toBe('Spring')
    })

    test('id is defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('Adding one more to DB', async () => {
        let extraBlogObject = new Blog(apuri.extraBlog[0])
        await extraBlogObject.save()
        expect(apuri.initialBlogs.length + 1).toBe(4)
    })

    test('null likes given', async () => {
        const blogWhitNullLikes = {
            title: 'Kun kukaan ei tykkää',
            author: 'Se "ei kukaan"',
            url: 'www.poissa.blog'
        }
        //Kirjautuminen ja token talteen
        console.log('kirjaudutaan sisään')
        const responseUser = await api
            .post('/api/login')
            .send({
                "username": "testi3",
                "password": "Salainen"
            })
            .expect(200)
        const loginToken = responseUser.body.token //Kirjautumisesta saadaan token talteen
        console.log('Token on:', loginToken)


        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loginToken}`) //Tämä lisää tokenin viestiin
            .send(blogWhitNullLikes)
            .expect(201)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(apuri.initialBlogs.length + 1)
    })

    test('undefined url given', async () => {
        const blogWhitOutUrl = {
            title: 'Kun kukaan ei tykkää',
            author: 'Se "ei kukaan"',
            likes: 4
        }

        const responseUser = await api
            .post('/api/login')
            .send({
                "username": "testi3",
                "password": "Salainen"
            })
            .expect(200)
        const loginToken = responseUser.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loginToken}`)
            .send(blogWhitOutUrl)
            .expect(400)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(apuri.initialBlogs.length)
    })

    test('undefined title given', async () => {
        const blogWhitOutUrl = {
            author: 'Se "ei kukaan"',
            url: 'www.poissa.blog',
            likes: 4
        }

        const responseUser = await api
            .post('/api/login')
            .send({
                "username": "testi3",
                "password": "Salainen"
            })
            .expect(200)
        const loginToken = responseUser.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loginToken}`)
            .send(blogWhitOutUrl)
            .expect(400)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(apuri.initialBlogs.length)
    })

    test('Test whitout toke expecting status 401', async () => {
        await api
            .post('/api/blogs')
            .send(apuri.initialBlogs[1])
            .expect(401)
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            await Blog.deleteMany({}) //tuhotaan blogit tästä testistä
            const responseUser = await api // kirjaudutaan sisään tokenin saamiseksi
                .post('/api/login')
                .send({
                    "username": "testi3",
                    "password": "Salainen"
                })
                .expect(200)
            const loginToken = responseUser.body.token

            await api //luodaan pohjalle yksi blogi
                .post('/api/blogs')
                .set('Authorization', `Bearer ${loginToken}`)
                .send(apuri.initialBlogs[0])
                .expect(201)

            const blogsAtStart = await apuri.blogsInDB() //tarkastetaan että blogeja on 1
            const blogToDelete = blogsAtStart[0]
            console.log('Tuhottava blogi on:', blogToDelete)
            await api //lisätty blogi tuhotaan
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${loginToken}`)
                .expect(204)

            const blogsAtEnd = await apuri.blogsInDB()

            expect(blogsAtEnd).toHaveLength(0)

            const authors = blogsAtEnd.map(r => r.author)

            expect(authors).not.toContain(blogToDelete.author)
        })
    })

    describe('update likes value', () => {
        test('succeeds when likes are 99 in index 0', async () => {
            const blogsAtStart = await apuri.blogsInDB()
            const blogToPut = blogsAtStart[0]
            const blogLikes = { likes: 99 }

            await api
                .put(`/api/blogs/${blogToPut.id}`)
                .send(blogLikes)
                .expect(201)

            const blogsAtEnd = await apuri.blogsInDB()

            expect(blogsAtEnd[0].likes).toBe(99)
        })
    })

    describe('POST new user:', () => {
        test('Too shot name(only 2 marks)', async () => {
            const usersAtStart = await apuri.usersInDB()
            const errorUser = {
                username: "te",
                name: "Testi hölö",
                password: "Salainen"
            }

            await api
                .post('/api/users')
                .send(errorUser)
                .expect(400)

            const userAtEnd = await apuri.usersInDB()

            expect(userAtEnd.length).toBe(1)
        })

        test('Too shot password(only 2 marks)', async () => {
            const usersAtStart = await apuri.usersInDB()
            const errorUser = {
                username: "testi4",
                name: "Testi hölö2",
                password: "en"
            }

            await api
                .post('/api/users')
                .send(errorUser)
                .expect(400)

            const userAtEnd = await apuri.usersInDB()

            expect(userAtEnd.length).toBe(1)
        })

        test('New user added', async () => {
            const usersAtStart = await apuri.usersInDB()
            const errorUser = {
                username: "testihenkilö",
                name: "Testi hölö",
                password: "Salainen"
            }

            await api
                .post('/api/users')
                .send(errorUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const userAtEnd = await apuri.usersInDB()

            expect(userAtEnd.length).toBe(2)
        })
    })


    afterAll(() => {
        mongoose.connection.close()
    })
})