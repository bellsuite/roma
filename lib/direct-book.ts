export interface QuoteResult {
  available: boolean;
  totalPrice: number;
  currency: string;
  minNights: number;
  date?: string;
  message?: string;
}

// Mappa appartamento -> room type ID di direct-book.com
const CHANNEL_CODE = "bellsuitesromesangiovanni";
const ROOM_TYPES: Record<string, string> = {
  palatino: "514330",
  aventino: "514329",
};

const MIN_NIGHTS = 2;
const ADULTS = 1;

function fmt(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function getFirstAvailablePrice(
  propertyId: string // "palatino" | "aventino" | etc.
): Promise<QuoteResult> {
  const key = propertyId.toLowerCase();
  let roomTypeId = ROOM_TYPES[key];
  if (!roomTypeId) {
    if (key.includes("palatino") || key.includes("suite-1")) roomTypeId = ROOM_TYPES["palatino"];
    else if (key.includes("aventino") || key.includes("suite-2")) roomTypeId = ROOM_TYPES["aventino"];
    else roomTypeId = ROOM_TYPES["palatino"];
  }

  // Cerca da oggi in poi (per un arco di 60 giorni)
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const to = new Date(now.getFullYear(), now.getMonth() + 2, 0);

  const url =
    `https://direct-book.com/api/properties/${CHANNEL_CODE}/room-types/${roomTypeId}/availability` +
    `?checkInsFrom=${fmt(from)}&checkInsTo=${fmt(to)}` +
    `&adults=${ADULTS}&children=0&infants=0&los=${MIN_NIGHTS}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Errore API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.result) || data.result.length === 0) {
      return {
        available: false,
        totalPrice: roomTypeId === "514330" ? 220 : 260,
        currency: "EUR",
        minNights: MIN_NIGHTS,
        date: fmt(from),
        message: "Nessuna disponibilità trovata",
      };
    }

    // Trova il primo giorno disponibile e prenotabile
    const firstValid = data.result.find(
      (item: any) =>
        item &&
        (item.canCheckIn || item.totalAvailability > 0) &&
        typeof item.price === "number" &&
        item.price > 0
    );

    const targetItem = firstValid || data.result[0];
    const totalPrice =
      targetItem && typeof targetItem.price === "number"
        ? targetItem.price
        : roomTypeId === "514330"
        ? 220
        : 260;
    const dateStr = targetItem && targetItem.date ? targetItem.date : fmt(from);

    return {
      available: true,
      totalPrice,
      currency: "EUR",
      minNights: MIN_NIGHTS,
      date: dateStr,
    };
  } catch (error) {
    console.error(`Errore prezzo ${propertyId}:`, error);
    return {
      available: false,
      totalPrice: roomTypeId === "514330" ? 220 : 260,
      currency: "EUR",
      minNights: MIN_NIGHTS,
      date: fmt(new Date()),
      message: "Prezzo stimato",
    };
  }
}
