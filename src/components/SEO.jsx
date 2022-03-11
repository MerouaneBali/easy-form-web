import Head from "next/head";

function SEO({ title, description }) {
  return (
    <Head>
      <title>{title || "Easy Forms"}</title>
      <meta name="description" content={description || ""} />
      <link rel="icon" href="./favicon.ico" />
    </Head>
  );
}

export default SEO;
