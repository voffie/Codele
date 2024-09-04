import { Language } from "lib/languages";

export const LANGUAGES = [
  {
    name: "ActionScript",
    releaseYear: 1998,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "AngleScript",
    releaseYear: 2003,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "Bash",
    releaseYear: 1989,
    compiled: false,
    objectOriented: false,
    typed: "Dynamic",
  },
  {
    name: "BASIC",
    releaseYear: 1964,
    compiled: false,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "C++",
    releaseYear: 1985,
    compiled: true,
    objectOriented: true,
    typed: "Static",
    aliases: ["cpp"],
  },
  {
    name: "C#",
    releaseYear: 2000,
    compiled: true,
    objectOriented: true,
    typed: "Static",
    aliases: ["csharp"],
  },
  {
    name: "C",
    releaseYear: 1972,
    compiled: true,
    objectOriented: false,
    typed: "Static",
  },
  {
    name: "Carbon",
    releaseYear: "No data",
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "Clojure",
    releaseYear: 2007,
    compiled: true,
    objectOriented: false,
    typed: "Dynamic",
  },
  {
    name: "Dart",
    releaseYear: 2011,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "Elixir",
    releaseYear: 2012,
    compiled: true,
    objectOriented: false,
    typed: "Dynamic",
  },
  {
    name: "Erlang",
    releaseYear: 1986,
    compiled: true,
    objectOriented: false,
    typed: "Dynamic",
  },
  {
    name: "F#",
    releaseYear: 2005,
    compiled: false,
    objectOriented: false,
    typed: "Static",
    aliases: ["fsharp"],
  },
  {
    name: "Fortran",
    releaseYear: 1957,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "Go",
    releaseYear: 2009,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "Haskell",
    releaseYear: 1990,
    compiled: true,
    objectOriented: false,
    typed: "Static",
  },
  {
    name: "Java",
    releaseYear: 1995,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "JavaScript",
    releaseYear: 1995,
    compiled: false,
    objectOriented: true,
    typed: "Dynamic",
    aliases: ["js"],
  },
  {
    name: "Julia",
    releaseYear: 2012,
    compiled: true,
    objectOriented: true,
    typed: "Dynamic",
  },
  {
    name: "Kotlin",
    releaseYear: 2011,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "Lisp",
    releaseYear: 1960,
    compiled: true,
    objectOriented: true,
    typed: "Dynamic",
  },
  {
    name: "Lua",
    releaseYear: 1993,
    compiled: true,
    objectOriented: true,
    typed: "Dynamic",
  },
  {
    name: "OCaml",
    releaseYear: 1996,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "Objective-C",
    releaseYear: 1984,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "Perl",
    releaseYear: 1987,
    compiled: false,
    objectOriented: true,
    typed: "Dynamic",
  },
  {
    name: "PHP",
    releaseYear: 1995,
    compiled: false,
    objectOriented: true,
    typed: "Dynamic",
  },
  {
    name: "Python",
    releaseYear: 1991,
    compiled: false,
    objectOriented: true,
    typed: "Dynamic",
  },
  {
    name: "Ruby",
    releaseYear: 1995,
    compiled: false,
    objectOriented: true,
    typed: "Dynamic",
    aliases: ["rb"],
  },
  {
    name: "Rust",
    releaseYear: 2015,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "Scala",
    releaseYear: 2004,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "Swift",
    releaseYear: 2014,
    compiled: true,
    objectOriented: true,
    typed: "Static",
  },
  {
    name: "TypeScript",
    releaseYear: 2012,
    compiled: true,
    objectOriented: true,
    typed: "Static",
    aliases: ["ts"],
  },
  {
    name: "Visual Basic",
    releaseYear: 1991,
    compiled: true,
    objectOriented: true,
    typed: "Static",
    aliases: ["vba"],
  },
] satisfies Language[];
