Albania Foods REST-API
Projektübersicht

Dies ist eine REST-API für traditionelle albanische Gerichte.
Sie ermöglicht, Lebensmittel abzurufen, hinzuzufügen, zu aktualisieren oder zu löschen.

Highlights:

Öffentliche GET-Endpunkte für das Abrufen von Daten

Geschützte POST-, PUT- und DELETE-Endpunkte (Basic Auth, Passwort nicht veröffentlicht)

Alle Daten im JSON-Format

Vollständig dokumentiert und getestet mit Postman

Features

Alle Lebensmittel auflisten oder ein einzelnes Lebensmittel abrufen

Lebensmittel hinzufügen, bearbeiten oder löschen (geschützt)

Klare Fehlermeldungen für ungültige Anfragen oder fehlende Authentifizierung

MySQL-Datenbank mit mindestens 20 Lebensmitteln

Datenbank

Datenbankname: edosha20_albania_foods
Tabelle: foods

Feld	Typ	Beschreibung
id	INT PRIMARY KEY AUTO_INCREMENT	Eindeutige ID
name	VARCHAR(100)	Name des Gerichts
region	VARCHAR(100)	Region in Albanien
type	VARCHAR(50)	Typ: Hauptgericht, Dessert, Street Food, etc.
ingredients	TEXT	Zutatenliste
description	TEXT	Kurze Beschreibung
calories	INT	Kalorien pro Portion
prep_time_min	INT	Zubereitungszeit in Minuten

Beispiel-Eintrag:

{
  "id": 1,
  "name": "Tavë Kosi",
  "region": "Elbasan",
  "type": "main dish",
  "ingredients": "lamb, yogurt, eggs",
  "description": "Baked lamb with yogurt",
  "calories": 450,
  "prep_time_min": 90
}
REST-API Endpoints
Öffentliche Endpunkte (kein Auth erforderlich)
Methode	Endpoint	Beschreibung
GET	/api/foods	Liste aller Lebensmittel
GET	/api/foods/:id	Ein Lebensmittel nach ID abrufen
Geschützte Endpunkte (Basic Auth erforderlich)
Methode	Endpoint	Beschreibung
POST	/api/foods	Neues Lebensmittel hinzufügen
PUT	/api/foods/:id	Lebensmittel aktualisieren
DELETE	/api/foods/:id	Lebensmittel löschen

Hinweis: Bei fehlender oder falscher Authentifizierung wird 401 Unauthorized zurückgegeben.

HTTP Status Codes
Code	Bedeutung
200	OK – GET oder PUT erfolgreich
201	Created – POST erfolgreich
204	No Content – DELETE erfolgreich
400	Bad Request – Ungültige Eingaben
401	Unauthorized – Auth fehlt oder falsch
404	Not Found – Lebensmittel nicht gefunden

Fehlerantworten im JSON-Format:

{ "error": "Descriptive error message" }
Setup Instructions

Repository klonen:

git clone <repository-link>
cd albania-foods-api
npm install

.env Datei erstellen (Datenbank- und Auth-Daten lokal speichern):

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<your-local-password>
DB_DATABASE=edosha20_albania_foods
PORT=5173
BASIC_AUTH_USER=<your-username>
BASIC_AUTH_PASS=<your-password>

Projekt starten:

npm run dev

Endpoints mit Postman oder cURL testen:

curl http://localhost:5173/api/foods
Git Workflow

Kleine, häufige Commits (mind. 2 pro Arbeitsstunde)

Commit-Messages in Englisch, z.B.:

Add GET /api/foods endpoint

Implement Basic Auth for POST, PUT, DELETE

Seed database with 20 Albanian foods

Postman Collection

Vollständig getestete Endpoints

JSON-Export im Repository enthalten

Jede Anfrage enthält Beschreibung und Beispielantworten