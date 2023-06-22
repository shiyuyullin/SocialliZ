const Post = require("../models/post");
const { faker } = require("@faker-js/faker");

function generateRandomPosts(numOfPosts) {
  const randomPosts = [];
  for (let i = 0; i < numOfPosts; i++) {
    randomPosts.push(
      new Post({
        title: faker.person.jobTitle(),
        content: faker.person.jobDescriptor(),
        imageUrl: faker.image.urlLoremFlickr(),
        creator: "630fa14d8af166139cdef825",
      })
    );
  }
  return randomPosts;
}

module.exports = { generateRandomPosts };
