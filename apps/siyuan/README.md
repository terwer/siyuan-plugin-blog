[中文](README_zh_CN.md)

# Share to web

Your self-hosted notion alternative

## Role In The Architecture

`apps/siyuan` is the free edition authoring frontend in this product family.

It is implemented as a Siyuan plugin and is used to author content and trigger sharing from inside the host Siyuan app.

It is not the server-capable viewer.
It is also not the paid/professional authoring frontend.

The paid/professional authoring frontend is `share-pro`, and it is outside this repository.
The paid/professional backend is `siyuan-note-service`, and it is also outside this repository.

In the free path, `apps/siyuan` talks directly to the host Siyuan kernel and local public files.
There is no application backend owned by this repo in that authoring flow.

## Read more

[Documentation](https://siyuan.wiki/s/20250111132959-xvao9ll)
