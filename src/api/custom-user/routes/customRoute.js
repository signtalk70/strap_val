module.exports = {
    routes:[
        {
            method: "POST",
            path: "/custom-user/login",
            handler: "custom-user.login",
            config: {
              auth: false,
            }
          } ,
          {
            method: 'POST',
            path: '/custom-user/register',
            handler: 'custom-user.register', //
            config: {
              auth: false,
            },
          }
        
    ]
}