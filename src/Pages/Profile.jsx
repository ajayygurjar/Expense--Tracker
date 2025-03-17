import React, { useState } from "react";
import useAuth from "../store/auth-context";  // Custom hook to manage authentication context
import axios from "axios";

const API_KEY = `AIzaSyDmSv7uTvH1Dsz9pWQEa9-BztI1xV9F4H0`;
const UPDATE_PROFILE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const { token } = useAuth();  // Getting the token from the AuthContext
  
  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    const profileData = {
      idToken: token,  // Send the authentication token to identify the user
      displayName: displayName,  // New display name to update
      photoUrl: photoUrl,  // New photo URL to update
      returnSecureToken: true,  // Request to return a new token (optional)
    };

    try {
      const response = await axios.post(UPDATE_PROFILE_URL, profileData);  // Send the POST request
      console.log(response.data);  // Log the response data to see if it's successful

      // Optionally, you can handle the response data here, like saving the new token or redirecting the user
    } catch (error) {
      console.log("Error updating profile:", error);  // Handle error if the request fails
    }
  };

  return (
    <div>
      <div>
        <h3>Winners never quit, Quitters never win</h3>
        <div>
          <p>
            Your Profile is <strong>65%</strong> completed. A complete Profile
            has a higher chance of landing a job.{" "}
            <span>Complete now</span>
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
              <label htmlFor="photoUrl">Profile Photo URL</label>
              <input
                id="photoUrl"
                name="photoUrl"
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
              />
            </div>
          </section>

          <div>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
