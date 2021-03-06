import axios from 'axios';

export const getAllSpots = async () => {
  const options = {
    method: 'GET',
    url: '/api/spots',
  };

  const { data } = await axios.request(options);

  return data;
};

export const getAllSpotsForUser = async (userId) => {
  const options = {
    method: 'GET',
    url: `/api/spots/users/${userId}`,
  };

  const { data } = await axios.request(options);

  return data;
};

export const getLikedSpotsForUser = async (userId) => {
  const options = {
    method: 'GET',
    url: `/api/spots/likes/users/${userId}`,
  };

  const { data } = await axios.request(options);

  return data;
};

export const getFilteredSpots = async (filter) => {
  const options = {
    method: 'GET',
    url: `/api/search?text=${filter.text}`,
  };
  const { data } = await axios.request(options);

  return data;
};

export const getSpotById = async (id) => {
  const options = {
    method: 'GET',
    url: `/api/spots/${id}`,
  };

  const { data } = await axios.request(options);

  return data;
};

//move to user.js file in api folder
export const getUserById = async (userId) => {
  const options = {
    method: 'GET',
    url: `/api/users/${userId}`,
  };

  const { data } = await axios.request(options);

  return data;
};

export const likeSpot = async (id) => {
  const options = {
    method: 'PUT',
    url: `/api/spots/${id}/like`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
  const { data } = await axios.request(options);

  return data;
};

export const unlikeSpot = async (id) => {
  const options = {
    method: 'PUT',
    url: `/api/spots/${id}/unlike`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
  const { data } = await axios.request(options);

  return data;
};

export const createSpot = async (newSpot) => {
  const options = {
    method: 'POST',
    url: '/api/spots',
    data: newSpot,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
  const { data } = await axios.request(options);

  return data;
};

export const createComment = async (id, comment) => {
  const options = {
    method: 'POST',
    url: `/api/spots/${id}/comments`,
    data: comment,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
  const { data } = await axios.request(options);

  return data;
};

export const deleteComment = async (id, commentId) => {
  const options = {
    method: 'DELETE',
    url: `/api/spots/${id}/comments/${commentId}`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
  const { data } = await axios.request(options);

  return data;
};
