/* eslint-disable react/prop-types */
import React from "react";

//structure of noteGroups
//   [{
//     id: 1, // Unique id
//     groupName: "Group 1",
//     notes: [
//       {
//         id: 1,// Unique id
//         title: "Note 1", // First two words of the content.
//         content: "Content of Note 1",
//         createdAt: new Date(),
//       },
// ...
//     ],
//     color: "#000000", // Default color
//     createdAt: new Date(),
//   },
// ...
// ];

export const NoteGroupsContext = React.createContext();

const NoteGroupsContextProvider = ({ children }) => {
  const [noteGroups, setNoteGroups] = React.useState(
    JSON.parse(localStorage.getItem("noteGroups")) || []
  );
  return (
    <NoteGroupsContext.Provider value={{ noteGroups, setNoteGroups }}>
      {children}
    </NoteGroupsContext.Provider>
  );
};

export default NoteGroupsContextProvider;
