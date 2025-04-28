import express, { Application, Request, Response } from "express";
import { AuthRouter } from "./routers/auth.router";
import cors from "cors";
import { AuthoRouter } from "./routers/autho.router";
import { RewardRouter } from "./routers/reward.router";
import { EventRouter } from "./routers/event.router";
import path from "path";
import { OrganizerRouter } from "./routers/organizer.router";
import { TicketRouter } from "./routers/ticket.router";

const PORT: number = 8000;

const app: Application = express();
app.use(express.json());
app.use(cors());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send({
    status: "success",
    message: "Welcome to my API",
  });

  
});

app.use("/api/public", express.static(path.join(__dirname, "../public")))

const authRouter = new AuthRouter();
app.use("/api/auth", authRouter.getRouter());

const authoRouter = new AuthoRouter();
app.use("/api/autho", authoRouter.getRouter());

const rewardRouter = new RewardRouter();
app.use("/api/rewards", rewardRouter.getRouter());

const eventRouter = new EventRouter();
app.use("/api/events", eventRouter.getRouter());

const organizerRouter = new OrganizerRouter();
app.use("/api/organizers", organizerRouter.getRouter());

const ticketRouter = new TicketRouter();
app.use("/api/tickets", ticketRouter.getRouter());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
