const baseUrl = (process.env.BASE_URL ?? "http://127.0.0.1:8080").replace(
  /\/$/,
  "",
);

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    redirect: "manual",
    signal: AbortSignal.timeout(5_000),
    ...options,
  });

  return {
    body: await response.text(),
    headers: response.headers,
    status: response.status,
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function headerIncludes(headers, name, expectedValue) {
  return headers
    .get(name)
    ?.split(",")
    .map((value) => value.trim())
    .includes(expectedValue);
}

async function verify({
  bodyIncludes,
  contentType,
  expectedStatus = 200,
  path,
}) {
  const result = await request(path);

  assert(
    result.status === expectedStatus,
    `${path}: expected HTTP ${expectedStatus}, received ${result.status}`,
  );

  if (bodyIncludes) {
    assert(
      result.body.includes(bodyIncludes),
      `${path}: response did not contain ${JSON.stringify(bodyIncludes)}`,
    );
  }

  if (contentType) {
    assert(
      result.headers.get("content-type")?.includes(contentType),
      `${path}: expected Content-Type containing ${contentType}`,
    );
  }

  console.log(`PASS ${expectedStatus} ${path}`);
  return result;
}

async function main() {
  const root = await verify({ expectedStatus: 302, path: "/" });
  assert(
    root.headers.get("location")?.endsWith("/site1/"),
    "/: expected redirect to /site1/",
  );

  for (const path of ["/site1", "/site2"]) {
    const redirect = await verify({ expectedStatus: 301, path });
    assert(
      redirect.headers.get("location")?.endsWith(`${path}/`),
      `${path}: expected trailing-slash redirect`,
    );
  }

  const site1 = await verify({
    bodyIncludes: "LumaStack",
    contentType: "text/html",
    path: "/site1/",
  });
  await verify({ contentType: "text/css", path: "/site1/styles.css" });
  await verify({
    contentType: "javascript",
    path: "/site1/script.js",
  });

  const site2 = await verify({
    bodyIncludes: "Sumaiya Yeasmin",
    contentType: "text/html",
    path: "/site2/",
  });
  await verify({ contentType: "text/css", path: "/site2/styles.css" });
  await verify({
    contentType: "javascript",
    path: "/site2/script.js",
  });

  for (const response of [site1, site2]) {
    assert(
      headerIncludes(response.headers, "x-content-type-options", "nosniff"),
      "Expected X-Content-Type-Options security header",
    );
    assert(
      headerIncludes(response.headers, "x-frame-options", "SAMEORIGIN"),
      "Expected X-Frame-Options security header",
    );
    assert(
      headerIncludes(
        response.headers,
        "referrer-policy",
        "strict-origin-when-cross-origin",
      ),
      "Expected Referrer-Policy security header",
    );
  }

  await verify({ bodyIncludes: "healthy", path: "/healthz" });
  await verify({ expectedStatus: 404, path: "/site1/missing-file.css" });

  console.log(`Smoke tests passed for ${baseUrl}`);
}

main().catch((error) => {
  console.error(`Smoke tests failed: ${error.message}`);
  process.exitCode = 1;
});
