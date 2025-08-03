export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  findByEmail(email) {
    return this.dao.findByEmail(email);
  }

  create(user) {
    return this.dao.create(user);
  }

  findById(id) {
    return this.dao.findById(id);
  }

  updatePassword(id, password) {
    return this.dao.updatePassword(id, password);
  }
}
