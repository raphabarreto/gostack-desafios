import * as Yup from 'yup';

import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { q: recipientName = '', page = 1 } = req.query;

    const recipients = await Recipient.findAll({
      limit: 10,
      where: {
        name: { [Op.iLike]: `%${recipientName}%` },
      },
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'city',
        'state',
        'zipCode',
      ],
    });

    return res.json(recipients);
  }

  async show(req, res) {
    const { recipientId } = req.params;

    const recipient = await Recipient.findOne({
      where: { id: recipientId },
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'city',
        'state',
        'zipCode',
      ],
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipCode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      zipCode,
      state,
      city,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      zipCode,
      state,
      city,
    });
  }

  async update(req, res) {
    const { recipientId } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zipCode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    if (!req.body) {
      return res.status(400).json({
        error: 'At least 1 atrribute should be updated',
      });
    }

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) {
      res.status(400).json({ error: 'Recipient not found' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipCode,
    } = await recipient.update(req.body);
    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipCode,
    });
  }

  async delete(req, res) {
    const { recipientId } = req.params;

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    await recipient.destroy();

    return res.json({ message: 'Recipient removed with success' });
  }
}

export default new RecipientController();
