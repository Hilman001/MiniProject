// import { Request, Response } from "express";
// import prisma from "../prisma";

// export class TicketController {
//   /**
//    * Create a new ticket
//    */
//   public createTicket = async (req: Request, res: Response): Promise<Response> => {
//     const { eventId, category, price, quantity } = req.body;

//     // Basic validation
//     if (!eventId || !category || price == null || quantity == null) {
//       return res.status(400).json({ error: "All fields are required: eventId, category, price, quantity." });
//     }

//     try {
//       const ticket = await prisma.ticket.create({
//         data: {
//           eventId,
//           category,
//           price: Number(price),
//           quantity: Number(quantity),
//         },
//       });

//       return res.status(201).json(ticket);
//     } catch (error) {
//       console.error("Error creating ticket:", error);
//       return res.status(500).json({ error: "Failed to create ticket." });
//     }
//   };

//   /**
//    * Get all tickets
//    */
//   public getTickets = async (_req: Request, res: Response): Promise<Response> => {
//     try {
//       const tickets = await prisma.ticket.findMany({
//         orderBy: { createdAt: 'desc' },
//       });
//       return res.status(200).json(tickets);
//     } catch (error) {
//       console.error("Error fetching tickets:", error);
//       return res.status(500).json({ error: "Failed to fetch tickets." });
//     }
//   };

//   /**
//    * Get a ticket by ID
//    */
//   public getTicketById = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;

//     try {
//       const ticket = await prisma.ticket.findUnique({
//         where: { id },
//       });

//       if (!ticket) {
//         return res.status(404).json({ error: "Ticket not found." });
//       }

//       return res.status(200).json(ticket);
//     } catch (error) {
//       console.error("Error fetching ticket:", error);
//       return res.status(500).json({ error: "Failed to fetch ticket." });
//     }
//   };

//   /**
//    * Update a ticket by ID
//    */
//   public updateTicket = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
//     const { category, price, quantity } = req.body;

//     if (!category && price == null && quantity == null) {
//       return res.status(400).json({ error: "At least one field (category, price, quantity) is required to update." });
//     }

//     try {
//       const updatedTicket = await prisma.ticket.update({
//         where: { id },
//         data: {
//           ...(category !== undefined && { category }),
//           ...(price !== undefined && { price: Number(price) }),
//           ...(quantity !== undefined && { quantity: Number(quantity) }),
//         },
//       });

//       return res.status(200).json(updatedTicket);
//     } catch (error) {
//       console.error("Error updating ticket:", error);
//       return res.status(500).json({ error: "Failed to update ticket." });
//     }
//   };

//   /**
//    * Delete a ticket by ID
//    */
//   public deleteTicket = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;

//     try {
//       await prisma.ticket.delete({ where: { id } });
//       return res.status(200).json({ message: "Ticket deleted successfully." });
//     } catch (error) {
//       console.error("Error deleting ticket:", error);
//       return res.status(500).json({ error: "Failed to delete ticket." });
//     }
//   };
// }
