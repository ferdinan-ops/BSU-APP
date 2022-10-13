import { AddIcon, BellIcon, HomeIcon, SearchIcon, UserIcon } from "../assets/Icons";

export const allFakultas = [
  "Ekonomi",
  "Pertanian",
  "Sastra",
  "Teknik",
  "Ilmu Komputer",
  "Hukum",
  "Filsafat",
  "Keguruan & Ilmu Pendidikan",
];

export const allSemester = [
  "1 (Satu)",
  "2 (Dua)",
  "3 (Tiga)",
  "4 (Empat)",
  "5 (Lima)",
  "6 (Enam)",
  "7 (Tujuh)",
  "8 (Delapan)",
];


export const allLinks = (currentUserId) => {
  return [
    { href: "/", Icons: HomeIcon },
    { href: "/search", Icons: SearchIcon },
    { href: "/post/create", Icons: AddIcon },
    { href: "/notification", Icons: BellIcon },
    { href: `/profile/${currentUserId}`, Icons: UserIcon },
  ]
}