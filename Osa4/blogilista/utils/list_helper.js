const { findIndex } = require('lodash')
var _ = require('lodash') // Var oli lodash sivuilla ohjeena, mutta tuntuu kurssin ohjeeseen nähden väärältä.
const blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        const likes = blogs[0].likes
        //console.log(blogs)
        return likes
    } else {
        /* Johan oli olioon pureutuminen.
        const likes = blogs.reduce((sum, { likes, value }) => {
            sum[likes] = value + (sum[likes.likes]) || 0
            return sum
        }) */
        const likes = blogs.reduce((sum, { likes, value }) => {
            //console.log('sum.like = ', sum.likes)
            // console.log('value on = ', value) // Määrittämätön
            //console.log('parseInt(likes) = ', parseInt(likes))
            if (sum.likes === undefined) {
                sum = sum + parseInt(likes)
            } else {
                sum = parseInt(sum.likes) + parseInt(likes)
            }
            //console.log('sum is = ', sum)
            return sum
        })
        return likes // .likes otettiin pois
    }
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    //console.log('Mostlikes value is: ', mostLikes)
    const index = blogs.map(blog => blog.likes).indexOf(mostLikes)
    //console.log('Blogin indexi on: ', index)
    return index
}

const mostBlogs = (blogs) => {
    const array2 = blogs.map(blog => blog.author)
    //console.log('Kirjoittajien lista:', array2)
    const array3 = _.countBy(array2, String)
    //console.log('Määrä blogeja kirjailijalta:', array3)
    const arrValues = Object.values(array3)
    //console.log('arrValues sisältää:', arrValues)
    const indexArr = arrValues.indexOf(Math.max(...arrValues))
    //console.log('Eniten blogeja on indexillä:', indexArr)
    const objArr = Object.keys(array3)
    //console.log('Tiedot objArr: ', objArr)
    const mostBlogswriter = { author: objArr[indexArr], blogs: arrValues[indexArr] }
    //console.log('mostBlogswriter is:', mostBlogswriter)
    return mostBlogswriter
}

const mostLikes = (blogs) => {
    function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
            const key = obj[property];
            const curGroup = acc[key] ?? [];

            return { ...acc, [key]: [...curGroup, obj] };
        }, {});
    }
    const mostlikesArray1 = blogs.map(blog => [blog.author, blog.likes])
    //console.log('Tässä on MostlikesArray1', mostlikesArray1)
    /*
    const mostlikesArray2 = _.countBy(mostlikesArray1, String)
    console.log('Tässä on MostlikesArray2', mostlikesArray2)
    const mostlikesArray3 = _.map(_.countBy(blogs, "author"), (val, key) => ({ author: key, total: val }))
    console.log('Tässä on mostlikesArray3', mostlikesArray3)
    const mostlikesArray4 = groupBy(blogs, "author")
    console.log('Tässä on mostlikesArray4', mostlikesArray4)
    console.log('Tässä on mostlikesArray4 lisätiedot', Object.keys(mostlikesArray4)) */
    const mostlikesArray5 = groupBy(mostlikesArray1, [0])
    //console.log('Tässä on mostlikesArray5', mostlikesArray5)
    //console.log('Tässä on mostlikesArray5 lisätiedot', Object.keys(mostlikesArray5))
    const authors = Object.keys(mostlikesArray5)
    let b = []
    const a = Object.keys(mostlikesArray5).forEach(function (key, index) {
        b.push(_.sum(mostlikesArray5[key].map(o => o[1])))
        //mostlikesArray5[key].map(o => 0[1])
    })
    //console.log('hei indexsi on', b.indexOf(Math.max(...b)))
    const indexMostLikes = b.indexOf(Math.max(...b))
    const ValueOfMostLikes = { author: authors[indexMostLikes], likes: b[indexMostLikes] }
    return ValueOfMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}