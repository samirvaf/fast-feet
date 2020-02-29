import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

class SessionController {
  async store(req, res) {
    return res.json();
  }
}

export default new SessionController();
