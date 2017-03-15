// noinspection Eslint
console.info(`JS bundle transpiled: ${__VERSION__}`);
module.exports = process.env.NODE_ENV === 'production' ? require('./app.prod') : require('./app.dev');
