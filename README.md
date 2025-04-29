# FlyWithMe

**FlyWithMe** este o aplicatie web de rezervari zboruri, cu module dedicate **User** si **Admin**.  
Proiectul foloseste **Node.js (Express)** pentru backend, **React + Vite** pentru frontend, **MongoDB Atlas** pentru baza de date si este pregatit pentru deploy cu **Docker**.

---

## Tehnologii folosite

| Componentă     | Tehnologie         |
| --------------- | ------------------ |
| Frontend        | React + Vite        |
| Backend         | Node.js + Express   |
| Bază de date    | MongoDB Atlas       |
| Deployment      | Docker              |
| Autentificare   | JWT Tokens          |
| API Vreme       | API extern meteo    |

---

## Functionalitati principale

### User
- Autentificare (Login) si Inregistrare (Register)
- Vizualizare si cautare zboruri
- Vizualizare vremea pentru orice oras (API extern)
- Rezervare zboruri
- Vizualizare istoric rezervari
- Editare date personale (email, username, parola)

### Admin
- Dashboard Admin separat
- CRUD complet pentru zboruri (Create, Read, Update, Delete)
- Confirmare / respingere rezervari (individual sau bulk)
- Vizualizare utilizatori
- Vizualizare rezervari pentru fiecare utilizator
- Editare date personale (email, username, parola)

---

## Structura proiect

### Backend
- `/models`: Modelele Mongoose
- `/routes`: Rutele Express
- `/middleware`: Middleware personalizat
- `/tests`: Teste unitare
- `server.js`: Punct de start
- `.env`: Variabile de configurare

### Frontend
- `/components`: Componente React
- `/pages`: Pagini principale
- `/assests`: Imagini ajutatoare

---

## Configurare si rulare locala

### 1. Cloneaza proiectul
```bash
git clone https://github.com/AlexiaMihaela/FlyWithMe.git
cd FlyWithMe
```

### 2. Configurare backend
```bash
cd backend
npm install
```
Creeaza un fisier `.env`:
```env
mongodb+srv://test:test45@flywithme.gklzz.mongodb.net/?retryWrites=true&w=majority&appName=FlyWithMe
JWT_SECRET=your_jwt_secret
WEATHER_API_KEY=your_weather_api_key
PORT=5000
```
Ruleaza backend-ul:
```bash
npm run dev
```

### 3. Configurare frontend
```bash
cd frontend
npm install
npm run dev
```
Frontendul va fi disponibil la `http://localhost:5173`

---

## Deploy cu Docker

Construieste imaginile:
```bash
docker-compose build
```

Ruleaza containerele:
```bash
docker-compose up
```

---

## Testare

Ruleaza testele backend:
```bash
npm run test
```

Teste disponibile:
- `auth.test.js`
- `confirmReservation.test.js`
- `createFlight.test.js`
- `userHistory.test.js`

---

## Observatii suplimentare
- **Acces pe roluri**: Detectare automata admin/user la login
- **Securitate**: Middleware JWT
- **UX/UI**: Interfata responsiva

---

## Autori
- **Nume**: Buzenchi Andreea-Iulia, Chirila Alexia-Mihaela, Crihana Denisa Cristina
- **Materie**: Programare Java in Cloud
- **An de studiu**:  An 3
- **Tehnologii favorite**: Node.js, React, Docker

---

