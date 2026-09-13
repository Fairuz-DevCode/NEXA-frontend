import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAddresses, createAddress, deleteAddress } from '../api/address';
import { updateUserProfile, changePassword } from '../api/admin';

export const useUserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');

  // Profile State
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password State
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Address State
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: '',
    phone: '',
    street_address: '',
    city: '',
    country: 'Indonesia',
    postal_code: '',
  });

  // Sync profileForm dengan currentUser saat Auth Context siap
  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
      });
    }
  }, [currentUser]);

  // Load alamat pengiriman
  const loadAddresses = () => {
    setLoadingAddresses(true);
    getAddresses()
      .then((data) => setAddresses(data || []))
      .catch(() => {})
      .finally(() => setLoadingAddresses(false));
  };

  useEffect(() => {
    if (activeTab === 'address') {
      loadAddresses();
    }
  }, [activeTab]);

  // Submit Update Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setProfileSaving(true);
      await updateUserProfile(profileForm);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      alert('Gagal memperbarui profil: ' + (err.response?.data?.message || err.message));
    } finally {
      setProfileSaving(false);
    }
  };

  // Submit Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      setPasswordSaving(true);
      await changePassword(passwordForm);
      setPasswordSuccess(true);
      setPasswordForm({ oldPassword: '', newPassword: '' });
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      alert('Gagal mengubah password: ' + (err.response?.data?.message || err.message));
    } finally {
      setPasswordSaving(false);
    }
  };

  // Create Address
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      await createAddress(newAddr);
      setIsAddModalOpen(false);
      setNewAddr({ label: '', phone: '', street_address: '', city: '', country: 'Indonesia', postal_code: '' });
      loadAddresses();
    } catch (err) {
      alert('Gagal menambah alamat: ' + (err.response?.data?.message || err.message));
    }
  };

  // Delete Address
  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Hapus alamat ini?')) return;
    try {
      await deleteAddress(id);
      loadAddresses();
    } catch (err) {
      alert('Gagal menghapus alamat: ' + (err.response?.data?.message || err.message));
    }
  };

  return {
    currentUser,
    activeTab,
    setActiveTab,
    profileForm,
    setProfileForm,
    profileSaving,
    profileSuccess,
    handleSaveProfile,
    passwordForm,
    setPasswordForm,
    passwordSaving,
    passwordSuccess,
    handleChangePassword,
    addresses,
    loadingAddresses,
    isAddModalOpen,
    setIsAddModalOpen,
    newAddr,
    setNewAddr,
    handleAddAddress,
    handleDeleteAddress,
  };
};