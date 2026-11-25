"use client";

import { useState, useEffect } from "react";

interface DynamicPriceProps {
  defaultPriceText: string;
  propertyId?: string;
}

export default function DynamicPrice({
  defaultPriceText,
  propertyId = "bellsuitesromesangiovanni",
}: DynamicPriceProps) {
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>("EUR");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFirstPrice() {
      try {
        const res = await fetch(`/api/price?propertyId=${propertyId}`);
        const data = await res.json();
        if (data.available && data.totalPrice) {
          setTotalPrice(data.totalPrice);
          if (data.currency) setCurrency(data.currency);
        }
      } catch (err) {
        console.error("Failed to fetch first available price", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFirstPrice();
  }, [propertyId]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-heading text-3xl text-blu">
          {loading ? (
            <span className="text-sm text-grigio-scuro animate-pulse">Caricamento prezzo...</span>
          ) : totalPrice ? (
            `${totalPrice} ${currency}`
          ) : (
            defaultPriceText
          )}
        </span>
        {totalPrice && !loading && (
          <span className="font-heading text-2xl text-blu">
            per due notti
          </span>
        )}
      </div>
      <span className="text-xs text-grigio-scuro font-medium">
        Soggiorno minimo: 2 notti
      </span>
    </div>
  );
}
