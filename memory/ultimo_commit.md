# Riepilogo Ultimi Interventi - Novembre 2026

## Nuova Pagina Contatti (`app/contatti/page.tsx`)
- Creazione della pagina contatti dedicata contenente:
  - Indirizzo degli appartamenti (Via Domodossola 23, 00183 Roma).
  - Link alle pagine Airbnb ufficiali per Suite Palatino e Suite Aventino.
  - Link al profilo/pagina ufficiale Facebook.
  - Numero di telefono dell'host (Ilaria) con supporto telefonico e WhatsApp.
  - Consigli utili per il check-in (orari, preavviso, documenti d'identità, voucher colazione Pompi).
  - Modulo di contatto (`ContactForm`).

## Navigazione e Footer (`components/Navbar.tsx`, `components/Footer.tsx`)
- Integrazione del link alla pagina Contatti sia nella navigazione desktop/mobile della Navbar sia nel Footer.
- Pulizia rimuovendo il modulo di contatto duplicato dalle pagine Home, Mappa e Suite, centralizzandolo nella pagina dedicata `/contatti`.
