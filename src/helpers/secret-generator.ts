import CryptoJS from "crypto-js";

const _getExpired = (expired: number) => {
  return new Date(new Date().getTime() + expired).getTime();
};

async function createApiKey(payload: any, option: any) {
  if (typeof payload === "object") {
    option.duration = 86400000;
    option.expired = _getExpired(option.expired || 86400000); // default 1day
    return CryptoJS.AES.encrypt(
      JSON.stringify({
        ...payload,
        ...option,
      }),
      <any>process.env.SECRET_API_KEY
    ).toString();
  }
  return CryptoJS.AES.encrypt(payload, <any>process.env.SECRET_API_KEY, {
    expired: option.expired,
  }).toString();
}
async function checkApiKey(apiKey: string) {
  const bytes = CryptoJS.AES.decrypt(apiKey, <any>process.env.SECRET_API_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  if (decryptedData.expired < Date.now()) {
    throw new Error("Token expired");
  }
  return decryptedData;
}

export { createApiKey, checkApiKey };
