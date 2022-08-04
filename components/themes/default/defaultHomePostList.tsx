import {Post} from "../../../lib/common/post";
import {Card, ListGroup} from "react-bootstrap";

export default function DefaultHomePostList({posts}: { posts: Post[] }) {
    return (
        <Card>
            <Card.Header>最近更新</Card.Header>
            <ListGroup variant="flush">
                {posts.map((post) => (
                    <ListGroup.Item key={post.postid}>
                        <a href={post.permalink} rel="noreferrer">{post.title}</a>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    )
}