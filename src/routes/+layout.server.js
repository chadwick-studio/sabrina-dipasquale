export const load = async () => {
  const res = await fetch("http://localhost:1337/api/projects");
  const data = await res.json();
  return { body: data };
};
