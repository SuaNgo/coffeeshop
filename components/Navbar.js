"use client";

import {
  faArrowAltCircleLeft,
  faCubes,
  faGear,
  faHome,
  faList,
  faListDots,
  faMugHot,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [flexNav, setFlexNav] = useState(false);
  const activeLink =
    "flex gap-1 bg-blue-300 mb-4 px-3 py-2 items-baseline rounded-xl shadow-xl shadow-gray-400";
  const unactiveLink =
    "flex gap-1 hover:bg-blue-300 mb-4 px-3 py-2 items-baseline rounded-xl ";
  const cssHideNav =
    "max-[1024px]:fixed  max-[1024px]:w-0 max-[1024px]:z-10 max-[1024px]:overflow-x-hidden max-[1024px]:top-0 max-[1024px]:p-0  bg-white p-4 text-[28px] rounded-r-xl min-h-screen shadow flex-[20%] ";
  const cssShowNav =
    "max-[1024px]:fixed  max-[1024px]:w-[250px] max-[1024px]:z-10 max-[1024px]:overflow-x-hidden max-[1024px]:top-0 max-[1024px]:p-0  bg-white p-4 text-[28px] rounded-r-xl min-h-screen shadow flex-[20%] ";

  return (
    <>
      <button
        onClick={() => {
          setFlexNav(!flexNav);
        }}
        className="fixed bg-white text-[30px] top-4 left-4 shadow-xl rounded-full border py-2 px-4 min-[1025px]:hidden"
      >
        <FontAwesomeIcon icon={faList} />
      </button>
      <aside className={`${flexNav ? cssShowNav : cssHideNav}`}>
        <button
          onClick={() => {
            setFlexNav(!flexNav);
          }}
          className="text-[30px] min-[1025px]:hidden mt-4 float-right mr-4"
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        </button>
        <nav>
          <img
            src="/logo.png"
            className="object-contain mb-8 w-full h-auto"
            alt="logo shop"
          />
          <Link
            href="/dashboard"
            className={
              pathname == "/dashboard" ? `${activeLink}` : `${unactiveLink}`
            }
          >
            <FontAwesomeIcon icon={faHome} />
            <span className="text-[28px] leading-7">Dashboard</span>
          </Link>
          <Link
            href="/products"
            className={
              pathname == "/products" ? `${activeLink}` : `${unactiveLink}`
            }
          >
            <FontAwesomeIcon icon={faMugHot} />
            <span className="text-[28px] leading-7">Products</span>
          </Link>
          <Link
            href="/categories"
            className={
              pathname == "/categories" ? `${activeLink}` : `${unactiveLink}`
            }
          >
            <FontAwesomeIcon icon={faListDots} />
            <span className="text-[28px] leading-7">Categories</span>
          </Link>
          <Link
            href="/orders"
            className={
              pathname == "/orders" ? `${activeLink}` : `${unactiveLink}`
            }
          >
            <FontAwesomeIcon icon={faCubes} />
            <span className="text-[28px] leading-7">Orders</span>
          </Link>
          <Link
            href="/settings"
            className={
              pathname == "/settings" ? `${activeLink}` : `${unactiveLink}`
            }
          >
            <FontAwesomeIcon icon={faGear} />
            <span className="text-[28px] leading-7">Settings</span>
          </Link>

          <button
            className={`${unactiveLink} w-full`}
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} flip="horizontal" />
            <span className="text-[28px] leading-7">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
