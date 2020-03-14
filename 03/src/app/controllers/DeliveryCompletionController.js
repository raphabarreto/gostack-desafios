import { parseISO, startOfDay, isBefore } from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryCompletionController {
  async update(req, res) {
    const { deliverymanId, deliveryId } = req.params;

    const delivery = await Delivery.findByPk(deliveryId);
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    const deliveryman = await Deliveryman.findByPk(deliverymanId);
    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'The signature needs to be sent' });
    }

    if (!delivery.start_date) {
      return res
        .status(401)
        .json({ error: 'This delivery has not yet been withdrawn' });
    }

    if (delivery.canceled_at || delivery.end_date) {
      return res.status(400).json({ error: 'Delivery closed' });
    }

    const { end_date } = req.body;
    const parsedDate = parseISO(end_date);

    if (isBefore(parsedDate, startOfDay(new Date()))) {
      return res.status(401).json({ error: 'Date invalid' });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    await delivery.update({
      signature_id: file.id,
      end_date: new Date(),
    });

    await delivery.reload({
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
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
          model: Deliveryman,
          as: 'deliveryman',
          include: [
            {
              model: File,
              as: 'avatar',
            },
          ],
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(delivery);
  }
}

export default new DeliveryCompletionController();
