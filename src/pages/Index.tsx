import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Phone, ChevronDown } from "lucide-react";
import { ArrowRight, Recycle, Shield, Truck, Factory, Award, FileCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { RequestForm } from "@/components/RequestForm";
import { Calculator } from "@/components/Calculator";
import { QuoteModal } from "@/components/QuoteModal";
import { ProductCatalogSection } from "@/components/ProductCatalogSection";
import { DocumentsSection } from "@/components/DocumentsSection";
import { useState, useEffect, useRef } from "react";
import heroFactory from "@/assets/hero-factory.jpg";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";
import { fadeUp, ease, viewport } from "@/hooks/useMotion";

function AnimatedStat({ num, suffix, format }: { num: number; suffix: string; format: boolean }) {
  const { count, ref } = useCountUp(num, 1500);
  const display = format ? count.toLocaleString("ru-RU") : String(count);
  return (
    <div ref={ref}>
      <p className="text-3xl lg:text-4xl font-extrabold leading-none bg-primary-foreground text-[#2f7f33]">{display}{suffix}</p>
// ... keep existing code
                  <span className="text-5xl font-extrabold leading-none text-[#2f7f33]">{item.step}</span>
// ... keep existing code
                  <h3 className="font-bold mb-1 text-black">{item.title}</h3>
                  <p className="text-sm text-foreground/65 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calculator + Request Form */}
      {isBlockVisible("request-form") && (
        <section id="request-form" className="section-padding section-dark">
          <div className="section-container">
            <motion.h2
              initial="hidden" whileInView="visible"
              viewport={viewport} variants={fadeUp}
              transition={{ duration: 0.7, ease }}
              className="text-3xl md:text-4xl font-bold text-center mb-10"
            >
              Рассчитайте и закажите
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Calculator onRequestQuote={handleCalcQuote} />
              <RequestForm source="главная" />
            </div>
          </div>
        </section>
      )}
      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        area={quoteData.area}
        thickness={quoteData.thickness}
        weight={quoteData.weight}
      />
    </div>
  );
};

export default Index;
