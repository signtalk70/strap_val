module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('signtalkval'),
          api_key: env('368596498861456'),
          api_secret: env('dmo7rKJEBuY6cWfSBEcfuGaqIN4'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
    // ...
  });
  