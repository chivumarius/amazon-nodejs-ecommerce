// EXPORTED FUNCTION:
export const parseRequestUrl = () => {
  
  // GETTING "URL":
  const url = document.location.hash.toLowerCase();
  
  // SPLITTING "URL" BY "/":
  const request = url.split('/');
  
  // RETURN → OBJECT:
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};
