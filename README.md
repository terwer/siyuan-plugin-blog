# node-siyuan

A blog based on siyuan-note api

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[中文版说明](README-zh_CN.md)

## Preview

[https://terwer.space](https://terwer.space)

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Set up environment variables

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and set SIYUAN_API_URL to be the URL to your siyuan-note endpoint. For example: http://127.0.0.1:6806.

Your `.env.local` file should look like this:

```
SIYUAN_API_URL=...
# some api need to pass token
SIYUAN_AUTH_TOKEN=...
# publish post
PUBLISH_SITE_URL=
# set siyuan as default
DEFAULT_TYPE=siyuan
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/terwer/node-siyuan/tree/main&project-name=node-siyuan&repository-name=node-siyuan&env=SIYUAN_API_URL,SIYUAN_TOKEN&envDescription=Required%20to%20connect%20the%20app%20with%20siyuan-note)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
