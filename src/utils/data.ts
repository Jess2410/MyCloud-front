export type PostBody = {
  [key: string]: any;
};

export type OptionalHeaders = {
  [key: string]: any;
};

export const sendPostRequest = async (
  url: string,
  headers?: OptionalHeaders,
  body?: PostBody
) => {
  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendPostFileRequest = async (
  url: string,
  headers?: OptionalHeaders,
  body?: PostBody
) => {
  try {
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, body[key]);
    }

    const request = await fetch(url, {
      method: "POST",
      headers: {
        ...headers,
      },
      body: formData,
    });
    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendPatchRequest = async (
  url: string,
  headers?: OptionalHeaders,
  body?: PostBody
) => {
  try {
    const request = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendGetRequest = async (url: string, headers: OptionalHeaders) => {
  try {
    const request = await fetch(url, {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        ...headers,
      },
    });
    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
