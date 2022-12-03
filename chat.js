import {
  addDoc,
  onSnapshot,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";

export const initChat = (messagesColection) => {
  const messagesBySentAt = query(messagesColection, orderBy("sentAt", "asc"));

  onSnapshot(messagesBySentAt, (result) => {
    renderMessages(result.docs);
  });
};

export const renderMessages = (messages) => {
  const chat = document.querySelector("#chat");

  if (chat) {
    chat.innerHTML = "";

    messages.forEach((doc) => {
      const message = doc.data();
      const sentAt = message.sentAt.toDate().toLocaleString();
      const photoURL =
        message.authorPhoto && message.authorPhoto !== ""
          ? message.authorPhoto
          : "./mario.png";

      chat.innerHTML += `<li class="list-group-item d-flex align-items-center">
            <img class="img-avatar me-3" src="${photoURL}" alt="Mario" id="avatar" />

            <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <em class="text-muted">${message.author}</em><em class="text-muted">${sentAt}</em>
                </div>
                <div class="d-flex align-items-center">
                    ${message.content}
                </div>
            </div>

          </li>`;
    });
  }
};

export const initSendForm = (messagesColection, user) => {
  const form = document.querySelector("#sendForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const message = {
        content: formData.get("content"),
        author: user.displayName ? user.displayName : user.email,
        sentAt: Timestamp.now(),
        authorPhoto: user.photoURL,
      };

      addDoc(messagesColection, message).then((result) => {
        console.log("Wiadomość została wysłana!");
      });
    });
  }
};
