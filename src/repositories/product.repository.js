export class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = () => this.dao.getAll();
  getById = id => this.dao.getById(id);
  create = product => this.dao.create(product);
  update = (id, updates) => this.dao.update(id, updates);
  delete = id => this.dao.delete(id);
}
