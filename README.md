# Photo Cloud Storage App

This project is a mobile application for storing and managing photos in the cloud, built using AWS Amplify (Gen 2) and React Native. The app allows users to upload, view, and delete photos securely in the cloud, leveraging AWS Amplify for backend services like authentication, storage, and API integration.

## Features

- **User Authentication**: Secure sign-up, sign-in, and sign-out using AWS Amplify's authentication.
- **Photo Upload**: Users can upload photos to AWS S3 storage.
- **Photo Viewing**: View all uploaded photos in a gallery format.
- **Photo Deletion**: Delete photos from the cloud.
- **Responsive UI**: Optimized for both Android and iOS devices using React Native.

## Tech Stack

- **Frontend**: React Native (JavaScript/TypeScript)
- **Backend**: AWS Amplify (Gen 2)
  - **Authentication**: AWS Cognito
  - **Storage**: AWS S3

## Prerequisites

- Node.js (>=20.x)
- npm or yarn package manager
- AWS Account
- AWS Amplify CLI (v7.x.x or later)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/vutoan1245/Photo-Cloud-Storage.git
cd Photo-Cloud-Storage
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install and configure AWS Amplify CLI

If you don't have AWS Amplify CLI installed:

```bash
npm install -g @aws-amplify/cli
```

### 4. Initialize Amplify

Run the following command to initialize the Amplify backend. This will configure authentication, storage, and API services.

```bash
npx ampx sandbox
```

### 5. Run the Application

Once everything is set up, you can start the React Native development server:

For Android:

```bash
npm run android
```

For iOS:

```bash
npm run ios
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding! 😊
