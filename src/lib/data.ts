import { fetchLocalStorage } from "./localStorage";

export interface DataItem {
  name: string;
  creator: string | string[];
  releaseYear: number | string;
  compiled: boolean;
  objectOriented: boolean;
}

export const generateSolution = async () => {
  const userData = fetchLocalStorage();
  const date = new Date();
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(
      `${date.getUTCDate()} ${date.getUTCMonth()} ${date.getUTCFullYear()}`
    )
  );
  if (
    userData?.date !==
    `${date.getUTCDate()} ${date.getUTCMonth()} ${date.getUTCFullYear()}`
  ) {
    localStorage.clear();
  }
  return languages[new Uint16Array(hash)[0] % languages.length];
};

export const getGuessData = (guess: string) => {
  return languages.find(
    (item) => item.name.toLowerCase() === guess.toLowerCase()
  );
};

const languages = [
  {
    name: "ActionScript",
    creator: "Gary Grossman",
    releaseYear: 1998,
    compiled: true,
    objectOriented: true,
  },
  {
    name: "AngleScript",
    creator: "Andreas Jönsson",
    releaseYear: 2003,
    compiled: true,
    objectOriented: true,
  },
  {
    name: "Bash",
    creator: "Brian Fox",
    releaseYear: 1989,
    compiled: false,
    objectOriented: false,
  },
  {
    name: "BASIC",
    creator: ["John G. Kemeny", "Thomas E. Kurtz"],
    releaseYear: 1964,
    compiled: false,
    objectOriented: true,
  },
  {
    name: "C++",
    creator: "Bjarne Stroustrup",
    releaseYear: 1985,
    compiled: true,
    objectOriented: true,
  },
  {
    name: "C#",
    creator: "Microsoft",
    releaseYear: 2000,
    compiled: true,
    objectOriented: true,
  },
  {
    name: "Carbon",
    creator: "Google",
    releaseYear: "No data",
    compiled: true,
    objectOriented: true,
  },
  {
    name: "Clojure",
    creator: "Rich Hickey",
    releaseYear: 2007,
    compiled: true,
    objectOriented: false,
  },
  {
    name: "Dart",
    creator: ["Lars Bak", "Kasper Lund"],
    releaseYear: 2011,
    compiled: true,
    objectOriented: true,
  },
  {
    name: "Elixir",
    creator: "José Valim",
    releaseYear: 2012,
    compiled: true,
    objectOriented: false,
  },
  {
    name: "Erlang",
    creator: ["Joe Armstrong", "Robert Virding", "Mike Williams"],
    releaseYear: 1986,
    compiled: true,
    objectOriented: false,
  },
  {
    name: "F#",
    creator: ["Don Syme", "Microsoft Research"],
    releaseYear: 2005,
    compiled: false,
    objectOriented: false,
  },
  {
    name: "Go",
    creator: ["Robert Griesemer", "Rob Pike", "Ken Thompson"],
    releaseYear: 2009,
    compiled: true,
    objectOriented: true,
  },
  {
    name: "Ruby",
    creator: "Yukihiro Matsumoto",
    releaseYear: 1995,
    compiled: false,
    objectOriented: true,
  },
  {
    name: "TypeScript",
    creator: "Microsoft",
    releaseYear: 2012,
    compiled: true,
    objectOriented: true,
  },
];
