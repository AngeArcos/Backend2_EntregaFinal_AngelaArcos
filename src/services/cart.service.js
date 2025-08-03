export class CartService {
  constructor(repository) {
    this.repository = repository;
  }

  getCart = id => this.repository.getCart(id);
  createCart = () => this.repository.createCart();
  addToCart = (cid, pid) => this.repository.addToCart(cid, pid);
}
