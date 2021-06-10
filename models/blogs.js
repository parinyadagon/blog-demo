const mongoose = require('mongoose');
const mongo = require('mongodb');
const dbUrl = 'mongodb://localhost:27017/bloggerDB';

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

const db = mongoose.connection;
const Schema = mongoose.Schema;

const blogSchema = {
    id: { type: Schema.ObjectId },
    title: { type: String, required: true },
    category: { type: String, required: true},
    description: { type: String, required: true},
    author: { type: String, required: true }    
}

const Blogs = module.exports = mongoose.model('blogs', blogSchema);

//บันทึก
module.exports.createBlog = function(newBlogs, callback){
        newBlogs.save(callback);
}

//แสดง
module.exports.getAllBlogs = function(data){
        Blogs.find(data);
}

//ลบ
module.exports.deleteBlog = (id, callback) => {
    Blogs.findByIdAndDelete(id, callback);
}

//แกไข
module.exports.getBlogId = (id, callback) => {
    //เงื่อนไข
    var query = {
        _id: id
    }
    Blogs.findOne(query, callback);
}

module.exports.updateBlog = (data, callback) => {
    var query = {
        _id: data.id
    }
    Blogs.findByIdAndUpdate(query, {
        $set: {
            title: data.title,
            category: data.category,
            description: data.description,
            author: data.author
        }
    }, {new: true}, callback);
}