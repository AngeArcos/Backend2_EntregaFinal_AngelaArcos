export class ProductService {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = () => this.repository.getAll();
  getById = id => this.repository.getById(id);
  create = product => this.repository.create(product);
  update = (id, updates) => this.repository.update(id, updates);
  delete = id => this.repository.delete(id);
}
