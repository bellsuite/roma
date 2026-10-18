# Riepilogo Ultimi Interventi - Ottobre 2026

## Mappa Interattiva (`components/InteractiveMap.tsx`)
- Ottimizzazione dello zoom e dell'area iniziale tramite `fitBounds` per includere automaticamente Bell Suites Roma, Metro Re di Roma e la Pasticceria Pompi.
- Sostituzione del simbolo testuale "C" del Colosseo con un'icona SVG dedicata raffigurante le arcate del monumento.

## Stile Mappa e Design System (`app/globals.css`)
- Implementazione di filtri CSS avanzati sulle tile della mappa per ottenere una colorazione monocromatica virata verso il blu istituzionale (`--color-blu` / `#183058`), coerente con il design system e l'estetica Figma.

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
