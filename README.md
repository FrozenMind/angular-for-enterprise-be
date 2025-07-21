# angular-for-enterprise-be

NodeJS Backend for the Angular for Enterprise article series.

## Project Overview

This project provides a simple Node.js/Express backend for demonstrating enterprise application patterns. It features:

- User management with authentication and admin roles
- Recognition system for awarding points to users
- Example data for users and recognitions
- RESTful API endpoints secured with Basic Auth

## API Endpoints

All endpoints (except `/`) require HTTP Basic Authentication using a username and password from the user table. Only admin users can create, update, or delete users.

| Endpoint                     | Method | Description                                                | Auth Required | Admin Only |
| ---------------------------- | ------ | ---------------------------------------------------------- | :-----------: | :--------: |
| `/`                          | GET    | Health check, returns a hello message                      |      No       |     No     |
| `/users-with-recognition`    | GET    | Get all users with their total recognition points          |      Yes      |     No     |
| `/users`                     | POST   | Add a new user                                             |      Yes      |    Yes     |
| `/users/:id`                 | PUT    | Update a user by id                                        |      Yes      |    Yes     |
| `/users/:id`                 | DELETE | Delete a user by id                                        |      Yes      |    Yes     |
| `/recognitions`              | POST   | Add a new recognition                                      |      Yes      |     No     |
| `/recognitions/:id`          | PUT    | Update a recognition by id (currently no updatable fields) |      Yes      |     No     |
| `/recognitions/:id`          | DELETE | Delete a recognition by id                                 |      Yes      |     No     |
| `/recognitions/user/:userId` | GET    | Get all recognitions for a given user id                   |      Yes      |     No     |

## Example Users

Below is a table of all example users and whether they are admins:

| Name               | Username           | Admin |
| ------------------ | ------------------ | :---: |
| Alex Johnson       | alex.johnson       |  Yes  |
| Maria Smith        | maria.smith        |  No   |
| John Lee           | john.lee           |  No   |
| Emily Davis        | emily.davis        |  No   |
| Michael Brown      | michael.brown      |  No   |
| Sarah Wilson       | sarah.wilson       |  No   |
| David Martinez     | david.martinez     |  No   |
| Jessica Taylor     | jessica.taylor     |  No   |
| Chris Anderson     | chris.anderson     |  No   |
| Ashley Thomas      | ashley.thomas      |  No   |
| Brian Moore        | brian.moore        |  No   |
| Laura Jackson      | laura.jackson      |  No   |
| Kevin White        | kevin.white        |  No   |
| Amanda Harris      | amanda.harris      |  No   |
| Matthew Clark      | matthew.clark      |  No   |
| Olivia Lewis       | olivia.lewis       |  No   |
| Daniel Walker      | daniel.walker      |  No   |
| Sophia Hall        | sophia.hall        |  No   |
| James Allen        | james.allen        |  No   |
| Grace Young        | grace.young        |  No   |
| Ethan King         | ethan.king         |  No   |
| Chloe Wright       | chloe.wright       |  No   |
| Benjamin Scott     | benjamin.scott     |  No   |
| Zoe Green          | zoe.green          |  No   |
| Samuel Adams       | samuel.adams       |  No   |
| Ella Nelson        | ella.nelson        |  No   |
| Jack Carter        | jack.carter        |  No   |
| Lily Mitchell      | lily.mitchell      |  No   |
| Henry Perez        | henry.perez        |  No   |
| Mia Roberts        | mia.roberts        |  No   |
| Logan Turner       | logan.turner       |  No   |
| Avery Phillips     | avery.phillips     |  No   |
| Sebastian Campbell | sebastian.campbell |  No   |
| Harper Parker      | harper.parker      |  No   |
| Elijah Evans       | elijah.evans       |  No   |
| Scarlett Edwards   | scarlett.edwards   |  No   |
| Mason Collins      | mason.collins      |  No   |
| Layla Stewart      | layla.stewart      |  No   |
| Carter Morris      | carter.morris      |  No   |
| Victoria Rogers    | victoria.rogers    |  No   |
| Wyatt Reed         | wyatt.reed         |  No   |
| Penelope Cook      | penelope.cook      |  No   |
| Luke Morgan        | luke.morgan        |  No   |
| Aria Bell          | aria.bell          |  No   |
| Julian Bailey      | julian.bailey      |  No   |
| Nora Rivera        | nora.rivera        |  No   |
| Leo Cooper         | leo.cooper         |  No   |
| Hazel Richardson   | hazel.richardson   |  No   |

## Authentication

All endpoints (except `/`) require HTTP Basic Auth. Use the username and password from the table above (the password is the same as the username for all users).

---

Feel free to extend this backend for your own enterprise Angular demos!
