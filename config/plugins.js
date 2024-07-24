module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('disaly54t'),
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
  