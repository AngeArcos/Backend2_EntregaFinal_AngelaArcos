export class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getCart = id => this.dao.getCart(id);
  createCart = () => this.dao.createCart();
  addToCart = (cid, pid) => this.dao.addToCart(cid, pid);
  update = (cid, data) => this.dao.update(cid, data);

  getById = id => this.getCart(id);
}
