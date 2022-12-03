import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { redirectTo } from "./login";

export const initProfileForm = async (user, storage) => {
  const form = document.querySelector("#userProfileForm");

  if (form) {
    const displayNameInput = document.querySelector("[name='displayName']");
    displayNameInput.value = user.displayName;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const picture = formData.get("profilePicture");

      const profile = {
        displayName: formData.get("displayName"),
      };

      if (picture && picture.size > 0) {
        const ext = picture.name.split(".")[1];
        const filePath = "users/" + user.uid + "." + ext;

        const pictureRef = ref(storage, filePath);

        const result = await uploadBytes(pictureRef, picture);

        const url = await getDownloadURL(result.ref);

        profile.photoURL = url;
      }

      updateProfile(user, profile).then(() => {
        redirectTo("/index.html");
      });
    });
  }
};

export const displayAvatar = (user) => {
  const avatar = document.querySelector("#avatar");

  if (avatar) {
    avatar.src = user.photoURL;
  }
};
