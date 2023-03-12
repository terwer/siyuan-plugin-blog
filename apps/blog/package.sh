cd ../common
pnpm install
pnpm build
pnpm vitepress:api
cd ../blog
pnpm generate
echo "vercel build blog done."
