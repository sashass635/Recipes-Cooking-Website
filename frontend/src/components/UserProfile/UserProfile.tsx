import { UserProfile } from "./UserProfile.state";

export const UserProfileWindow = () => {
  const { handleInputChange, handleCancel, handleSave, isEditing, formData, userProfile, setIsEditing } = UserProfile();

  return (
    <div>
      <h2>Мой профиль</h2>
      {isEditing ? (
        <div>
          <label>
            Имя:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <label>
            Логин:
            <input type="text" name="login" value={formData.login} onChange={handleInputChange} />
          </label>
          <label>
            Описание:
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
          </label>
          <label>
            Старый пароль:
            <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleInputChange} />
          </label>
          <label>
            Новый пароль:
            <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {userProfile?.name}</p>
          <p>Login: {userProfile?.login}</p>
          <p>Description: {userProfile?.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};
