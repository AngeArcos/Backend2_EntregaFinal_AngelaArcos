export class PurchaseController {
  constructor(service) {
    this.service = service;
  }

  processPurchase = async (req, res) => {
    try {
      const { cid } = req.params;
      const userEmail = req.user.email;

      const result = await this.service.processPurchase(cid, userEmail);
      res.json({ status: 'success', ...result });
    } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  };
}
