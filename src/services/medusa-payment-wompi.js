import { AbstractPaymentService, TransactionBaseService, Cart } from "@medusajs/medusa";
import { Wompi } from "wompi-node";

class WompiProvider extends AbstractPaymentService {
  static identifier = "wompi";


constructor(TransactionBaseService, options) {
    super(TransactionBaseService, options);
    this.wompi = new Wompi({
      publicKey: options.public_key,
      privateKey: options.private_key,
    });
    this.TransactionBaseService = TransactionBaseService;
  }

    async createPaymentSession(data) {
    const { amount, currency_code, metadata } = data;

    const session = await this.wompi.createPaymentSession({
      amount_in_cents: amount,
      currency: currency_code,
      reference: metadata.order_id,
      payment_method_types: ["CARD", "PSE", "CASH", "BANK_TRANSFER","NEQUI"],
    });

    return {
      id: session.id,
      url: session.url,
    };
  }

    async retrievePayment(data){
    const { id } = data;
    const payment = await this.wompi.retrievePayment(id);
    return payment;
  }

    async getStatus (data) {
    const { id } = data;
    const payment = await this.wompi.retrievePayment(id);
    return payment.status;
  }
   async updatePayment(data, Cart) {
    const { id, metadata } = data;
    const payment = await this.wompi.updatePayment(id, {
      metadata: {
        order_id: metadata.order_id,
        cart_id: metadata.cart_id,
      },
    });
    return payment;
  }
  async updatePaymentData(data, Cart) {
    const { id, metadata } = data;
    const payment = await this.wompi.updatePayment(id, {
      metadata: {
        order_id: metadata.order_id,
        cart_id: metadata.cart_id,
      },
    });
    return payment;
  }
  async deletePayment(data) {
    const { id } = data;
    const payment = await this.wompi.deletePayment(id);
    return payment;
  }
  async authorizePayment(data) {
    const { id } = data;
    const payment = await this.wompi.authorizePayment(id);
    return payment;
  }
  async getPaymentData(data) {
    const { id } = data;
    const payment = await this.wompi.retrievePayment(id);
    return payment;
  }
  async capturePayment(data) { 
    const { id } = data;
    const payment = await this.wompi.capturePayment(id);
    return payment;
  }
  async refundPayment(data) {
    const { id } = data;
    const payment = await this.wompi.refundPayment(id);
    return payment;
  }
    async cancelPayment(data) {
    const { id } = data;
    const payment = await this.wompi.cancelPayment(id);
    return payment;
  }
    }
