import app from "./app";

const PORT = process.env.PORT || 3000;

//app starts listenting to the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});