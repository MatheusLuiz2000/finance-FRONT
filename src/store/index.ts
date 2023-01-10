export function getUser() {
  if(window.location) {
      const user = sessionStorage.getItem('user');

      if(!user) return false;

      return JSON.parse(user);
  }
}

export function setUser(user: any) {
  if (window.location) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
}

export function getCategorys() {
  if(window.location) {
      const user = sessionStorage.getItem('category');

      if(!user) return false;

      return JSON.parse(user);
  }
}

export function setCategorys(category: any) {
  if (window.location) {
    sessionStorage.setItem("category", JSON.stringify(category));
  }
}

export function getBanks() {
  if(window.location) {
      const banks = sessionStorage.getItem('banks');

      if(!banks) return false;

      return JSON.parse(banks);
  }
}

export function setBanks(banks: any) {
  if (window.location) {
    sessionStorage.setItem("banks", JSON.stringify(banks));
  }
}

export function getCards() {
  if(window.location) {
      const cards = sessionStorage.getItem('cards');

      if(!cards) return false;

      return JSON.parse(cards);
  }
}

export function setCards(cards: any) {
  if (window.location) {
    sessionStorage.setItem("cards", JSON.stringify(cards));
  }
}



