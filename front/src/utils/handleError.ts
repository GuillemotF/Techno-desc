export default function handleError(err: any) {
  let result = 'Error \n';
  if (err && err.message) {
    if (Array.isArray(err.message)) {
      err.message.forEach((message: any) => {
        if (message.constraints) {
          Object.keys(message.constraints).forEach((key) => {
            result += `${message.constraints[key]}\n`;
          });
        }
      });
    } else {
      result += err.message;
    }
  }
  return result;
}
