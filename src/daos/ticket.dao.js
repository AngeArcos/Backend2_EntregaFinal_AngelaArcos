import { TicketModel } from '../models/ticket.model.js';

export class TicketDAO {
  async create(ticket) {
    return await TicketModel.create(ticket);
  }
}
