import React, { useState, useEffect } from "react";
import useAuth from "../store/auth-context";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = `AIzaSyAWVnD8ZpwnamACMsH-P3a-kmn1_BVi8q8`;
const UPDATE_PROFILE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const GET_PROFILE = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const profileData = {
          idToken: token,
        };
        try {
          const response = await axios.post(GET_PROFILE, profileData);
          console.log("Data is updated");
          const userProfile = response.data.users[0];
          // Populate state with current profile data
          setDisplayName(userProfile.displayName || "");
          setPhotoUrl(userProfile.photoUrl || "");
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [token]);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    const profileData = {
      idToken: token,
      displayName: displayName,
      photoUrl: photoUrl,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(UPDATE_PROFILE_URL, profileData);
      console.log(response.data);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  return (
    <div>
      <div>
        <h3>Winners never quit, Quitters never win</h3>
        <div>
          <p>
            Your Profile is <strong>65%</strong> completed. A complete Profile
            has a higher chance of landing a job. <span>Complete now</span>
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
          <div>
          <Link to="/home">
              <button type="button" >
                Cancel
              </button>
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
