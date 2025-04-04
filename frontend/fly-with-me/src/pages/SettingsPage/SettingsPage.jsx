import React, { useEffect, useState } from 'react';
import './SettingsPage.css';
import { jwtDecode } from 'jwt-decode';

const fetchUserData = async (userId, token) => {
  try {
    const response = await fetch(`http://localhost:5000/api/auth/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Eroare la fetch:", err.message);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Eroare rețea:", err);
    return null;
  }
};

const SettingsDrawer = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '********',
  });

  const [editField, setEditField] = useState(null);
  const [newValue, setNewValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmInput, setShowConfirmInput] = useState(false);


  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const user = await fetchUserData(userId, token);
        if (user) {
          setUserData({
            username: user.username,
            email: user.email,
            password: '********',
          });
        }
      } catch (err) {
        console.error('Eroare la decodificare sau fetch user:', err);
      }
    };

    if (isOpen) {
      getUserData();
    }
  }, [isOpen]);

  const handleEditClick = (field) => {
    setEditField(field);
    setNewValue('');
    setConfirmPassword('');
    setShowConfirmInput(false);
  };

  const handleSaveClick = () => {
    if (!newValue) {
      alert('Te rog completează noua valoare.');
      return;
    }
    setShowConfirmInput(true);
  };

  const handleConfirm = async () => {
    if (!confirmPassword) {
      alert('Introdu parola actuală pentru a confirma.');
      return;
    }
  
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
  
    try {
      const response = await fetch(`http://localhost:5000/api/auth/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          field: editField,
          newValue: newValue,
          currentPassword: confirmPassword,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Modificare salvată cu succes!");
        setUserData((prevData) => ({
          ...prevData,
          [editField]: editField === 'password' ? '********' : newValue,
        }));
        setEditField(null);
        setNewValue('');
        setConfirmPassword('');
        setShowConfirmInput(false);
      } else {
        alert(result.message || "Eroare la salvare.");
      }
    } catch (err) {
      console.error("Eroare la update:", err);
      alert("Eroare la conexiune cu serverul.");
    }
  };
  

  return (
    <div className={`drawer-overlay ${isOpen ? 'open' : ''}`}>
      <div className="drawer">
        <div className="drawer-header">
          <h3>Edit Profile</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="drawer-content">
          {['username', 'email', 'password'].map((field) => (
            <div key={field} className="settings-field">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              {editField === field ? (
                <>
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    placeholder={`Nou ${field}`}
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                  />
                  {!showConfirmInput ? (
                    <button className="save-btn" onClick={handleSaveClick}>Save</button>
                  ) : (
                    <>
                      <input
                        type="password"
                        placeholder="Confirmă cu parola actuală"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <span>{userData[field]}</span>
                  <button className="edit-btn" onClick={() => handleEditClick(field)}>Edit</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsDrawer;
