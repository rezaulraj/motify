import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import { create } from "zustand";
import toast from "react-hot-toast";
interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  featuredSongs: Song[];
  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  trendingSongs: [],
  featuredSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },

  // delete song

  deleteSong: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));
      toast.success("Song deleted successfully");
    } catch (error: any) {
      toast.error("Error deleteing song");
      set({
        error: error.response?.data?.message || "Error deleteing song",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  // delete album
  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/albums/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?.title
            ? { ...song, album: null }
            : song
        ),
      }));
      toast.success("Album deleted successfully");
    } catch (error: any) {
      toast.error("Error deleteing Album");
      set({
        error: error.response?.data?.message || "Error deleteing Album",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // stats data total songs

  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch songs stats",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  // all stats data
  fetchStats: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch stats",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  // stats data total songs end

  // Fetch all albums
  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response?.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to fetch albums" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch album by ID
  fetchAlbumById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response?.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Failed to fetch album" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch featured songs
  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: response?.data });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch featured songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch "Made For You" songs
  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: response?.data });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to fetch 'Made For You' songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch trending songs
  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/tranding");
      set({ trendingSongs: response?.data });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch trending songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
