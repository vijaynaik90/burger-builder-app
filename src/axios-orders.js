import axios from 'axios';

const instance = axios.create ({
  baseURL:'https://burger-builder-baefa.firebaseio.com/'
});

export default instance;
