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
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
];

export const allCategories = [
  "Quiz",
  "UTS",
  "UAS",
]


export const allLinks = (currentUserId) => {
  return [
    { href: "/", Icons: HomeIcon },
    { href: "/search", Icons: SearchIcon },
    { href: "/post/create", Icons: AddIcon },
    { href: "/notification", Icons: BellIcon },
    { href: `/profile/${currentUserId}`, Icons: UserIcon },
  ]
}

export const slickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
}