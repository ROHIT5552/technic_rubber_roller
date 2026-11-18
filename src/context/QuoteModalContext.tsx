"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface QuoteModalContextValue {
  isOpen: boolean;
  preselectedSubject: string;
  openQuoteModal: (subject?: string) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue>({
  isOpen: false,
  preselectedSubject: "",
  openQuoteModal: () => {},
  closeQuoteModal: () => {},
});

export function QuoteModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedSubject, setPreselectedSubject] = useState("");

  const openQuoteModal = useCallback((subject = "") => {
    setPreselectedSubject(subject);
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <QuoteModalContext.Provider
      value={{ isOpen, preselectedSubject, openQuoteModal, closeQuoteModal }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}
