import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  footerSections,
  socialLinks,
  footerBrand,
} from "@/constants/footerData";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-semibold tracking-tight uppercase">
                <span className="bg-gradient-to-r from-emerald-600 to-lime-400 bg-clip-text text-transparent drop-shadow">
                  Vibe
                </span>
                <span className="ml-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                  Pulse
                </span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {footerBrand.description}
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        {/* Bottom Section */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {footerBrand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
