export default function base64Encode(string: string): string {
  const passwordBuffer = Buffer.from(string, 'base64');
  return passwordBuffer.toString();
}
