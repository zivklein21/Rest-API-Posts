const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const post_model = require("../models/post_model");

beforeAll(async () => {
    console.log('beforeAll');
    await post_model.deleteMany();
});

afterAll((done) => {
    console.log("afterAll");
    mongoose.connection.close();
    done();
});

var postId = "";
const testPost = {
    title: "Test title",
    content: "Test content",
    owner: "Ziv Klein"
};

const invalidPost = {
    title: "Test title",
    content: "Test content",
};


describe("Posts test suite", () => {
    test("Post test get all posts", async () => {
        const response = await request(app).get("/allPosts");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(0);
    });

    test("Test Adding new post", async () => {
        const response = await request(app).post("/newPost").send(testPost);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(testPost.title);
        expect(response.body.content).toBe(testPost.content);
        expect(response.body.owner).toBe(testPost.owner);
        postId = response.body._id;
    });

    test("Test Adding invalid post", async () => {
        const response = await request(app).post("/newPost").send(invalidPost);
        expect(response.statusCode).not.toBe(201);
    });

    test("Test get all posts after adding", async () => {
        const response = await request(app).get("/allPosts");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    test("Test get post by owner", async () => {
        const response = await request(app).get("/post?sender=" + testPost.owner);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].owner).toBe(testPost.owner);
    });

    test("Test get post by id", async () => {
        const response = await request(app).get("/post/"+postId);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(postId);
    })


});