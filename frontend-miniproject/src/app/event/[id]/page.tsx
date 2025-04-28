"use client";

import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import Image from "next/image";
import { notFound } from "next/navigation";

interface IEvent {
  id: number;
  title: string;
  image: string;
  eventDate: string;
  category: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
}

interface EventPageProps {
  params: { id: string };
}

interface ITicket {
  id: number;
  type: string;
  price: number;
}

// Dummy Ticket Data
const dummyTickets: ITicket[] = [
  { id: 1, type: "EAST", price: 1000000 },
  { id: 2, type: "WEST", price: 500000 },
  { id: 3, type: "SOUTH", price: 250000 },
  { id: 4, type: "NORTH", price: 450000 },
];

export default function EventDetailPage({ params }: EventPageProps) {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"description" | "ticket">("description");

  // Ticket quantity state
  const [ticketQuantities, setTicketQuantities] = useState<{ [ticketId: number]: number }>({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/events/${params.id}`);
        setEvent(response.data.data);
      } catch (error) {
        console.error("Failed to fetch event", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!event) {
    notFound();
  }

  // Calculate total ticket and price
  const totalTickets = Object.values(ticketQuantities).reduce((a, b) => a + b, 0);
  const totalPrice = dummyTickets.reduce((sum, ticket) => {
    return sum + (ticket.price * (ticketQuantities[ticket.id] || 0));
  }, 0);

  const handleQuantityChange = (ticketId: number, type: "increment" | "decrement") => {
    setTicketQuantities((prev) => {
      const currentQty = prev[ticketId] || 0;
      if (type === "increment") {
        return { ...prev, [ticketId]: currentQty + 1 };
      } else {
        return { ...prev, [ticketId]: Math.max(0, currentQty - 1) };
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Left Side */}
      <div className="md:col-span-2 space-y-8">
        
        {/* Event Image */}
        <div className="w-full overflow-hidden mt-12 rounded-lg">
          <Image
            src={event.image}
            alt={event.title}
            width={1200}
            height={600}
            className="object-cover w-full h-auto"
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8">
            <button
              className={`py-4 text-sm font-semibold ${
                activeTab === "description"
                  ? "text-white border-b-2 border-orange-500"
                  : "text-gray-400 hover:text-white hover:border-b-2 hover:border-white"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`py-4 text-sm font-semibold ${
                activeTab === "ticket"
                  ? "text-white border-b-2 border-orange-500"
                  : "text-gray-400 hover:text-white hover:border-b-2 hover:border-white"
              }`}
              onClick={() => setActiveTab("ticket")}
            >
              Ticket
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        <div className="space-y-6 text-gray-300">
          {activeTab === "description" && (
            <>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Description</h2>
                <p className="leading-relaxed">{event.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Terms and Conditions</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Tickets are only available through the official platform.</li>
                  <li>Tickets are non-refundable unless the event is canceled.</li>
                  <li>Please bring a valid ID and proof of purchase to the event.</li>
                </ul>
              </div>
            </>
          )}

          {activeTab === "ticket" && (
            <div className="space-y-6">
              {dummyTickets.map((ticket) => (
                <div key={ticket.id} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white">{ticket.type} Ticket</h3>
                    <p className="text-gray-400 text-sm">Price: IDR {ticket.price.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(ticket.id, "decrement")}
                      className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
                    >
                      -
                    </button>
                    <span className="text-white">{ticketQuantities[ticket.id] || 0}</span>
                    <button
                      onClick={() => handleQuantityChange(ticket.id, "increment")}
                      className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Right Sidebar */}
      <div className="bg-gray-900 rounded-2xl mt-12 p-6 space-y-6 shadow-lg h-fit">

        {/* Event Info */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-orange-400">{event.category} Match</p>
          <h1 className="text-2xl font-bold text-white">{event.title}</h1>
        </div>

        {/* Event Details */}
        <div className="text-sm text-gray-400 space-y-2">
          <p><span className="font-semibold text-white">Date:</span> {new Date(event.eventDate).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}</p>
          <p><span className="font-semibold text-white">Time:</span> {event.startTime} - {event.endTime}</p>
          <p><span className="font-semibold text-white">Location:</span> {event.location}</p>
        </div>

        {/* Ticket Section */}
        <div className="border-t border-gray-700 pt-4 space-y-4">
          <div className="flex justify-between items-center text-white font-bold">
            <span>Total {totalTickets} ticket(s)</span>
            <span>IDR {totalPrice.toLocaleString("id-ID")}</span>
          </div>
          <button
            disabled={totalTickets === 0}
            className={`w-full transition py-3 rounded-lg font-bold text-center ${
              totalTickets > 0 ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          >
            {totalTickets > 0 ? "Order Ticket" : "Select Ticket First"}
          </button>
        </div>

        {/* Share Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <span className="text-sm text-gray-400">Share Match</span>
          <div className="flex items-center space-x-4 text-white">
            <button className="hover:scale-110 transition">🔗</button>
            <button className="hover:scale-110 transition">📩</button>
            <button className="hover:scale-110 transition">🟢</button>
          </div>
        </div>

      </div>

    </div>
  );
}
