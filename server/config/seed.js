/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Comment from '../api/comment/comment.model';

Comment.find({}).remove()
  .then(() => {
    Comment.create({
      email: 'shemesh.royee@gmail.com',
      message: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
            + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
            + 'Stylus, Sass, and Less.'
    }, {
      email: 'Server and Client integration',
      message: 'Built with a powerful and fun stack: MongoDB, Express, '
            + 'AngularJS, and Node.'
    }, {
      email: 'Smart Build System',
      message: 'Build system ignores `spec` files, allowing you to keep '
            + 'tests alongside code. Automatic injection of scripts and '
            + 'styles into your index.html'
    }, {
      email: 'Modular Structure',
      message: 'Best practice client and server structures allow for more '
            + 'code reusability and maximum scalability'
    }, {
      email: 'Optimized Build',
      message: 'Build process packs up your templates as a single JavaScript '
            + 'payload, minifies your scripts/css/images, and rewrites asset '
            + 'names for caching.'
    }, {
      email: 'Deployment Ready',
      message: 'Easily deploy your app to Heroku or Openshift with the heroku '
            + 'and openshift subgenerators'
    });
  });

