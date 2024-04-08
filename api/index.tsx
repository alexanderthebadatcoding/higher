import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/vercel";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

app.frame("/", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "green",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 120,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          Go Higher!
        </div>
      </div>
    ),
    intents: [
      <Button value="higher" action="/higher0">
        Higher
      </Button>,
    ],
  });
});

for (let i = 0; i < 200; i++) {
  app.frame(`/higher${i}`, (c) => {
    const randomInt = Math.floor(Math.random() * 200);
    const imageUrlBase = `https://picsum.photos/seed/${i}/1200/630`;
    return c.res({
      image: (
        <div
          style={{
            alignItems: "center",
            backgroundImage: `url(${imageUrlBase})`,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="449.868"
            height="481.305"
            viewBox="0 0 449.868 481.305"
            fill="none"
          >
            <path
              fill="rgba(255, 255, 255, 0.69)"
              d="M225.011.305l224.857 224.857-66.452 66.453L158.558 66.757 225.011.305zm-48.453 481v-375h97v375h-97zM0 224.857L224.857 0l66.453 66.453L66.453 291.31 0 224.857z"
            ></path>
          </svg>
        </div>
      ),
      intents: [
        <Button value="higher" action={`/higher${randomInt}`}>
          Keep Going Higher
        </Button>,
        <Button.Link
          href={`https://higher-nine.vercel.app/api/higher${i}?accept=text/html`}
        >
          View Image
        </Button.Link>,
      ],
    });
  });
}

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";
devtools(app, isProduction ? { assetsPath: "/.frog" } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
