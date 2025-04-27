<<<<<<< HEAD
"use client"; // <-- Tambahkan ini di atas untuk menandakan ini adalah client-side rendering

import { useEffect, useState } from "react";
=======
>>>>>>> 8118a45268e443b64e2558bf8cd9613d7196fe7b
import axios from "@/lib/axios";
import Image from "next/image";

interface IEvents {
  id: number;
  title: string;
  image: string;
  eventDate: string;
  category: string;
  startTime: string;
  endTime: string;
  venue: string;
  location: string;
  organizer?: {
    avatar: string;
    fullname: string;
  };
}
<<<<<<< HEAD

export default function Page() {
  const [events, setEvents] = useState<IEvents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/events");
        setEvents(response.data.data); // Update state with fetched events
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading events...</div>; // Loading state
  }

=======
export default async function Page() {
  const response = await axios.get("/events");
  const events: IEvents[] = response.data.data;
>>>>>>> 8118a45268e443b64e2558bf8cd9613d7196fe7b
  const championship = events.filter((e) => e.category === "CHAMPIONSHIP");

  return (
    <div className="p-5 md:p-10">
<<<<<<< HEAD
      <h2 className="text-2xl font-bold text-white px-2 mt-12 md:px-8">All Category</h2>
=======
      <h2 className="text-2xl font-bold text-white px-2 mt-12 md:px-8">
        All Category
      </h2>
>>>>>>> 8118a45268e443b64e2558bf8cd9613d7196fe7b
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {championship.length > 0 ? (
          championship.map((event) => (
            <div
              key={event.id}
              className="w-auto h-auto rounded-lg shadow-md text-white border border-orange-400 relative"
            >
<<<<<<< HEAD
              {/* Category Badge */}
              <h3 className="absolute font-semibold right-0 top-3 px-2 bg-orange-600 rounded-l-md">
                {event.category}
              </h3>
              {/* Image */}
              <Image
                src={event.image || "/fallback-image.jpg"} // Fallback image
=======
              <h3 className="absolute font-semibold right-0 top-3 px-2 bg-orange-600 rounded-l-md">
                {event.category}
              </h3>
              <Image
                src={event.image}
>>>>>>> 8118a45268e443b64e2558bf8cd9613d7196fe7b
                alt={event.title}
                width={300}
                height={200}
                className="object-cover w-full rounded-t-md mb-2 overflow-hidden"
              />
<<<<<<< HEAD
              {/* Event Title */}
              <h3 className="text-lg font-semibold px-2">{event.title}</h3>
              {/* Venue */}
              <h4 className="text-base font-semibold px-2">{event.venue}</h4>
              {/* Location */}
              <p className="text-sm text-gray-300 p-2">{event.location}</p>
              {/* Event Date */}
=======
              <h3 className="text-lg font-semibold px-2">{event.title}</h3>
              <h4 className="text-base font-semibold px-2">{event.venue}</h4>
              <p className="text-sm text-gray-300 p-2">{event.location}</p>
>>>>>>> 8118a45268e443b64e2558bf8cd9613d7196fe7b
              <p className="text-sm text-gray-300 px-2">
                {new Date(event.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <hr className="text-white mx-2 my-5" />
<<<<<<< HEAD
              {/* Organizer Information */}
              <div className="flex items-center gap-3 m-2">
                <Image
                  src={event.organizer?.avatar || "/default-avatar.jpg"} // Fallback avatar
=======
              <div className="flex items-center gap-3 m-2">
                <Image
                  src={`${event.organizer?.avatar}`}
>>>>>>> 8118a45268e443b64e2558bf8cd9613d7196fe7b
                  height={40}
                  width={40}
                  alt="avatar-pic"
                />
<<<<<<< HEAD
                {event.organizer?.fullname || "Organizer Name"}
=======
                {event.organizer?.fullname}
>>>>>>> 8118a45268e443b64e2558bf8cd9613d7196fe7b
              </div>
            </div>
          ))
        ) : (
<<<<<<< HEAD
          <div className="p-0 md:p-8 text-white">There are no Matches Available</div>
=======
          <div className="p-0 md:p-8 text-white">There is no Match Available</div>
>>>>>>> 8118a45268e443b64e2558bf8cd9613d7196fe7b
        )}
      </div>
    </div>
  );
}
