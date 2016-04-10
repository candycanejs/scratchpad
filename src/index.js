/* @flow */

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';
import knex from 'knex';
import knexConfig from './knexfile';

const db = knex(knexConfig.development);

const app = express();
const upload = multer();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import Loader from 'candycane//loader';
import Router from 'candycane//router';
const loader = new Loader(__dirname);
const container = {
  loader,
  db,
};

const router = new Router(app, container);

app.get('/', (req, res) => {
  res.send('version 2');
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
