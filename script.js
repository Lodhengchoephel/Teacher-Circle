import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.sendMessage = async function () {
    const input = document.getElementById("message");
    if (input.value.trim() === "") return;

    await addDoc(collection(db, "messages"), {
        text: input.value,
        time: Date.now()
    });

    input.value = "";
};

const q = query(collection(db, "messages"), orderBy("time"));

onSnapshot(q, (snapshot) => {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    snapshot.forEach((doc) => {
        const div = document.createElement("div");
        div.textContent = doc.data().text;
        chatBox.appendChild(div);
    });
});
