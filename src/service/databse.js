import { firestore } from "./firebase";

export function getPreviousResults() {
  return new Promise((resolve, reject) => {
    firestore
      .collection("generates")
      .limit(50)
      .orderBy("time")
      .get()
      .then((response) => {
        resolve(response.docs.map((doc) => doc.data()));
      });
  });
}
