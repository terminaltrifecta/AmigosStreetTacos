"use client";

import React from "react";
import { supabase } from '../supabase';
import AddLocation from "../components/AddLocation/AddLocation";
import usePostMutation from "../hooks/usePosts";

export default function About() {

    const { mutate, error } = usePostMutation();

    function functionAdd() {
      const postData: any = {
        test: 'aiden is a whore',
      };
      mutate(postData);
    };

  return (
    <div className="gap-3 bg-white p-4 min-h-screen space-y-4">
        <button id="buttonParent" className="bigRed" onClick={functionAdd}>
          <div className="d-flex align-items-center justify-content-center p-4">
            Supabase
          </div>
        </button>
    </div>
  );
}