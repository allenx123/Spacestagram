import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';

export default function Post(props) {
    const [comments, setComments] = React.useState([]);
    const [text, setText] = React.useState('');
    const [like, setLike] = React.useState(true);

    const addComment = () => {
        setComments(comments => [...comments, text]);
    }
    const clickedLike = () => {
        setLike(!like);
    }


    return (
        <Card variant="outlined" sx={{ maxWidth: 600, pb: 2, boxShadow: 0 }} >
            <CardMedia
                component="img"
                height="400"
                image={props.image}
                alt="not available"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                    {props.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
                <Divider sx={{ mb: 2, mt: 2 }}>

                </Divider>
                {comments.map((comment, index) => (

                    <Typography variant="body2" color="text.secondary">
                        <span style={{ fontWeight: 'bold' }}>user1 </span>
                        <span>{comment}</span>
                    </Typography>
                ))}
            </CardContent>
            <CardActions>
                <div onClick={() => clickedLike()} style={{ marginLeft: 5, marginRight: 10 }}>
                    {like ? <FavoriteBorderIcon /> : <FavoriteIcon color="primary" />}
                </div>

                <Input size="small" sx={{ width: 1, ml: 20 }} placeholder="Add a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}>
                </Input>
                <Button disableRipple size="large" style={{ backgroundColor: 'transparent'}} sx={{textTransform: "none"}} onClick={() => addComment()}>Post</Button>
            </CardActions>
        </Card>
    );
}
