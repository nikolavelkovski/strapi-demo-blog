/**
 * post service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::post.post", ({ strapi }) => ({
  // Method 1: Creating an entirely new custom service
  async exampleService(...args) {
    let response = { okay: true };
    console.log(args);
    if (response.okay === false) {
      return { response, error: true };
    }

    return response;
  },

  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args) {
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);

    // some custom logic
    results.forEach((result) => {
      result.counter = 1;
    });

    return { results, pagination };
  },

  // Method 3: Replacing a core service
  // async findOne(entityId, params = {}) {
  //   return strapi.entityService.findOne(
  //     "api::restaurant.restaurant",
  //     entityId,
  //     this.getFetchParams(params)
  //   );
  // },

  async findPublic(args) {
    const newQuery = {
      ...args,
      filters: {
        ...args.filters,
        premium: false,
      },
    };
    const publicPosts = await strapi.entityService.findMany(
      "api::post.post",
      this.getFetchParams(newQuery)
    );
    return publicPosts;
  },

  async findOneIfPublic(args) {
    const { id, query } = args;
    const post = await strapi.entityService.findOne(
      "api::post.post",
      id,
      this.getFetchParams(query)
    );
    console.log(post);
    return post.premium ? null : post;
  },

  async likePost(args) {
    const { postId, userId, query } = args;

    const postsToLike = await strapi.entityService.findOne(
      "api::post.post",
      postId,
      {
        populate: ["likedBy"],
      }
    );

    const updatedPost = await strapi.entityService.update(
      "api::post.post",
      postId,
      {
        data: {
          likedBy: [...postsToLike.likedBy, userId],
        },
        ...query,
      }
    );
    return updatedPost;
  },
}));
