# LendSQR Credit Wallet Service By MUSTAPHA BABALOLA

## Overview

This project is an MVP wallet service for the Credit mobile lending app. It allows users to create accounts, fund their accounts, transfer funds, and withdraw funds. Users on the Lendsqr Adjutor Karma blacklist cannot be onboarded.

## Features

- User account creation
- Fund account
- Transfer funds
- Withdraw funds
- Blacklist check using Lendsqr Adjutor API

## Tech Stack

- Node.js (LTS version)
- TypeScript
- Knex.js ORM
- MySQL
- Jest for testing

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up the database: `npx knex migrate:latest`
4. Start the server: `npm run dev`

## API Endpoints

- `GET /users`: Create a new user
- `POST /users/fund`: Fund an account
- `POST /users/transfer`: Transfer funds
- `POST /users/withdraw`: Withdraw funds

## E-R Diagram

![ER Diagram](./er-diagram.png)

## Testing

Run tests using Jest: `npm test`
