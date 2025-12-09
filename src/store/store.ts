import type { Poi } from "../types/poi";

import { create } from "zustand";

interface MapState {
  userLocation: { lat: number; lng: number };
  isExperienceMode: boolean;
  likeLocation: Poi[];
  isInfoVisible: boolean;
  selectedLocation: Poi | null;
  isCenter: boolean;
  showPath: boolean;
  showLikedOnly: boolean;
  like: boolean;
  selectedCategory: "whole" | "battery" | "bottle" | "pill";
}

interface MapActions {
  setUserLocation: (location: { lat: number; lng: number }) => void;
  setIsExperienceMode: (mode: boolean) => void;
  setLikeLocation: (locations: Poi[]) => void;
  setIsInfoVisible: (visible: boolean) => void;
  setSelectedLocation: (location: Poi | null) => void;
  setIsCenter: (center: boolean) => void;
  setShowPath: (path: boolean) => void;
  setShowLikedOnly: (likedOnly: boolean) => void;
  setLike: (likeState: boolean) => void;
  setSelectedCategory: (
    category: "whole" | "battery" | "bottle" | "pill"
  ) => void;
  fetchUserLocation: () => void;
}

export const useMapStore = create<MapState & MapActions>((set) => ({
  userLocation: { lat: 37.386196, lng: 126.639404 },
  isExperienceMode: false,
  likeLocation: [],
  isInfoVisible: false,
  selectedLocation: null,
  isCenter: false,
  showPath: false,
  showLikedOnly: false,
  like: false,
  selectedCategory: "whole",

  setUserLocation: (location) => set({ userLocation: location }),
  setIsExperienceMode: (mode) => set({ isExperienceMode: mode }),
  setLikeLocation: (locations) => set({ likeLocation: locations }),
  setIsInfoVisible: (visible) => set({ isInfoVisible: visible }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setIsCenter: (center) => set({ isCenter: center }),
  setShowPath: (path) => set({ showPath: path }),
  setShowLikedOnly: (likedOnly) => set({ showLikedOnly: likedOnly }),
  setLike: (likeState) => set({ like: likeState }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  fetchUserLocation: () => {
    navigator.geolocation.getCurrentPosition((position) => {
      set({ userLocation: { lat: position.coords.latitude, lng: position.coords.longitude } });
    });
  },
}));
