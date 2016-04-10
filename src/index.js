/* @flow */

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';
import knex from 'knex';
import knexConfig from './knexfile';
import Bookshelf from 'bookshelf';
import Mapper from 'jsonapi-mapper';
var mapper = new Mapper.Bookshelf(`http://localhost:3000`);

const db = knex(knexConfig.development);
const store = Bookshelf(db);

store.plugin('registry');

store.model(`Post`, store.Model.extend({
  tableName: `posts`,

  comments() {
    return this.hasMany(`Comment`);
  },
}));

store.model(`Comment`, store.Model.extend({
  tableName: `comments`,

  post() {
    return this.belongsTo(`Post`);
  },
}));

const app = express();
const upload = multer();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import Loader from 'candycane/lib/loader';
import Router from 'candycane/lib/router';
const loader = new Loader(__dirname);
const container = {
  loader,
  db,
  store,
  mapper,
};

const router = new Router(app, container);

app.get('/', (req, res) => {
  res.send('version 2');
});

router.resource('/posts', 'posts', (router) => {
  router.get('/', 'index');
});

router.resource('/courses', 'courses', (router) => {
  router.get('/', 'index');
});

router.resource('/users', 'users', (router) => {
  router.get('/:id', 'show');
  router.delete('/:id', 'destroy');
  router.get('/', 'index');
});

router.post('/login', 'auth/login');

export default app;
