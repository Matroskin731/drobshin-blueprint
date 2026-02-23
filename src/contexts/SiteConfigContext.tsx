import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SiteConfig, defaultConfig } from "@/data/siteConfig";

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
  isBlockVisible: (blockId: string) => boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

const STORAGE_KEY = "drobshin-site-config";

function loadConfig(): SiteConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultConfig, ...JSON.parse(stored) };
    }
  } catch {}
  return defaultConfig;
}

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(loadConfig);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isBlockVisible = (blockId: string) => {
    const block = config.homeBlocks.find((b) => b.id === blockId);
    return block ? block.visible : true;
  };

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, resetConfig, isBlockVisible }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) throw new Error("useSiteConfig must be used within SiteConfigProvider");
  return ctx;
}
