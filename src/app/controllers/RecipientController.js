import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();
    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      address_number: Yup.number().required(),
      complement: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip_code: Yup.string()
        .matches(/^\d{5}-\d{3}$/)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id, name, address, city } = await Recipient.create(req.body);

    return res.json({ id, name, address, city });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      address: Yup.string(),
      address_number: Yup.number(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zip_code: Yup.string().matches(/^\w{5}-\w{3}$/),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist ' });
    }

    const { id, name, address, city } = await recipient.update(req.body);

    return res.json({ id, name, address, city });
  }
}

export default new RecipientController();
