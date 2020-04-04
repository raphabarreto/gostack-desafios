import * as Yup from 'yup';

import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { q: delivery = '', page = 1 } = req.query;

    const deliveries = await Delivery.findAll({
      limit: 10,
      where: {
        product: { [Op.iLike]: `%${delivery}%` },
      },
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'product',
        'created_at',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'zipCode',
            'complement',
            'state',
            'city',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { deliveryId } = req.params;

    const delivery = await Delivery.findOne({
      where: { id: deliveryId },
      attributes: [
        'id',
        'product',
        'created_at',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'zipCode',
            'complement',
            'state',
            'city',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { product, recipient_id, deliveryman_id, signature_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'This recipient does not exists' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res
        .status(400)
        .json({ error: 'This deliveryman does not exists' });
    }

    const { id } = await Delivery.create({
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
    });

    const delivery = await Delivery.findByPk(id, {
      attributes: [
        'id',
        'product',
        'created_at',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'state',
            'city',
            'zipCode',
            'complement',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    await Queue.add(NewDeliveryMail.key, {
      delivery,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const { deliveryId } = req.params;

    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
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

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      res.status(400).json({ error: 'Delivery not found' });
    }

    const {
      id,
      product,
      recipient_id,
      signature_id,
      deliveryman_id,
      start_date,
      end_date,
      canceled_at,
    } = await delivery.update(req.body);
    return res.json({
      id,
      product,
      recipient_id,
      signature_id,
      deliveryman_id,
      start_date,
      end_date,
      canceled_at,
    });
  }

  async delete(req, res) {
    const { deliveryId } = req.params;

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    await delivery.destroy();

    return res.json({ message: 'Delivery removed with success' });
  }
}

export default new DeliveryController();
