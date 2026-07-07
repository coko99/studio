import { sortMenuCategories } from "../menu";
import { dayMenuCategories as dayMenuCategoriesRaw } from "./day";
import { nightMenuCategories as nightMenuCategoriesRaw } from "./night";

export const dayMenuCategories = sortMenuCategories(dayMenuCategoriesRaw);
export const regularMenuCategories = dayMenuCategories;
export const nightMenuCategories = sortMenuCategories(nightMenuCategoriesRaw);
