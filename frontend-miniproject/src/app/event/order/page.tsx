"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/lib/axios";
import Image from "next/image";

interface IEvent {
  id: number;
  title: string;
  image: string;
  eventDate: string;
  location: string;
  startTime: string;
  endTime: string;
}

export default function OrderPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const totalTickets = searchParams.get("total");
  const totalPrice = searchParams.get("price");

  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);

  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEvent(response.data.data);
      } catch (error) {
        console.error("Failed to fetch event", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmitOrder = async () => {
    if (!buyerName || !buyerEmail || !event) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post("/orders", {
        eventId: event.id,
        buyerName,
        buyerEmail,
        totalTickets: Number(totalTickets),
        totalPrice: Number(totalPrice),
      });
      alert("Order successful!");
      // redirect to payment page or success page
    } catch (error) {
      console.error(error);
      alert("Order failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  }

  if (!event) {
    return <div className="flex items-center justify-center h-screen text-white">Event not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Order Ticket</h1>

      {/* Event Info */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 space-y-4">
        <div className="w-full h-40 relative rounded overflow-hidden">
          <Image src={event.image} alt={event.title} fill className="object-cover" />
        </div>
        <h2 className="text-xl text-white font-bold">{event.title}</h2>
        <p className="text-gray-400 text-sm">
          {new Date(event.eventDate).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })} - {event.startTime} to {event.endTime}
        </p>
        <p className="text-gray-400 text-sm">Location: {event.location}</p>
        <p className="text-white font-semibold">Total: {totalTickets} ticket(s) - IDR {Number(totalPrice).toLocaleString("id-ID")}</p>
      </div>

      {/* Buyer Info */}
      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmitOrder}
          disabled={submitting}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded mt-4 transition"
        >
          {submitting ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
