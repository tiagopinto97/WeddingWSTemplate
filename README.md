## Wedding WebSite Template

This is a simple template for a digital wedding invite made using Next.JS

The goal for this project was:
- Make wedding invite template
- Allowed to have multiple invite codes that are used to customize the invite to show the names of the guest
- Allowed to show the chapelry and the reception map for guest to use
- Allowed a brief schedule
- Store the data on localStorage to avoid multiple similar requests
- A single project that could be easly hosted on Vercels

In the repo you will find a invitesList.json that has 3 properties (code, is_male and guests) wich represent the invite data.
In weddingData.json you will have all the available fields for the invite data.

Those files are not used directly by the site, but used as a reference to be encrypted and the moved to public as data1 and data2

There is a pages/api/encryptData.tsx_ ( with this extension to not be deployed on vercel) that is a route that reads the above mentioned json files and encrypts them to data1 and data2, use it offline to encode the files and don't deploy it.

the used .env vars are ENCRYPTION_KEY and IV (which are sampled on the repo, but you should not commit private keys to a public repo)

To run it should be as simple as npm install and npm run dev

## Default NextJS readme for reference

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
