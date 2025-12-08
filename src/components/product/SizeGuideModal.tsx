"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SizeGuideContent } from "./SizeGuideContent";
import { useLenis } from "@studio-freight/react-lenis";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "unset";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
            
            {/* Box do Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl max-h-[85vh] flex flex-col bg-white shadow-2xl rounded-lg pointer-events-auto"
            >
              
              {/* Header Fixo */}
              <div className="flex-shrink-0 flex items-center justify-between p-6 md:p-8 border-b border-gray-100 bg-white rounded-t-lg">
                <h3 className="font-serif text-2xl text-brand-dark">Guia de Tamanhos</h3>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors -mr-2"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div 
                className="flex-1 overflow-y-auto p-6 md:p-8 overscroll-contain"
                data-lenis-prevent
              >
                <SizeGuideContent />
              </div>
              
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}