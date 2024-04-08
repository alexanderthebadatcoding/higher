import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/vercel";
import { createSystem } from "frog/ui";

const { Image } = createSystem;

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
      <Button value="higher" action="/higher">
        Higher
      </Button>,
    ],
  });
});

async function fetchRandomPhoto() {
  try {
    const response = await fetch("https://source.unsplash.com/random/1200x630");
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    const imageUrl = response.url;
    console.log(imageUrl);
    return imageUrl.toString();
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

app.frame("/higher", async (c) => {
  // const bgImage = fetchRandomPhoto();
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          backgroundImage: "url(https://source.unsplash.com/random/1200x630)",
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
            fill="#fff"
            fillOpacity="0.69"
            d="M225.011.305l224.857 224.857-66.452 66.453L158.558 66.757 225.011.305zm-48.453 481v-375h97v375h-97zM0 224.857L224.857 0l66.453 66.453L66.453 291.31 0 224.857z"
          ></path>
        </svg>
      </div>
    ),
    intents: [
      <Button value="back" action="/">
        Back
      </Button>,
      <Button.Link href="/higher?accept=text/html">View Image</Button.Link>,
    ],
  });
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";
devtools(app, isProduction ? { assetsPath: "/.frog" } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
