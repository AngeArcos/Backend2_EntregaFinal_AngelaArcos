import { v4 as uuidv4 } from 'uuid';

export class PurchaseService {
  constructor(cartRepository, productRepository, ticketRepository) {
    this.cartRepo = cartRepository;
    this.productRepo = productRepository;
    this.ticketRepo = ticketRepository;
  }

  async processPurchase(cartId, userEmail) {
    const cart = await this.cartRepo.getById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = cart.products.filter(p => p.product !== null && p.product !== undefined);

    const purchasable = [];
    const notAvailable = [];
    let total = 0;

    for (const item of cart.products) {
      const productRef = item.product;

      const product = await this.productRepo.getById(productRef._id);
      if (!product) {
        notAvailable.push(item);
        continue;
      }

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await this.productRepo.update(product._id, { stock: product.stock });

        purchasable.push(item);
        total += product.price * item.quantity;
      } else {
        notAvailable.push(item);
      }
    }


    await this.cartRepo.update(cartId, { products: notAvailable });

    const ticket = {
      code: uuidv4(),
      amount: total,
      purchaser: userEmail
    };

    const savedTicket = await this.ticketRepo.create(ticket);

    return {
      ticket: savedTicket,
      notPurchased: notAvailable
    };
  }
}

