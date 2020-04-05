import * as Yup from 'yup';

import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliveryManController {
  async index(req, res) {
    const { q: deliverymanName = '', page = 1 } = req.query;

    const deliverymen = await Deliveryman.findAll({
      limit: 10,
      where: {
        name: { [Op.iLike]: `%${deliverymanName}%` },
      },
      offset: (page - 1) * 10,
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymen);
  }

  async show(req, res) {
    const { deliverymanId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId, {
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      res.status(400).json({ error: 'Deliveryman not found' });
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const deliveryManExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliveryManExists) {
      return res
        .status(400)
        .json({ error: 'This deliveryman already exists!' });
    }

    const { id, name, email, avatar_id } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res) {
    const { deliverymanId } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    if (!req.body) {
      return res.status(400).json({
        error: 'At least one option should be updated',
      });
    }

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      res.status(400).json({ error: 'Deliveryman not found' });
    }

    const { name, email, avatar_id } = await deliveryman.update(req.body);
    return res.json({
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const { deliverymanId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      res.status(400).json({ error: 'Deliveryman not found' });
    }

    await deliveryman.destroy();

    return res.json({ sucess: 'Deleted with success' });
  }
}

export default new DeliveryManController();
