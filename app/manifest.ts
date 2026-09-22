import type { MetadataRoute } from "next";
import { salonConfig } from "@/config/salon.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: salonConfig.business.name,
    short_name: "Hair Edge Salon",
    description: salonConfig.business.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    lang: "en-IN",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
