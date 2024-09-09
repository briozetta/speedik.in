
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const posts = [
    {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "officia porro iure quia iusto qui ipsa ut modi",
      "url": "https://via.placeholder.com/600/24f355",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    },
    {
      "albumId": 1,
      "id": 4,
      "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      "url": "https://via.placeholder.com/600/d32776",
      "thumbnailUrl": "https://via.placeholder.com/150/d32776"
    },
   
    {
      "albumId": 3,
      "id": 109,
      "title": "quidem ut quos non qui debitis exercitationem",
      "url": "https://via.placeholder.com/600/c5e1ce",
      "thumbnailUrl": "https://via.placeholder.com/150/c5e1ce"
    },
    {
      "albumId": 3,
      "id": 110,
      "title": "reiciendis et velit laborum recusandae",
      "url": "https://via.placeholder.com/600/2f9e30",
      "thumbnailUrl": "https://via.placeholder.com/150/2f9e30"
    },
    {
      "albumId": 3,
      "id": 111,
      "title": "quos rem nulla ea amet",
      "url": "https://via.placeholder.com/600/cc178e",
      "thumbnailUrl": "https://via.placeholder.com/150/cc178e"
    },
    {
      "albumId": 3,
      "id": 112,
      "title": "laudantium quibusdam inventore",
      "url": "https://via.placeholder.com/600/170690",
      "thumbnailUrl": "https://via.placeholder.com/150/170690"
    },
    {
      "albumId": 3,
      "id": 113,
      "title": "hic nulla consectetur",
      "url": "https://via.placeholder.com/600/1dff02",
      "thumbnailUrl": "https://via.placeholder.com/150/1dff02"
    },
    {
      "albumId": 3,
      "id": 114,
      "title": "consequatur quaerat sunt et",
      "url": "https://via.placeholder.com/600/e79b4e",
      "thumbnailUrl": "https://via.placeholder.com/150/e79b4e"
    },
    {
      "albumId": 3,
      "id": 115,
      "title": "unde minus molestias",
      "url": "https://via.placeholder.com/600/da7ddf",
      "thumbnailUrl": "https://via.placeholder.com/150/da7ddf"
    },
   
    {
      "albumId": 4,
      "id": 151,
      "title": "possimus dolor minima provident ipsam",
      "url": "https://via.placeholder.com/600/1d2ad4",
      "thumbnailUrl": "https://via.placeholder.com/150/1d2ad4"
    },
    {
      "albumId": 4,
      "id": 152,
      "title": "et accusantium enim pariatur eum nihil fugit",
      "url": "https://via.placeholder.com/600/a01c5b",
      "thumbnailUrl": "https://via.placeholder.com/150/a01c5b"
    },]

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    // Instead of fetching from API, return the posts array
    return posts;
  });


//   export const fetchData = createAsyncThunk('data/fetchData', async () => {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
//     return response.data;
//   });
  