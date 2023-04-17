/**
 * post controller
 */

import { factories } from "@strapi/strapi";
import post from "../routes/post";

export default factories.createCoreController(
  "api::post.post", ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
      await strapi.service("api::post.post").exampleService({ myPAram: "example" })
      try {
        ctx.body = 'ok';
      } catch (err) {
        ctx.body = err;
      }
    },

    // Solution 1 fetch all posts and filter
    // async find(ctx) {
    //   const {data, meta} = await super.find(ctx)

    //   if(ctx.state.user) return {data,meta}

    //   const filteredData = data.filter(post => post.attributes.premium)
    //   return {data:filteredData, meta}
    // },


    //Solution 2  shaping query object directly from controller
      // async find(ctx){
      //   const inRequestingNonPremium =ctx.query.filters && ctx.query.filters.premium ===false
      //   if(ctx.state.user || inRequestingNonPremium ) return await super.find(ctx)
      //   const {query} = ctx;
      //   const filteredPosts = await strapi.service('api::post.post').find({
      //     ...query,
      //     filters:{
      //       ...query.filters,
      //       premium: false,
      //     }
      //   })

      //   const sanitizedPosts = await this.sanitizeOutput(filteredPosts,ctx)
      //   return this.transformResponse(sanitizedPosts)
      // },
      async find(ctx){
        const  isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium === false;
        if(ctx.state.user || isRequestingNonPremium) return await super.find(ctx)
 
        const publicPosts = await strapi.service("api::post.post").findPublic(ctx.query)
        const sanitizedPosts = await this.sanitizeOutput(publicPosts, ctx)
        return this.transformResponse(sanitizedPosts)
      },
      async findOne(ctx){
        if(ctx.state.user) return await super.findOne(ctx)
        const { id } = ctx.params
        const { query } = ctx
        const postIfPublic = await strapi.service("api::post.post").findOneIfPublic({
          id,query
        })
        const sanitizedEntity = await this.sanitizeOutput(postIfPublic, ctx)
        return this.transformResponse(sanitizedEntity)
      },
      async likePost(ctx){
        if(!ctx.state.user) return ctx.forbidden("Only aunthenticated users can like")
        const user = ctx.state.user 
        const postId = ctx.params.id
        const { query } = ctx
        const updatedPost = await strapi.service("api::post.post").likePost({
          postId, userId: user.id, query
        })
        const sanitizedEntity = await this.sanitizeOutput(updatedPost,ctx)
        return this.transformResponse(sanitizedEntity)
      }

   
  }));