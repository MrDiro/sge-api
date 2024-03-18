const allowOrigins = ["http://localhost", "http://localhost:4200"];

const corsConfig = {
  "origin": allowOrigins,
  "methods": ["GET","POST","PATH","DELETE"],
  "credentials": true
}

export { corsConfig };