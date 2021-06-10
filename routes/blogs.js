var express = require('express');
var router = express.Router();
const Blogs = require('../models/blogs');
const { body, validationResult } = require('express-validator');

router.get('/', function(req, res, next){
    Blogs.getAllBlogs(function(err, blogs){
        if (err) throw err;
    res.render('blogs/index', { title: 'My blogs', blogs: blogs });
    })
});

router.get('/add', function(req, res, next){
    res.render('blogs/addblogs', { title: 'เขียนบทความ' });
});

// บันทึกข้อมูล
router.post('/add',
// เช็คค่าว่าง
    body('title', 'กรุณาใส่ชื่อบทความ').not().isEmpty(),
    body('category', 'กรุณาระบุหมวดหมู่').not().isEmpty(),
    body('description', 'กรุณาใส่รายละเอียด').not().isEmpty(),
    body('author', 'กรุณาใส่ชื่อผู้เขียน').not().isEmpty(),
    function(req, res, next){
        const result = validationResult(req);
        var errors = result.errors;
        for (var key in errors) {
            console.log(errors[key].value);
        }
        if(!result.isEmpty()){
            res.render('blogs/addblogs', { title: 'เขียนบทความ', errors: errors });
        }else{
            data = new  Blogs({
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                author: req.body.author
            })
            Blogs.createBlog(data, function(err){
                console.log(err);
                res.redirect('/blogs');
            });
        }
});

//ลบข้อมูล
router.get('/delete/:id', (req, res, next) => {
    Blogs.deleteBlog([req.params.id], (err) => {
        if (err) throw err
        console.log('Delete Complete');
        res.redirect('/blogs');
    });
});

//แก้ไขข้อมูล
router.get('/edit/:id', (req, res, next) => {
    Blogs.getBlogId([req.params.id], (err, blog) => {
        if (err) throw err
        res.render('blogs/editform', { data: 'แก้ไขบทความ', blog: blog });
    });
});

router.post('/update',
// เช็คค่าว่าง
    body('title', 'กรุณาใส่ชื่อบทความ').not().isEmpty(),
    body('category', 'กรุณาระบุหมวดหมู่').not().isEmpty(),
    body('description', 'กรุณาใส่รายละเอียด').not().isEmpty(),
    body('author', 'กรุณาใส่ชื่อผู้เขียน').not().isEmpty(),
    function(req, res, next){
        const result = validationResult(req);
        var errors = result.errors;
        for (var key in errors) {
            console.log(errors[key].value);
        }
        if(!result.isEmpty()){
            res.redirect('/blogs');
        }else{
            data = new  Blogs({
                id: req.body.id,
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                author: req.body.author
            })
            Blogs.updateBlog(data, function(err){
                console.log(err);
                res.redirect('/blogs');
            });
        }
});

module.exports = router;