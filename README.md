# ReadMe

# 🌎Discover.ly Client🌎
We deployed this website using Heroku ➡️[HERE](https://discoverly.netlify.app/)⬅️. The free servers on Heroku sleep when they are not in use, so please allow a few seconds for them to wake up! 😴

You can find the API side of the project ➡️[HERE](https://github.com/TomCRiley/discover.ly_api#readme)⬅️

### Developers
[Tom Riley](https://github.com/TomCRiley)
[Ashley Gyngell](https://github.com/ashleygyngell)
[Elise La Rooy](https://github.com/eliselarooy)

## Brief
* 7 days to build a full front and end and backend web application.
* Complex CRUD operations like posting and commenting, with user registration and authentication with JWT tokens. All served from a Mongo database to an Express API.
* Consume the API with a React front end.
* Use any combination of CSS framework or CSS/SASS to style the front end.

## Overview and Concept

![tM8rpQWW26ACuvw8IPwP5Z5R68TFLzIW232zpw5AnrYI295FYaRkoSt2sfL_TtMLwQr6JvVsB1sRM8URkODs7OJXJh4iDOLRRoEI4_gop9LS6ZJw885BxnE7r9MQqhPGmhraWrPAusSVTw2Wag](https://user-images.githubusercontent.com/97558359/168836890-edfbc174-cbbe-423a-a682-e2d6fa74c5f7.png)

<img width="754" alt="vj6Fev_TZKJ4RNHvi9TEQcRGAY2HO4AgBFowHB9BjNrv68T9m55CtQAGGILTVkQ6X0xvqEZLWa-FTAGWTL0AR51OIMjxU6ZINY7CJd9NnzzvuHaG_KReNixExIYmNc7vL9-4JQ-4i0wGQq5Sig" src="https://user-images.githubusercontent.com/97558359/168836917-e2fc8c12-30a4-4f49-9fb0-01cdea749831.png">


## Technologies Used
### Database
* MongoDB
### Backend
* Node.js
* Express
### Frontend 
* JavaScript / ES6
* React.js
* HTML5
* CSS3 + SASS
* Bulma.io
### Dependencies
* Axios
* JSONWeb Tokens
* Bcrypt 
* React-router-dom
* Babel
* Cloudinary
* Bulma
* Leaflet.js
### Dev Tools
* Visual Studio Code
* Git + GitHub
* Postman
* Cloudinary
* Heroku + Netlify
* Vectornator
* Figma
* Excalidraw
### Installation Instructions
* Clone our repo from GitHub onto your machine.
* Use yarn or npm to install all dependencies from the package.json file.

### Planning + Wireframing

![9ghxhmgChBi0LU6gVCViSLgUTnT9EsoQ56Pb-81ilMYhFyVYz8OE51QFmGbHnhlA5kmRn0_-ih9eY1Ymot2gRd2Mh0RSHJV0xkTn1JZUEwfeWOVHHi4FG6xSZaI1T3AkvJ-gCID6fFzWLtbqBw](https://user-images.githubusercontent.com/97558359/168837004-51a6aa34-ab80-44f1-9297-49dfd2262cbf.png)


![SnRV9R3227ialOz1efiX9lAYW_taUlR0CInHn3ygdD1UHHdx6f0wf_v_5wwORXkZkRFVprNjl5Sx0IqY0J1glAoXrtzU-ipE3bXGkFibNaUbbLzReSs-h8IP-M-okJVhfU0gIJ1NTD_QzrmE5g](https://user-images.githubusercontent.com/97558359/168837011-3668b251-4ec8-47e2-b184-4663bf67fdc2.png)

<img width="650" alt="Lt0eoa9JsIGk4-A-jr7Z1Rc-pqXeNl77Y6oUWbKmNBPrzP3psAlTrap0TpJ3HKOqY0LX0JNhwt-v10qXFYDah9ekH-0K1nGyYBySPtkV24aYb1vF96jyXK0Jx8E9ipqSgCjAhCXkkhqOgMAHkg" src="https://user-images.githubusercontent.com/97558359/168837071-abd341bb-0f02-47e6-bfb1-debcc937afad.png">

## The Build
* We were placed into groups of three. For us, it was alarmingly easy to come up with a concept for a project. We wanted to build something social, something that represented the different corners of England that we live in and something that would be flexible enough to be expanded upon should we reach our MVP in good time.
* We came up with a social discovery app, where users can post their favourite running routes or hiking locations. Our MVP would be to post and upload pictures, and our stretch goals would include vital things like mapping (though important, we thought it could be a huge time-sink).
* We worked in an Agile methodology, with daily stand ups and some pair programming when necessary. 
* Primarily, we worked with version control through Git and on our own branches of the repository. Occasionally there were some merge conflicts, but these were generally avoided as we worked siloed into our own components or pre defined tasks that we would take from the Trello board.

```JavaScript
const createComment = async (req, res, next) => {
  try {
    const spot = await Spot.findById(req.params.id);

    if (!spot) {
      return res.status(404).send({ message: 'Spot not found!' });
    }

    const newComment = { ...req.body, createdBy: req.currentUser._id };

    spot.comments.push(newComment);
    const savedSpot = await spot.save();

    return res.status(201).json({ message: 'New comment created!', savedSpot });
  } catch (err) {
    next(err);
  }
};
```

One of our first priorities was to create endpoints for all our major user functionality like posting a location they’d discovered or uploading a comment or a picture. This is an endpoint that allows a user to post a comment.

We first needed a way to interface between our Express functionality and the Mongo database. We used Mongoose which enabled us to easily perform CRUD operations on the correct collection in our database. 

With Mongoose, we designed our schemas that allow us to store our data in a specific configuration. 

```JavaScript
const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 300 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);
export default mongoose.model('Comment', commentsSchema);
```

Here we are telling Mongoose that the comment a user creates ::must have:: text, which is a string and has a max length of 300 characters, along with a rating between 1 and 5, a username and a time stamp.

```javascript
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
```

In our front end, we accessed the endpoint with Axios, making sure to include a header with the authorisation token so that only a logged in user can make a comment. 

```javascript
const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const user = await getUserById(createdBy);
      setUser(user);
    };

    getData();
  }, []);const [user, setUser] = React.useState(null);
```

Lastly, to implement the comment we used React useEffect to grab the data from the endpoint with an asynchronous function. We then used setState to update the HTML with the new data from the endpoint - in this case, a user comment.

<img width="740" alt="RnI0GVotsH6BMZHFS0tfYhWOiu0eC5STZPp8yr0yWPElBuj-bf_V2MgqOC6ehxYxSZTPVRvJVtnkbktWPQT2rhh6hnYlUFpJbYGvf1mIKgCnCmimbGjU-Uk85gLt3iSfcmntHgKY4D9g-C9_hQ" src="https://user-images.githubusercontent.com/97558359/168837286-a2e9e47f-b59d-44a5-9abd-0292df9066e0.png">

## Wins
This was a huge step up in complexity from my previous hackathon project. I really enjoyed the project management aspect of this early on, deciphering what we needed to do as soon as possible for MVP and feeding back to our teachers in stand ups. 

I also found it was great experiencing working in teams with a fuller understanding of version control and how to merge independent features together. We iterated extremely fast because of this and my teammates Elise and Ash came just as ready as I did every single day to smash the project. It was a really collaborative environment where we implemented as many ideas as we could think of.

I personally am very proud of managing to get maps into the website, especially implementing the ‘pin’ functionality of Leaflet.js and customising it to include the logo I had designed. 

## Stretch Goals
As mentioned, we did iterate very quickly and managed to include most of our wishlist features. Something we didn’t manage to implement was a user bio that a user could update after registration. 
