import { Contact, ErrorType } from "./types";

function getOrigin(): string {
  return window.location.origin;
}

export function createNewUser(username: string) {
  const body: string = JSON.stringify({ username });
  const settings: object = {
    method: "POST",
    body: body,
    headers: {
      contentType: "application/json"
    }
  }
  return fetch(getOrigin()+"/api/users", settings);
}

export function fetchAllContacts() {
  return requester(getOrigin()+"/api/contacts");
}

async function requester(url: string, options?: object): Promise<Contact[] | string> {
  console.log(url)
  const request = await fetch(url, options);

  if (!request.ok) {
    throw new ErrorType(await request.text(), request.status);
  }

  return await request.json();
}