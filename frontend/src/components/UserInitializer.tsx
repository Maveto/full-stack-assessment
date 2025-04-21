"use client";

import { getCurrentUser } from "@/lib/api";
import { clearUser, setIsInitialized, setUser } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        dispatch(setUser(user));
      } catch (err: any) {
        dispatch(clearUser());
      } finally {
        dispatch(setIsInitialized(true));
      }
    };

    fetchUser();
  }, []);
  return null;
}
