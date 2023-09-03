"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenu,
} from "./ui/navigation-menu";

const cadastros = [
  {
    title: "Brands",
    href: "/brands",
  },
  {
    title: "Categories",
    href: "/categories",
  },
  {
    title: "Colors",
    href: "/colors",
  },
  {
    title: "Sizes",
    href: "/sizes",
  },
];

export function Navbar() {
  return (
    <NavigationMenu className="flex-1 space-x-2 mx-6">
      <NavigationMenuItem>
        <NavigationMenuTrigger>Cadastros</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="">
            {cadastros.map((item) => {
              return (
                <NavigationMenuItem key={item.title}>
                  <Link className="" href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="">
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuLink className="w-full">Products</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/galery" legacyBehavior passHref>
            <NavigationMenuLink className="w-full">Galery</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
