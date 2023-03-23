'use strict';

/**
 * article-author service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article-author.article-author');
