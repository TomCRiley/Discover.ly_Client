import React from 'react';
import { getUserById } from '../api/spots';

const Comment = ({ text, rating, updatedAt, createdBy }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const user = await getUserById(createdBy);
      setUser(user);
    };

    getData();
  }, []);

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
      <div>
        <p>{rating}/5</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
