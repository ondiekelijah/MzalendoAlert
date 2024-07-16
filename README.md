# MzalendoAlert

## Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ondiekelijah/MzalendoAlert.git
   cd MzalendoAlert

   ```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a MongoDB database:**

Set up a MongoDB database on MongoDB Atlas or your preferred MongoDB service.
Replace MongoDB URI:

Update the MONGODB_URI in your environment variables with your MongoDB username and password.

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.bfhjd.mongodb.net/mzalendoalert?retryWrites=true&w=majority
```

4. **Start the development server:**

```bash
npm run dev
```

Open `http://localhost:3000` with your browser to see the result.
