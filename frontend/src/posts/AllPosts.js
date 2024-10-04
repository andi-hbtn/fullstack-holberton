import { useEffect, useState } from "react";
import axios from "axios";

import { Button, Card } from 'react-bootstrap';

const AllPosts = () => {
  useEffect(() => {
    getAllPosts();
  }, []);

  const [posts, setPosts] = useState([]);


  async function getAllPosts() {
    const result = await axios.get("http://localhost:3000/api/posts/all");
    setPosts(result.data);
    return result;
  }


  console.log("results----", posts);

  return (

    <div className="App">
      {
        posts.map((post, index) => {
          console.log("post----", post);
          return post.is_active === true || post.is_active === false?
           ( <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Id:{post.id}</Card.Title>
                <Card.Title>{post.title}</Card.Title>
                {
                  post.is_active === true ? < Card.Title > True </Card.Title> : < Card.Title > False </Card.Title>
                }
                <Card.Text>
                  {post.description}
                </Card.Text>
                <Button variant="primary">{post.price}</Button>
              </Card.Body>
            </Card>)
            : <p></p>
        })
      }
    </div >
  );
}

export default AllPosts;
