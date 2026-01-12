# Orderhandling Frontend

Detta repository innehåller frontenddelen till projektet **Orderhandling**, utvecklat som en del av kursen *Fullstacksutveckling med ramverk* vid Mittuniversitetet.

Frontendapplikationen är byggd som en **Single Page Application (SPA)** med Vue och används för att konsumera backend-API:t i orderhandling_backend.


## Tekniker

- **Vue** – JavaScript-ramverk för komponentbaserad utveckling
- **Vue Router** – Navigering mellan vyer
- **Tailwind CSS** – Styling av användargränssnitt
- **Lucide** – Ikoner i gränssnittet
- **Fetch API** – Kommunikation med backend


## Funktionalitet

- Inloggning med cookie-baserad autentisering
- Skyddad dashboard för inloggade användare
- Hantering av produkter (skapa, visa, uppdatera, ta bort)
- Användarhantering för administratörer
- Responsivt användargränssnitt

**Notering:**  
Ett sökfält finns i gränssnittet men sökfunktionen är inte implementerad i denna version.


## Installation och uppstart

1. Klona projektet  
2. Installera beroenden: npm install
3. Starta utvecklingsserver: npm run dev

Applikationen körs vanligtvis på:
http://localhost:5173

Backend måste vara igång för att frontend ska fungera korrekt.

## Bygg för produktion

npm run build