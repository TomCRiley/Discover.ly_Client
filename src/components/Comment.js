import React from 'react';
import { getUserById } from '../api/spots';
import { getLoggedInUserId } from '../lib/auth.js';

const Comment = ({ text, rating, updatedAt, createdBy, onClick }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const user = await getUserById(createdBy);
      setUser(user);
    };

    getData();
  }, []);

  const isOwnComment = () => {
    if (getLoggedInUserId() === createdBy) {
      return true;
    }
    return false;
  };

  return (
    <div className="notification">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            {user ? (
              <p className="subtitle is-6">{`@${user.username}`}</p>
            ) : null}
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <p>{updatedAt.slice(0, 10)}</p>
          </div>
        </div>
      </div>
      <div className="level">
        <div className="level-left">
          <p className="level-item">{rating}/5</p>
          <p className="level-item">{text}</p>
        </div>
        {isOwnComment() && (
          <div className="level-right">
            <button type="button" onClick={onClick}>
              <span className="icon">
                <i className="fas fa-trash-can"></i>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
