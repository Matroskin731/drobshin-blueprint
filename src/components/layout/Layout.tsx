import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { GrainOverlay } from "../common/GrainOverlay";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <GrainOverlay />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
