import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type UserProfile = {
  name: string;
  login: string;
  description: string;
};

type UpdatedUserProfile = {
  name: string;
  login: string;
  description: string;
  oldPassword: string;
  newPassword: string;
};

export const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdatedUserProfile>({
    name: "",
    login: "",
    description: "",
    oldPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getProfileData = () => {
      const token = Cookies.get("CookiesToken");

      if (!token) {
        console.error("Token not found");
        return;
      }

      console.log("getProfileData token:", `${token}`);
      axios
        .get<UserProfile>("https://localhost:7161/api/user/current", { withCredentials: true })
        .then((response) => {
          setUserProfile(response.data);
          setFormData({ ...formData, ...response.data });
        })
        .catch((error) => {
          console.error("Failed to load user profile ", error.message);
        });
    };

    getProfileData();
  }, []);

  const handleSave = () => {
    const token = Cookies.get("CookiesToken");

    if (!token) {
      console.error("Token not found");
      return;
    }

    console.log("handleSave token:", `${token}`);
    axios
      .post("https://localhost:7161/api/user/update", formData, { withCredentials: true })
      .then((response) => {
        setUserProfile(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Failed to update profile", error);
      });
  };

  const handleCancel = () => {
    if (userProfile) {
      setFormData({ ...formData, ...userProfile, oldPassword: "", newPassword: "" });
    }
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const add = () => navigate("/add-recipe");

  return {
    handleInputChange,
    handleCancel,
    handleSave,
    isEditing,
    formData,
    userProfile,
    setIsEditing,
    add,
  };
};
