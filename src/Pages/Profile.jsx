import { useState } from "react";

import useAuth from "../store/old/auth-context";
import axios from "axios";

const UPDATE_PROFILE_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmSv7uTvH1Dsz9pWQEa9-BztI1xV9F4H0";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { token } = useAuth();

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    

    const profileData = {
      idToken: token,
      displayName: displayName,
      photoUrl: photoUrl,
      deleteAttribute: "",
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(UPDATE_PROFILE_URL, profileData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <h3>Give it all you got</h3>.
        <div>
          <p>
            {" "}
            Your Profile is <strong>65%</strong> completed. A complete Profile
            has higher chance of landing a job. <span>Complete Now</span>
          </p>
        </div>
      </div>
      <div>
        <form onSubmit={handleProfileSubmit}>
          <section>
            <div>
              <label htmlFor="name">Full Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Profile Photo URL:</label>
              <input
                id="name"
                name="name"
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
              />
            </div>
          </section>

          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
