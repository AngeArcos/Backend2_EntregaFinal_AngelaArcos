export class ProductController {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res) => {
    const products = await this.service.getAll();
    res.json({ status: 'success', products });
  };

  getById = async (req, res) => {
    const { pid } = req.params;
    const product = await this.service.getById(pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', product });
  };

  create = async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin') return res.status(403).json({ message: 'Solo admins pueden crear productos' });

    const product = await this.service.create(req.body);
    res.status(201).json({ status: 'success', product });
  };

  update = async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin') return res.status(403).json({ message: 'Solo admins pueden actualizar productos' });

    const updated = await this.service.update(req.params.pid, req.body);
    res.json({ status: 'success', product: updated });
  };

  delete = async (req, res) => {
    const { role } = req.user;
    if (role !== 'admin') return res.status(403).json({ message: 'Solo admins pueden eliminar productos' });

    await this.service.delete(req.params.pid);
    res.json({ status: 'success', message: 'Producto eliminado' });
  };
}