import React from "react";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Ebarch</h3>
            <p className="text-neutral-400 text-sm">
              Your one-stop platform for discovering and requesting academic
              resources. We connect researchers and students with the materials
              they need.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li>
                <Link href={"#"} className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"#"} className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href={"#"} className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={"#"} className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li>
                <Link href={"#"} className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href={"#"} className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={"#"} className="hover:text-white transition-colors">
                  Copyright Info
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="mailto:contact@bookhub.com"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-neutral-400 text-sm">
                Subscribe to our newsletter
              </p>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-neutral-800 text-white text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md text-sm transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2025 Ebarch All rights reserved.
          </p>
          <p className="text-neutral-400 text-sm mt-2 md:mt-0">
            Made with <Heart size={14} className="inline text-red-500" /> by
            Mohammed Swalih Mp
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
