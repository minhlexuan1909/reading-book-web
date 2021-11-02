import React, { createContext, useContext, useState } from "react";
import { BookLibrary } from "../BookLibrary";
import { BookPreview } from "../BookPreview";
import { BookDetail } from "../BookDetail";

export const Books = () => {
  return (
    <div style={{ position: "relative " }}>
      {/* <BookPreview></BookPreview>
      <BookContext.Provider value={providerValue}>
        <BookLibrary></BookLibrary>
        <BookDetail></BookDetail>
      </BookContext.Provider> */}
    </div>
  );
};
