import './App.css';
import InfiniteScroll from "react-infinite-scroll-component";
import { PostModel } from './models/PostModel';
import React, { useEffect } from 'react';
import { server } from './services/CallServer';
import Post from './components/Post.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {

  const [posts, setPosts] = React.useState([]);
  const [shift, setShift] = React.useState(11);

  const errorHandler = (errorCode) => {
    console.log('error=' + errorCode);
  }

  const callBack = (statusCode, info) => {
    //console.log(JSON.stringify(info));

    let newPosts = [];
    for (let i = info.length - 1; i >= 0; i--) {
      newPosts.push(new PostModel(info[i].date, info[i].url, info[i].title, info[i].explanation));
      let combinedPosts = posts.concat(newPosts);
      setPosts(combinedPosts);
    }
  }

  useEffect(() => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    let endDate = date.toISOString().slice(0, 10);
    date.setDate(date.getDate() - 20);
    let startDate = date.toISOString().slice(0, 10);
    console.log(startDate + " " + endDate);
    server.getResultWithCallback(null, callBack, errorHandler, "https://api.nasa.gov/planetary/apod?api_key=jEgBvIifn0mS8LkqoWv6hMQetbbE2sEL4wkBkBdM&start_date=" + startDate + "&end_date=" + endDate, "get");
  }, [])

  const fetchMoreData = () => {
    let date = new Date();
    date.setDate(date.getDate() - shift);
    let str = formatDate(date);//date.toISOString().slice(0, 10) + "";
    let endDate = str;
    date.setDate(date.getDate() - 10);
    str = formatDate(date);//date.toISOString().slice(0, 10) + "";
    let startDate = str;
    console.log(startDate + " " + endDate);
    setShift(shift + 11);
    server.getResultWithCallback(null, callBack, errorHandler, "https://api.nasa.gov/planetary/apod?api_key=jEgBvIifn0mS8LkqoWv6hMQetbbE2sEL4wkBkBdM&start_date=" + startDate + "&end_date=" + endDate, "get");
  };

  function formatDate(date) {
    var month = '' + (date.getMonth() + 1);
    var day = '' + date.getDate();
    var year = date.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  return (
    <Container maxWidth="sm">
      <Typography sx={{mt: 4, fontSize: 25}}>Spacestagram</Typography>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<CircularProgress sx={{mt: 3, mb: 3}}/>}
        style={{overflow: "hidden"}}
      >
        {posts.map((post, index) => (
          <Box sx={{ mt: 3 }}>
            <Post
              image={post.image}
              title={post.title}
              date={post.date}
              description={post.description}

            />
          </Box>

        ))}
      </InfiniteScroll>
    </Container>
  );
}

export default App;
