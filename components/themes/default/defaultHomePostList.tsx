import {Post} from "../../../lib/common/post";
import {Card, ListGroup} from "react-bootstrap";

export default function DefaultHomePostList({posts, type}: { posts: Post[], type: string }) {
    return (
        <Card>
            <Card.Header>最近更新</Card.Header>
            <ListGroup variant="flush">
                {posts.length > 0 ?
                    posts.map((post) => (
                        <ListGroup.Item key={post.postid}>
                            <a href={post?.permalink} rel="noreferrer">{post.title}</a>
                        </ListGroup.Item>
                    )) :
                    <ListGroup.Item key="norecord">
                        ~未查询到内容~
                    </ListGroup.Item>
                }
            </ListGroup>
        </Card>
    )
}