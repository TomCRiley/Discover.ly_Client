import axios from 'axios';

export const getAllSpots = async () => {
  const options = {
    method: 'GET',
    url: '/api/spots',
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
    url: `/api/spots/${id}/likes`,
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
