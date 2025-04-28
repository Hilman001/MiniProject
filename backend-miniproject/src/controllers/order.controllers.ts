// import { Request, Response } from "express";
// import prisma from "../prisma";

// import { CreateInvoiceRequest } from "xendit-node/invoice/models";
// import { StatusOrder } from "../../prisma/generated/client";
// import xendit from "../helpers/xendit";

// export class OrderController {
//   async createOrder(req: Request, res: Response) {
//     try {
//       const { ticketId, qty, amount } = req.body;

//       await prisma.$transaction(async (tx) => {
//         const order = await tx.order.create({
//           data: {
//             ticketId,
//             qty,
//             amount,
//             status: "PENDING",
//             expiredAt: new Date(Date.now() + 60 * 60 * 1000),
//             customerId: req.customer?.id!,
//           },
//         });

//         await tx.ticket.update({
//           data: { quantity: { decrement: qty } },
//           where: { id: ticketId },
//         });

//         const data: CreateInvoiceRequest = {
//           amount,
//           invoiceDuration: "3600",
//           externalId: order.id,
//           description: `Invoice order with Id ${order.id}`,
//           currency: "IDR",
//           reminderTime: 1,
//         };

//         const invoice = await xendit.Invoice.createInvoice({ data });

//         await tx.order.update({
//           data: { invoiceUrl: invoice.invoiceUrl },
//           where: { id: order.id },
//         });

//         res.status(201).send({ message: "Order Created ✅", invoice });
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(400).send(err);
//     }
//   }

//   async updateStatus(req: Request, res: Response) {
//     try {
//       const { status, external_id } = req.body;

//       if (status == StatusOrder.PAID) {
//         await prisma.order.update({
//           data: { status: "PAID" },
//           where: { id: external_id },
//         });
//       } else if (status == StatusOrder.EXPIRED) {
//         await prisma.$transaction(async (tx) => {
//           await tx.order.update({
//             data: { status: "EXPIRED" },
//             where: { id: external_id },
//           });

//           const order = await tx.order.findUnique({
//             where: { id: external_id },
//           });

//           await tx.ticket.update({
//             data: { quantity: { increment: order?.qty } },
//             where: { id: order?.ticketId },
//           });
//         });
//       }

//       res.status(201).send({ message: "Success ✅" });
//     } catch (err) {
//       console.log(err);
//       res.status(400).send(err);
//     }
//   }
// }