import Mail from '../../lib/Mail';

class NewDelivery {
  get key() {
    return 'NewDelivery';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Nova entrega a ser retirada',
      template: 'new-delivery',
      context: {
        createdAt: delivery.product,
        deliveryman: delivery.deliveryman.name,
        product: delivery.product,
        street: delivery.recipient.street,
        number: delivery.recipient.number,
        state: delivery.recipient.state,
        city: delivery.recipient.city,
        complement: delivery.recipient.complement
          ? delivery.recipient.complement
          : 'Sem complemento',
        zipCode: delivery.recipient.zipCode,
      },
    });
  }
}

export default new NewDelivery();
