import Mail from '../../lib/Mail';

class CancelDelivery {
  get key() {
    return 'CancelDelivery';
  }

  async handle({ data }) {
    const { updatedDelivery, problem } = data;

    await Mail.sendMail({
      to: `${updatedDelivery.deliveryman.name} <${updatedDelivery.deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancel-delivery',
      context: {
        deliveryman: updatedDelivery.deliveryman.name,
        product: updatedDelivery.product,
        name: updatedDelivery.recipient.name,
        zipCode: updatedDelivery.recipient.zipCode,
        number: updatedDelivery.recipient.number,
        complement: updatedDelivery.recipient.complement
          ? updatedDelivery.recipient.complement
          : 'Sem complemento',
        problem: problem.description,
      },
    });
  }
}

export default new CancelDelivery();
