
export class CartController {
  constructor(service) {
    this.service = service;
  }

  getCart = async (req, res) => {
    const { cid } = req.params;
    const cart = await this.service.getCart(cid);
    res.json({ status: 'success', cart });
  };

  createCart = async (req, res) => {
    const cart = await this.service.createCart();
    res.status(201).json({ status: 'success', cart });
  };

  addToCart = async (req, res) => {
    const { role } = req.user;
    if (role !== 'user') return res.status(403).json({ message: 'Solo usuarios pueden agregar productos al carrito' });

    const { cid, pid } = req.params;
    const cart = await this.service.addToCart(cid, pid);
    res.json({ status: 'success', cart });
  };
}