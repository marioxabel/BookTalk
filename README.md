# BookTalk

## Overview

Booktalk is a full-stack web application that provides book enthusiasts with a platform to explore, save, and review their favorite books. With a seamless user experience, Booktalk enables users to sign up, log in, search for books, and share their thoughts through reviews. The project aims to foster a community of book lovers and make book discovery and interaction more engaging.

#### Table of contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Deployment](#features)
8. [License](#features)

## Features

- User Authentication: Secure sign-up and login functionality to personalize user experiences.
- Book Search: Search for books using a robust search feature powered by [Google Books API / other relevant API].
- Save Favorites: Add books to a personalized favorites list for easy access.
- Reviews: Leave and view reviews for any book in your library.
- Responsive Design: Fully responsive UI for a seamless experience across all devices.

## Technologies Used

- Front-end: React with TypeScript, Bootstrap for styling
- Back-end: Node.js, Express.js
- Database: MongoDB for storing user data, saved books, and reviews
- API: Google Books API for fetching book data
- Deployment: Hosted on Render

## Prerequisites

* Node.js and npm installed
* MongoDB installed locally or accessible via MongoDB Atlas

## Installation

Clone the repository:

```md
git clone https://github.com/marioxabel/BookTalk.git
cd booktalk
```

Install dependencies:

```md
npm install
```

Configure environment variables:

* Create a .env file in the root directory.
* Add the necessary environment variables:

```md
REACT_APP_API_KEY=your_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the application locally:

```md
npm run start:dev
```
## Usage

1. Sign Up and Login:
   * Create an account or log in to access the application.
   * User sessions are securely managed using JWT.

2. Search for Books:

   * Use the search bar to find books by title, author, or keyword.
   * Explore detailed information about each book.

3. Save and Manage Favorites:

   * Add books to your favorites list for quick access.
   * View your saved books in the "My Library" section.

4. Leave and View Reviews:

   * Share your thoughts by leaving reviews on your favorite books.
   * Browse reviews from other users to discover new reads.

## Deployment

The project is live at ['Render deployment'](https://booktalk-pn4b.onrender.com). Visit the page to explore Booktalk!


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

![MIT License](https://img.shields.io/badge/License-MIT-purple)

