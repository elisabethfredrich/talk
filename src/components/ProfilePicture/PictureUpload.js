import ProfilePicture from "./ProfilePicture";
import "./ProfilePicture.css";

const PictureUpload = ({ setPicture }) => {
  const loadFile = (e) => {
    const image = document.querySelector("#output");
    const file = e.target.files[0];
    image.src = URL.createObjectURL(file);
    document.getElementById("edit-icon").style.display = "flex";
    document.getElementById("add-icon").style.display = "none";

    setPicture(file);
  };

  return (
    <div className="profile-picture-container">
      <div id="background"></div>
      <input
        id="input"
        type="file"
        accept=".jpeg, .png, .jpg"
        onChange={loadFile}
      />
      <ProfilePicture large id="output" />

      <span
        id="add-icon"
        className="material-symbols-outlined icon-link large-icon"
      >
        add_photo_alternate
      </span>
      <div id="edit-icon">
        <span className="material-symbols-outlined icon-link icon-no-margin">
          edit
        </span>
      </div>
    </div>
  );
};

export default PictureUpload;
