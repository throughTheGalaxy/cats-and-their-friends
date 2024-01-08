import { createContext } from "react";

// Beim Speichern der letzten Position muss auf der Detailseite nach dem Anlegen des Produkts die Schaltfläche "Abbrechen und zurück zum Bildschirm aller Artikel" angezeigt werden.

export const LastLocationContext = createContext("/"); // Location
export const SetLastLocationContext = createContext(undefined); // Location einstellen
