export function getPictureInspos(): string[] {
  const files = [
  "pose1.jpg", "pose2.jpg", "pose3.jpg", "pose4.jpg",
  "psoe6.jpg", "pose7.jpg", "pose8.jpg", "pose9.jpg", "pose10.jpg",
  "pose11.jpg", "pose12.jpg", "pose13.jpg", "pose14.jpg", "pose15.jpg",
  "pose16.jpg", "pose17.jpg", "pose18.jpg", "pose19.jpg", "pose20.jpg",
  "pose21.jpg", "pose22.jpg", "pose23.jpg", "pose24.jpg", "pose25.jpg",
  "pose26.jpg", "pose27.jpg", "pose28.jpg", "pose29.jpg", "pose30.jpg",
  "pose31.jpg", "pose32.jpg"
];
  return files.map((f) => `/picture-inspos/${f}`);
}
