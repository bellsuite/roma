# Registro Modifiche (Ultimo Commit)

## Dettagli Commit
- **Messaggio:** Aggiungi classi di padding globale e modifica i componenti per utilizzare il nuovo layout; aggiorna il logo nella Navbar e il separatore.

## Sintesi Modifiche
- **`app/globals.css`**: Introdotta la utility class `.px-padding-global` e `.p-padding-global` (responsive: 32px su mobile, 64px su desktop).
- **`app/page.tsx`**: Aggiunto `<Separator />` prima di `<ContactForm />`.
- **`components/ContactForm.tsx`**: Modificato padding a `.p-padding-global`.
- **`components/Navbar.tsx`**: Aggiornato stile del logo (`h-auto` invece di altezza fissa).
- **`components/Separator.tsx`**: Modificato padding verticale (`py-2 md:py-15`).
- **`components/TextWithImageLeft.tsx`**: Modificato padding a `.p-padding-global`.
- **`components/TextWithImageRight.tsx`**: Modificato padding a `.p-padding-global`.
- **`public/foto-suites/suite-2/_MG_8945.avif`**: File aggiornato.
