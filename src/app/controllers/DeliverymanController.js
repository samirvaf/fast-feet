import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path'],
        },
      ],
    });

    return res.json(deliverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email, avatar_id } = req.body;

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists) {
      return res.status(401).json({ error: 'Email already exists ' });
    }

    const avatarExists = await File.findByPk(avatar_id);

    if (avatar_id && !avatarExists) {
      return res.status(401).json({ error: 'Avatar ID does not exist' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(401).json({ error: 'No body provided' });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman ID does not exist' });
    }

    const { avatar_id } = req.body;

    const avatarExists = await File.findByPk(avatar_id);

    if (avatar_id && !avatarExists) {
      return res.status(401).json({ error: 'Avatar ID does not exist' });
    }

    await deliveryman.update(req.body);

    return res.json(deliveryman);
  }

  async destroy(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman ID does not exist' });
    }

    await deliveryman.destroy();

    return res.json({ destroy: 'ok' });
  }
}

export default new DeliverymanController();
