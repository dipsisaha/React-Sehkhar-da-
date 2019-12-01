import React from 'react';

function Posts(props) {
    let { posts,addLikes, addComments  } = props;
    return (
        
            <div className="alert alert-info">
                <p>{posts.post}</p><span>{posts.image}</span>
                <br/>
                <input className="form-control" onBlur={(e) => { addComments(posts, e) }} placeholder="Comments" />
                <img src="/images/like.png" height="30px" width="30px"
                    onClick={() => { addLikes(posts) }} />
                <br />
                {posts.comments.map((comment, idx) => {
                    return <div key={idx} className="text-monospace">{comment}</div>
                })}
            </div>
        
    );
}

export default Posts;