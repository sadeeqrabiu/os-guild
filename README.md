# .os guild

A developer community for FOSS (Free and Open Source Software) contributors based in Mauritius.

## About

.os guild brings together developers, designers, and creators in Mauritius to collaborate on impactful open-source projects. We believe in building software together and contributing to the global open-source ecosystem.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, create your environment file:

```bash
cp .env.example .env.local
```

Configure Nostr Auth:

```bash
NOSTR_AUTH_APP_URL=http://localhost:4000
NOSTR_AUTH_CHECK_URL=http://localhost:4000/auth/check
```

If `Nostr Auth` runs on another port or domain, update both values accordingly.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Route Protection

`proxy.ts` to protect `/dashboard` with `Nostr Auth` as a forward-auth service.

Flow:

- Next.js proxy calls `NOSTR_AUTH_CHECK_URL`
- cookies are forwarded to the auth service
- `401` redirects the browser to `NOSTR_AUTH_APP_URL/?redirect=<current-url>`
- `403` returns forbidden
- `200` allows the request through
- on successful checks, the proxy stores the returned auth headers in an `osg_nostr_session` cookie
- on later requests, the proxy still checks `Nostr Auth` in the background so logout on the auth service is reflected here too
- if the auth service returns `401` or `403`, the local session cookie is cleared

On success, auth response headers are also copied into request headers with the `x-nostr-auth-` prefix so server components and route handlers can consume them safely.

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion) - Animations
- [TypeScript](https://www.typescriptlang.org) - Type safety

## Contributing

We welcome contributions from the community. Feel free to open issues, submit pull requests, or join the conversation.

## License

See [LICENSE](LICENSE) for details.
