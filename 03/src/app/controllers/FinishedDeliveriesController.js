import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class FinishedDeliveriesController {
  async index(req, res) {
    const { deliverymanId } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(deliverymanId);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const deliveried = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymanId,
        end_date: { [Op.not]: null },
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (deliveried.length === 0) {
      return res.json({
        message: 'You did not deliveried any deliveries yet',
      });
    }

    return res.json(deliveried);
  }
}

export default new FinishedDeliveriesController();
