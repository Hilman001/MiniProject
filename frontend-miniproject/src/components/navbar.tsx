"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CgCloseR, CgMenuLeft } from "react-icons/cg";
import MenuDesktop from "./menud";
import MenuMobile from "./menum";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const toggleMenu = () => setIsOpen(!isOpen);
  const { data: session } = useSession();
  const isLogin = !!session;
  const router = useRouter(); // useRouter hook for navigation

  const handleSearch = () => {
  if (searchQuery.trim()) {
    router.push(`/dismatch?search=${searchQuery}`); // arahkan ke /dismatch
  }
};

  return (
    <nav className="fixed top-0 bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 shadow-md w-screen z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              <Image
                src="/NewHoopPass.svg"
                width={250}
                height={100}
                alt="hooppass-logo"
                className="w-auto h-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search for matches..."
                className="px-4 py-2 rounded-sm bg-gray-200 mr-4"
              />

              <button
                onClick={handleSearch}
                className="bg-orange-500 text-white px-4 py-2 rounded-sm hover:bg-orange-400"
              >
                Search
              </button>
            </div>
            <Link
              href="/match"
              className="text-gray-800 py-2 rounded-lg font-semibold transition duration-300 text-shadow-sm hover:text-white hover:text-shadow-gray-800"
            >
              Create Match
            </Link>
            <Link
              href="/dismatch"
              className="text-gray-800 px-4 py-2 rounded-lg font-semibold transition duration-300 text-shadow-sm hover:text-white hover:text-shadow-gray-800"
            >
              Discover Match
            </Link>
            {!isLogin ? (
              <MenuDesktop />
            ) : (
              <>
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center gap-3 cursor-pointer w-full"
                  >
                    <div>
                      <Image
                        src={
                          session.user.avatar ||
                          "https://res.cloudinary.com/dexlqslwj/image/upload/v1744257672/blank-image_yfczs3_ogl5pp.jpg"
                        }
                        height={40}
                        width={40}
                        alt="avatar"
                        className="rounded-full"
                      />
                    </div>
                    <div className="text-gray-800 font-medium text-left text-sm">
                      <div>{session.user?.fullname}</div>
                      <div>{session.user.email}</div>
                    </div>
                  </button>
                  {/* Avatar Menu */}
                  {isOpen && (
                    <div
                      className="absolute right-0 top-13 w-full bg-gradient-to-br from-orange-300 to-orange-400 rounded-b-md shadow-lg py-1 font-semibold text-center"
                      onClick={toggleMenu}
                    >
                      {session.user.role === "CUSTOMER" && (
                        <Link
                          href={`/profile/${session.user.username}`}
                          className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 transition duration-300"
                        >
                          Profile
                        </Link>
                      )}
                      {session.user.role === "ORGANIZER" && (
                        <Link
                          href={`/dashboard/${session.user.username}`}
                          className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 transition duration-300"
                        >
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="block w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-300 cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Burger Icon */}
          <div className="md:hidden flex items-center px-7">
            <button
              onClick={toggleMenu}
              className="text-black font-bold cursor-pointer"
            >
              {isOpen ? <CgCloseR size={24} /> : <CgMenuLeft size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-gradient-to-br from-orange-200 to-orange-400 shadow-lg border-t"
          onClick={toggleMenu}
        >
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search for matches..."
              className="px-4 py-2 rounded-sm bg-gray-200 mr-4"
            />

            <button
              onClick={handleSearch}
              className="bg-orange-500 text-white px-4 py-2 rounded-sm hover:bg-orange-400"
            >
              Search
            </button>
          </div>
          {!isLogin ? (
            <MenuMobile />
          ) : (
            <div className="w-full py-1 font-semibold text-center text-shadow-md">
              <div className="flex flex-col items-center">
                <Image
                  src={
                    session.user.avatar ||
                    "https://res.cloudinary.com/dexlqslwj/image/upload/v1744257672/blank-image_yfczs3_ogl5pp.jpg"
                  }
                  height={100}
                  width={100}
                  alt="avatar"
                  className="rounded-full"
                />
              </div>
              <div className="text-gray-800 font-medium text-sm py-2">
                <div>{session.user?.fullname}</div>
                <div>{session.user.email}</div>
              </div>
              <hr className="my-2 text-gray-600" />
              {session.user.role === "CUSTOMER" && (
                <Link
                  href={`/profile/${session.user.username}`}
                  className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 transition duration-300"
                >
                  Profile
                </Link>
              )}
              {session.user.role === "ORGANIZER" && (
                <Link
                  href={`/dashboard/${session.user.username}`}
                  className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 transition duration-300"
                >
                  Dashboard
                </Link>
              )}
              <hr className="my-2 text-gray-600" />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-300 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
