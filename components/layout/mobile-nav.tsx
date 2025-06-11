"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

interface NavItem {
  label: string
  href: string
}

interface MobileNavProps {
  navItems: NavItem[]
}

export default function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="md:hidden p-2 text-gray-700 hover:text-blue-600" aria-label="Menu">
          <Menu size={24} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content asChild>
          <motion.div
            className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium">Menu</Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-2 text-gray-500 hover:text-gray-700" aria-label="Close">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Dialog.Close asChild>
                      <Link
                        href={item.href}
                        className={`block p-2 rounded-md ${
                          pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </Dialog.Close>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
