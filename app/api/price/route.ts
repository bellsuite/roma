import { NextRequest, NextResponse } from "next/server";
import { getFirstAvailablePrice } from "@/lib/direct-book";

export async function GET(request: NextRequest) {
  const propertyId = request.nextUrl.searchParams.get("propertyId") || "bellsuitesromesangiovanni";

  try {
    const quote = await getFirstAvailablePrice(propertyId);

    return NextResponse.json({
      available: quote.available,
      totalPrice: quote.totalPrice,
      currency: quote.currency,
      minNights: quote.minNights,
      date: quote.date,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossibile recuperare il prezzo" },
      { status: 502 }
    );
  }
}
