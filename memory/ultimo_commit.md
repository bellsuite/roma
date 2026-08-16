# Riepilogo Ultimi Interventi - Agosto 2026

## Galleria Suite (`components/SuiteGallery.tsx`)
- Ottimizzazione mobile: visualizzazione della sola prima immagine con aspect ratio 1:1 (quadrato).
- Aggiunta overlay con icona "lente d'ingrandimento" per indicare interattività.

## Lightbox (`components/Lightbox.tsx`)
- Ottimizzazione mobile: visualizzazione a tutto schermo, rimozione di frecce e miniature su mobile.
- Implementazione navigazione tramite swipe (senza effetto slide in tempo reale).
- Aggiunta suggerimento visuale all'apertura: icona di swipe animata (sequenza di 5 lampeggi + fade-out) centrata sull'immagine, scompare dopo 3 secondi o al primo tocco.

## Menu Hamburger (`components/Navbar.tsx`)
- Miglioramento leggibilità mobile:
  - Testi ingranditi (`text-2xl`), font serif (`font-heading`), peso semibold (`font-semibold`).
  - Bandierine lingue ingrandite (`text-4xl`).
  - Spaziatura aumentata tra gli elementi del menu per una migliore interazione touch.
