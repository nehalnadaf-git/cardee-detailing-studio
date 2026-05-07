'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BookingContextType {
  isOpen: boolean;
  selectedService: string | null;
  openModal: (service?: string) => void;
  closeModal: () => void;
}

const BookingContext = createContext<BookingContextType>({
  isOpen: false,
  selectedService: null,
  openModal: () => {},
  closeModal: () => {},
});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const openModal = (service?: string) => {
    setSelectedService(service ?? null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedService(null);
  };

  return (
    <BookingContext.Provider value={{ isOpen, selectedService, openModal, closeModal }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
