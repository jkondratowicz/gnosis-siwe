import { useEffect, useState } from 'react';
import { useWeb3Context } from '../hooks/useWeb3Context.tsx';
import { useApi } from '../hooks/useApi.ts';
import { SpinnerOverlay } from './SpinnerOverlay.tsx';

export const Profile = () => {
  const { address, isLoggedIn } = useWeb3Context();
  const [profile, setProfile] = useState<any>();
  const [dirtyProfile, setDirtyProfile] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const callApi = useApi();

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const response = await callApi('/profile');
      setProfile(response?.data);
      setDirtyProfile(response?.data ?? {});
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async () => {
    try {
      setIsLoading(true);
      await callApi('/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dirtyProfile),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      await loadProfile();
    }
  };

  const updateProfile = async () => {
    try {
      setIsLoading(true);
      await callApi('/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dirtyProfile),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
      setIsLoading(false);
      await loadProfile();
    }
  };

  useEffect(() => {
    void loadProfile();
  }, [address, isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  const updateDirtyProfile = (key: string, value: any) => {
    setDirtyProfile((prev: any) => ({ ...prev, [key]: value }));
  };

  const renderForm = () => {
    return (
      <>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
          value={dirtyProfile?.username ?? ''}
          onChange={(e) => updateDirtyProfile('username', e.target.value)}
        />
        <label htmlFor="bio" className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Bio
        </label>
        <textarea
          id="bio"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={dirtyProfile?.bio ?? ''}
          onChange={(e) => updateDirtyProfile('bio', e.target.value)}
        />
      </>
    );
  };

  const renderCreateProfile = () => {
    if (profile) {
      return null;
    }

    return (
      <div>
        <p>You currently don't have a profile. You can create one below.</p>
        <div className="mb-2">
          {renderForm()}
          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-4"
            onClick={() => createProfile()}
          >
            Create a profile
          </button>
        </div>
      </div>
    );
  };

  const renderProfileDetails = () => {
    if (!profile || isEditing) {
      return null;
    }

    return (
      <>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => setIsEditing(true)}
        >
          Edit profile
        </button>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </>
    );
  };

  const renderProfileUpdate = () => {
    if (!profile || !isEditing) {
      return null;
    }

    return (
      <div>
        <p>Update your profile details below.</p>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => {
            setIsEditing(false);
            setDirtyProfile(profile);
          }}
        >
          Cancel editing
        </button>
        <div className="mb-2">
          {renderForm()}
          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-4"
            onClick={() => updateProfile()}
          >
            Update your profile
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isLoading && <SpinnerOverlay />}
      <h1 className="text-2xl mt-4 mb-2">Your profile</h1>
      {renderCreateProfile()}
      {renderProfileDetails()}
      {renderProfileUpdate()}
    </div>
  );
};
