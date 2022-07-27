import Axios from 'axios';
import {API_URL} from '../config';

class APIRoot {
  path;

  constructor(path) {
    this.path = path;
  }

  api(headers = {}) {
    return Axios.create({
      baseURL: `${API_URL}${this.path}`,
      headers: {
        'Content-Type': 'application/json',
        ...(headers ?? {}),
      },
    });
  }
}

export default APIRoot;
