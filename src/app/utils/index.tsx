const validateTweetUrl = (url: string) => {
  // This regex allows for any valid Twitter username instead of a specific one
  const regex = /^https:\/\/x\.com\/\w{1,15}\/status\/(\d+)$/;
  return regex.test(url);
};

const extractTweetId = (url: string) => {
  const regex = new RegExp(/^https:\/\/x\.com\/\w{1,15}\/status\/(\d+)$/);
  const match = regex.exec(url);
  return match ? match[1] : null;
};

export { validateTweetUrl, extractTweetId };
