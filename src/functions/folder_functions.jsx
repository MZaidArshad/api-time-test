import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const createFolder = async (userId, folderName, parentFolderId = null) => {
  if (!userId) throw new Error("User not authenticated");

  try {
    const folderData = {
      folder_name: folderName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      parent_folder: parentFolderId,
      allowed_users: [userId], // Initial access for creator
      created_by: userId,
    };
    const folderRef = await addDoc(collection(db, "Folders"), folderData);
    console.log("Folder created with ID:", folderRef.id);
  } catch (error) {
    console.error("Error creating folder:", error);
  }
};

const updateFolder = async (folderId, updates) => {
  try {
    const folderRef = doc(db, "Folders", folderId);
    await updateDoc(folderRef, { ...updates, updatedAt: serverTimestamp() });
    console.log("Folder updated successfully");
  } catch (error) {
    console.error("Error updating folder:", error);
  }
};

const deleteFolder = async (folderId) => {
  try {
    const folderRef = doc(db, "Folders", folderId);
    await deleteDoc(folderRef);
    console.log("Folder deleted successfully");
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
};

const createSubfolder = async (userId, parentFolderId, subfolderName) => {
  if (!userId) throw new Error("User not authenticated");

  try {
    const subfolderData = {
      folder_name: subfolderName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      parent_folder: parentFolderId,
      allowed_users: [userId],
      created_by: userId,
    };
    const subfolderRef = await addDoc(
      collection(db, "Folders", parentFolderId, "Subfolders"),
      subfolderData
    );
    console.log("Subfolder created with ID:", subfolderRef.id);
  } catch (error) {
    console.error("Error creating subfolder:", error);
  }
};

const updateSubfolder = async (parentFolderId, subfolderId, updates) => {
  try {
    console.log(
      "parentFolderId, subfolderId, updates",
      parentFolderId,
      subfolderId,
      updates
    );
    const subfolderRef = doc(
      db,
      "Folders",
      parentFolderId,
      "Subfolders",
      subfolderId
    );
    await updateDoc(subfolderRef, { ...updates, updatedAt: serverTimestamp() });
    console.log("Subfolder updated successfully");
  } catch (error) {
    console.error("Error updating subfolder:", error);
  }
};

const deleteSubfolder = async (parentFolderId, subfolderId) => {
  try {
    const subfolderRef = doc(
      db,
      "Folders",
      parentFolderId,
      "Subfolders",
      subfolderId
    );
    await deleteDoc(subfolderRef);
    console.log("Subfolder deleted successfully");
  } catch (error) {
    console.error("Error deleting subfolder:", error);
  }
};

const addDocument = async (userId, folderId, documentData) => {
  if (!userId) throw new Error("User not authenticated");

  try {
    const docData = {
      ...documentData,
      created_by: userId,
      updatedAt: serverTimestamp(),
    };
    const documentRef = await addDoc(
      collection(db, "Folders", folderId, "Documents"),
      docData
    );

    console.log("Document added with ID:", documentRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

const updateDocument = async (
  parentId = null,
  folderId,
  documentId,
  updates
) => {
  try {
    const documentRef = parentId
      ? doc(
          db,
          "Folders",
          parentId,
          "Subfolders",
          folderId,
          "Documents",
          documentId
        )
      : doc(db, "Folders", folderId, "Documents", documentId);
    await updateDoc(documentRef, { ...updates, updatedAt: serverTimestamp() });
    console.log("Document updated successfully");
    window.toastify("Document updated successfully", "success");
  } catch (error) {
    console.error("Error updating document:", error);
    window.toastify("Error updating document", "error");
  }
};

const deleteDocument = async (parentId = null, folderId, documentId) => {
  try {
    const documentRef = parentId
      ? doc(
          db,
          "Folders",
          parentId,
          "Subfolders",
          folderId,
          "Documents",
          documentId
        )
      : doc(db, "Folders", folderId, "Documents", documentId);
    await deleteDoc(documentRef);
    window.toastify("Document deleted successfully", "success");
    console.log("Document deleted successfully");
  } catch (error) {
    window.toastify("Error deleting document", "error");
    console.error("Error deleting document:", error);
  }
};

export {
  updateDocument,
  deleteDocument,
  addDocument,
  deleteSubfolder,
  updateSubfolder,
  createSubfolder,
  deleteFolder,
  updateFolder,
  createFolder,
};
