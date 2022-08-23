import {Post} from "../../../lib/common/post";
import {Card, ListGroup} from "react-bootstrap";
import {getQueryString, isEmptyString} from "../../../lib/util";
import {API_TYPE_CONSTANTS} from "../../../lib/constants";

const getPermalink = function (postid: string, type: string) {
    let postUrl = "/post/" + postid + ".html"
    if (!isEmptyString(type) && type != API_TYPE_CONSTANTS.API_TYPE_SIYUAN) {
        postUrl = "/post/" + postid + ".html?t=" + type
    }
    return postUrl
}

export default function DefaultHomePostList({posts, type}: { posts: Post[], type: string }) {
    return (
        <Card>
            <Card.Header>最近更新</Card.Header>
            <ListGroup variant="flush">
                {posts.length > 0 ?
                    posts.map((post) => (
                        <ListGroup.Item key={post.postid}>
                            <a href={getPermalink(post.postid, type)} rel="noreferrer">{post.title}</a>
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