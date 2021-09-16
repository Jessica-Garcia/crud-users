import 'reflect-metadata';
import express from 'express';
import './database';
import './shared/container'

const app = express();

app.use(express.json());

app.listen(3333, () => {
  console.log('Server is running');
})