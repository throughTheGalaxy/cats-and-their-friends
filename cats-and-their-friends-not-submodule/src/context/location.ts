import { createContext } from "react";

// storing the last location, it is necessary for the details page to display the "Cancel and return to all items screen" button after creating a product

export const LastLocationContext = createContext("/"); // location
export const SetLastLocationContext = createContext<
  React.Dispatch<React.SetStateAction<string>> | undefined
>(undefined); // instal location
