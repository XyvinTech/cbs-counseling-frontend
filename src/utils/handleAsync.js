export const handleAsync =
  (fn) =>
  async (...args) => {
    try {
      const result = await fn(...args);
      // console.log("error.response.message", result);
      return result;
    } catch (error) {
      console.error("Error caught:", error);
    }
  };
