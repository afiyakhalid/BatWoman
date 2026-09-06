"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/services/wishlist.service";

export function useWishlist() {
  const queryClient = useQueryClient();

  const wishlistQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const addMutation = useMutation({
    mutationFn: addToWishlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });

  return {
    ...wishlistQuery,

    addToWishlist: addMutation.mutate,
    removeFromWishlist: removeMutation.mutate,

    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
}