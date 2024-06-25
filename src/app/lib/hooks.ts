import { useEffect, useState } from "react";
import { fetchAllContacts } from "./net"
import { Contact, ErrorType } from "./types";
import { getLocalContacts, saveLocalContacts } from "./storage";

export function useAllContacts(): { data: Contact[], error?: ErrorType, isLoading: boolean } {
  const [data, setData] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorType | undefined>(undefined);

  useEffect(() => {
    const localContacts: Contact[] | null = getLocalContacts();
    if (localContacts) {
      setData(localContacts)
      setIsLoading(false);
      return;
    }

    fetchAllContacts()
      .then(responseBody => {
        setData(responseBody)
        saveLocalContacts(responseBody)
      })
      .catch(exception => setError(exception))
      .finally(() => setIsLoading(false));
  }, []);
  
  return {data, error, isLoading};
}