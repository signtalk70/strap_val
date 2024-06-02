'use strict';

/**
 * sign service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sign.sign');
