'use strict';

/**
 * custom-user controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::custom-user.custom-user',({strapi})=>({
    async login(ctx){

        await this.validateQuery(ctx);
   
        // @ts-ignore
        const { username, password } = ctx.request.body;

        // Ensure both email and password are provided
        if (!username || !password) {
          return ctx.badRequest('Email and password are required.');
        }

        // Use Strapi's query API to find the user by email
        // @ts-ignore
        const user = await strapi.db.query('api::custom-user.custom-user').findOne({ where:{username}});


        if (!user) {
          return ctx.badRequest('User not found.');
        }

        // Verify password (considering the password is hashed)
        const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(password, user.password);

        if (!validPassword) {
          return ctx.badRequest('Invalid password.');
        }

        // Generate JWT token for the user
        const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
          id: user.id,
        });

        // Return the JWT token and user info
        ctx.send({
          jwt,
          user: {
            id: user.id,
            username: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            // Add other user fields you want to return
          },
        });
     },

     // create action to register user
        async register(ctx){

            await this.validateQuery(ctx);
            
            // @ts-ignore
            const { username, password, firstname, lastname } = ctx.request.body;
    
            // Ensure all required fields are provided
            if (!username || !password || !firstname || !lastname) {
            return ctx.badRequest('All fields are required.');
            }
    

            // Check if the user already exists
            // @ts-ignore
            const user = await strapi.db.query('api::custom-user.custom-user').findOne({
            where: { username },
            });
    
            if (user) {
            return ctx.badRequest('User already exists.');
            }
    
      
    
            // Create the user
            // @ts-ignore
            const newUser = await strapi.service('api::custom-user.custom-user').create(
                {
                data: {
                    username,
                    password,
                    firstname,
                    lastname,
                    // Add other user fields you want to save
                },
                }
            );
    
            // Generate JWT token for the user
            const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
            id: newUser.id,
            });
    
            // Return the JWT token and user info
            ctx.send({
            jwt,
            user: {
                id: newUser.id,
                username: newUser.email,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                // Add other user fields you want to return
            },
            });
        }
}));
